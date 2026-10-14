export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-10-01";

/** When false the storefront serves the static sample content, so the app runs without a Sanity project. */
export const isSanityConfigured = projectId.length > 0;
