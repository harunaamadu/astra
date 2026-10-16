import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

/**
 * Read-only, published content only. The CDN is safe here because Next.js caches every call
 * ("use cache" in lib/cms) and the revalidation webhook clears that cache on publish.
 */
export const client = createClient({
  projectId: projectId || "unset",
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
});

export function sanityFetch<T>(query: string, params: Record<string, unknown> = {}): Promise<T> {
  return client.fetch<T>(query, params);
}
