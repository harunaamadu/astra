import { cacheLife, cacheTag } from "next/cache";
import { sanityClient } from "./client";

/** One tag per content family. The revalidation webhook maps document types to these. */
export type SanityTag =
  | "sanity:department"
  | "sanity:home"
  | "sanity:blog"
  | "sanity:info"
  | "sanity:help"
  | "sanity:legal"
  | "sanity:product";

type Params = Record<string, string | number | boolean>;

/** GROQ returns null for empty fields; the app's types use undefined, so drop them. */
function dropNulls<T>(value: T): T {
  if (Array.isArray(value)) return value.map(dropNulls) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value)
        .filter(([, v]) => v !== null)
        .map(([k, v]) => [k, dropNulls(v)]),
    ) as T;
  }
  return value;
}

async function cachedFetch<T>(query: string, params: Params, tags: SanityTag[]): Promise<T | null> {
  "use cache";
  cacheLife("hours");
  cacheTag(...tags);

  if (!sanityClient) return null;
  // A throw here is not cached, so a Sanity outage never gets stuck in the cache.
  return dropNulls(await sanityClient.fetch<T>(query, params));
}

/**
 * Cached GROQ fetch. Returns null when Sanity is not configured, unreachable, or has no match,
 * so every caller can fall back to the static sample content and the storefront stays up.
 */
export async function sanityFetch<T>(query: string, tags: SanityTag[], params: Params = {}): Promise<T | null> {
  try {
    return await cachedFetch<T>(query, params, tags);
  } catch (error) {
    console.error("[sanity] fetch failed, serving static fallback:", error);
    return null;
  }
}
