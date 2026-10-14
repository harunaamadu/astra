import { slugify } from "./slug";
import type { CatalogProduct, FacetOption, Facets, FilterQuery, PriceBounds, SortValue } from "@/types/catalog";

export const COLOR_HEX: Record<string, string> = {
  black: "#1a1a1a", gray: "#8a8a8a", white: "#f4f4f2", silver: "#c0c4c8", brown: "#7a4a2b",
  orange: "#e07a1f", red: "#c8372d", blue: "#1f4fa8", purple: "#6a3fa0", green: "#2f7a4d",
};

type Skip = "seller" | "brand" | "color" | "rating" | "price" | `attr:${string}`;

const attrValue = (p: CatalogProduct, key: string) =>
  Object.entries(p.attrs).find(([label]) => slugify(label) === key)?.[1];

/** `skip` leaves one facet out, so its own option counts reflect "what if I changed this filter". */
export function matches(p: CatalogProduct, q: FilterQuery, skip?: Skip): boolean {
  if (skip !== "seller" && q.seller.length && !q.seller.includes(p.sellerId)) return false;
  if (skip !== "brand" && q.brand.length && !q.brand.includes(slugify(p.brand ?? ""))) return false;
  if (skip !== "color" && q.color.length && !(p.color && q.color.includes(p.color))) return false;
  if (skip !== "rating" && q.rating && p.rating < q.rating) return false;
  if (skip !== "price") {
    if (q.min !== undefined && p.price < q.min * 100) return false;
    if (q.max !== undefined && p.price > q.max * 100) return false;
  }
  for (const [key, values] of Object.entries(q.attrs)) {
    if (!values.length || skip === `attr:${key}`) continue;
    const v = attrValue(p, key);
    if (!v || !values.includes(slugify(v))) return false;
  }
  return true;
}

export const applyFilters = (all: CatalogProduct[], q: FilterQuery) => all.filter((p) => matches(p, q));

export function sortProducts(list: CatalogProduct[], sort: SortValue): CatalogProduct[] {
  const out = [...list];
  switch (sort) {
    case "price-asc": return out.sort((a, b) => a.price - b.price);
    case "price-desc": return out.sort((a, b) => b.price - a.price);
    case "rating": return out.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
    case "newest": return out.sort((a, b) => b.rank - a.rank);
    default:
      // Featured: paid placements first (always labelled "Sponsored"), then by popularity.
      return out.sort(
        (a, b) =>
          Number(b.badge === "Sponsored") - Number(a.badge === "Sponsored") || b.reviewCount - a.reviewCount,
      );
  }
}

function tally(
  all: CatalogProduct[],
  pool: CatalogProduct[],
  get: (p: CatalogProduct) => { value: string; label: string; swatch?: string } | undefined,
  selected: string[],
): FacetOption[] {
  const labels = new Map<string, { label: string; swatch?: string }>();
  for (const p of all) {
    const g = get(p);
    if (g && !labels.has(g.value)) labels.set(g.value, { label: g.label, swatch: g.swatch });
  }
  const counts = new Map<string, number>();
  for (const p of pool) {
    const g = get(p);
    if (g) counts.set(g.value, (counts.get(g.value) ?? 0) + 1);
  }
  return [...labels.entries()]
    .map(([value, meta]) => ({ value, ...meta, count: counts.get(value) ?? 0 }))
    .filter((o) => o.count > 0 || selected.includes(o.value))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}

export function computeFacets(
  all: CatalogProduct[],
  q: FilterQuery,
  opts: { sellerNames: Record<string, string>; includeAttrs: boolean },
): Facets {
  const pool = (skip: Skip) => all.filter((p) => matches(p, q, skip));

  const attrKeys = opts.includeAttrs ? [...new Set(all.flatMap((p) => Object.keys(p.attrs)))] : [];

  return {
    seller: tally(all, pool("seller"), (p) => ({ value: p.sellerId, label: opts.sellerNames[p.sellerId] ?? p.sellerId }), q.seller),
    brand: tally(all, pool("brand"), (p) => (p.brand ? { value: slugify(p.brand), label: p.brand } : undefined), q.brand),
    color: tally(
      all, pool("color"),
      (p) => (p.color ? { value: p.color, label: p.color[0].toUpperCase() + p.color.slice(1), swatch: COLOR_HEX[p.color] } : undefined),
      q.color,
    ),
    rating: [4, 3, 2, 1]
      .map((min) => ({ min, count: pool("rating").filter((p) => p.rating >= min).length }))
      .filter((r) => r.count > 0 || q.rating === r.min),
    attrs: attrKeys.map((label) => {
      const key = slugify(label);
      return {
        key,
        label,
        options: tally(
          all, pool(`attr:${key}`),
          (p) => (p.attrs[label] ? { value: slugify(p.attrs[label]), label: p.attrs[label] } : undefined),
          q.attrs[key] ?? [],
        ),
      };
    }),
  };
}

export function priceBounds(all: CatalogProduct[]): PriceBounds {
  if (all.length === 0) return { min: 0, max: 0 };
  const prices = all.map((p) => p.price);
  return { min: Math.floor(Math.min(...prices) / 100), max: Math.ceil(Math.max(...prices) / 100) };
}
