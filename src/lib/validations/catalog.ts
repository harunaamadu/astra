import { z } from "zod";

export const SORT_VALUES = ["featured", "price-asc", "price-desc", "rating", "newest"] as const;

/** Accepts "a,b", ["a","b"] or nothing. Always yields a short array of lowercase strings. */
export const csv = z
  .preprocess((v) => {
    if (v == null) return [];
    const list = Array.isArray(v) ? v : [v];
    return list
      .flatMap((x) => String(x).split(","))
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean)
      .slice(0, 30);
  }, z.array(z.string().max(60)))
  .catch([]);

/** Every query param is untrusted. Bad values fall back to defaults instead of erroring. */
export const catalogQuerySchema = z.object({
  sort: z.enum(SORT_VALUES).catch("featured"),
  page: z.coerce.number().int().min(1).max(500).catch(1),
  view: z.enum(["grid", "list"]).catch("grid"),
  seller: csv,
  brand: csv,
  color: csv,
  rating: z.coerce.number().int().min(1).max(4).optional().catch(undefined),
  min: z.coerce.number().int().min(0).max(1_000_000).optional().catch(undefined),
  max: z.coerce.number().int().min(0).max(1_000_000).optional().catch(undefined),
});
