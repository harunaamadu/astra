import { createClient } from "@sanity/client";
import { apiVersion, dataset, isSanityConfigured, projectId } from "../../sanity/env";

/**
 * Read-only client for published content. `useCdn` is off because Next caches the results
 * and the revalidation webhook purges them; a second CDN layer would only delay edits.
 * Null when no project is configured, in which case callers use the static sample content.
 */
export const sanityClient = isSanityConfigured
  ? createClient({ projectId, dataset, apiVersion, useCdn: false, perspective: "published" })
  : null;
