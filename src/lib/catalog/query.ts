import { catalogQuerySchema, csv } from "@/lib/validations/catalog";
import { formatPrice } from "@/lib/utils";
import type { Facets, FilterChip, FilterQuery, QueryPatch } from "@/types/catalog";

type RawParams = Record<string, string | string[] | undefined>;

export const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "rating", label: "Top rated" },
  { value: "newest", label: "Newest" },
] as const;

export const CLEAR_FILTERS: QueryPatch = {
  seller: [], brand: [], color: [], rating: undefined, min: undefined, max: undefined, attrs: {},
};

export function parseCategoryQuery(raw: RawParams): FilterQuery {
  const base = catalogQuerySchema.parse(raw);
  const attrs: Record<string, string[]> = {};
  for (const [k, v] of Object.entries(raw)) {
    if (!k.startsWith("a_") || Object.keys(attrs).length >= 10) continue;
    const values = csv.parse(v);
    if (values.length) attrs[k.slice(2).slice(0, 40)] = values;
  }
  let { min, max } = base;
  if (min !== undefined && max !== undefined && min > max) [min, max] = [max, min];
  return { ...base, min, max, attrs };
}

const FILTER_KEYS = ["seller", "brand", "color", "rating", "min", "max", "attrs"] as const;

/** Serialises a query (plus a patch) to "?a=b". Defaults are omitted so URLs stay clean and canonical. */
export function buildQueryString(query: FilterQuery, patch: QueryPatch = {}, fixed: Record<string, string> = {}): string {
  const next: FilterQuery = { ...query, ...patch };
  const touchedFilter = FILTER_KEYS.some((k) => k in patch);
  if (!("page" in patch) && (touchedFilter || "sort" in patch)) next.page = 1;

  const p = new URLSearchParams(fixed);
  if (next.sort !== "featured") p.set("sort", next.sort);
  if (next.page > 1) p.set("page", String(next.page));
  if (next.view !== "grid") p.set("view", next.view);
  for (const key of ["seller", "brand", "color"] as const) {
    if (next[key].length) p.set(key, next[key].join(","));
  }
  if (next.rating) p.set("rating", String(next.rating));
  if (next.min !== undefined) p.set("min", String(next.min));
  if (next.max !== undefined) p.set("max", String(next.max));
  for (const [k, v] of Object.entries(next.attrs)) if (v.length) p.set(`a_${k}`, v.join(","));

  const s = p.toString();
  return s ? `?${s}` : "";
}

export function countActiveFilters(q: FilterQuery): number {
  return (
    q.seller.length + q.brand.length + q.color.length +
    (q.rating ? 1 : 0) +
    (q.min !== undefined || q.max !== undefined ? 1 : 0) +
    Object.values(q.attrs).reduce((n, v) => n + v.length, 0)
  );
}

/** One removable chip per active filter value. */
export function activeChips(q: FilterQuery, facets: Facets): FilterChip[] {
  const chips: FilterChip[] = [];
  const label = (opts: { value: string; label: string }[], v: string) => opts.find((o) => o.value === v)?.label ?? v;

  for (const v of q.seller) chips.push({ id: `seller:${v}`, label: label(facets.seller, v), patch: { seller: q.seller.filter((x) => x !== v) } });
  for (const v of q.brand) chips.push({ id: `brand:${v}`, label: label(facets.brand, v), patch: { brand: q.brand.filter((x) => x !== v) } });
  for (const v of q.color) chips.push({ id: `color:${v}`, label: label(facets.color, v), patch: { color: q.color.filter((x) => x !== v) } });
  if (q.rating) chips.push({ id: "rating", label: `${q.rating}+ stars`, patch: { rating: undefined } });
  if (q.min !== undefined || q.max !== undefined) {
    const lo = formatPrice((q.min ?? 0) * 100).replace(".00", "");
    const hi = q.max !== undefined ? formatPrice(q.max * 100).replace(".00", "") : "any";
    chips.push({ id: "price", label: `${lo} to ${hi}`, patch: { min: undefined, max: undefined } });
  }
  for (const [key, values] of Object.entries(q.attrs)) {
    const facet = facets.attrs.find((a) => a.key === key);
    for (const v of values) {
      chips.push({
        id: `a_${key}:${v}`,
        label: label(facet?.options ?? [], v),
        patch: { attrs: { ...q.attrs, [key]: values.filter((x) => x !== v) } },
      });
    }
  }
  return chips;
}