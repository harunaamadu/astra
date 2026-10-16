import { getCategoryLabels } from "@/lib/catalog/categories";
import { getNavigation } from "@/lib/data/navigation";
import { applyFilters, computeFacets, priceBounds, sortProducts } from "@/lib/catalog/filtering";
import type { CatalogProduct, CategoryListing, FilterQuery } from "@/types/catalog";
import { getAllCatalogProducts, PAGE_SIZE, sellerNames } from "./catalog";

/** SAMPLE implementation over the in-memory catalog. Prisma (full-text search, joins) replaces it in step 6. */
export type CollectionSource =
  | { kind: "search"; q: string; department?: string }
  | { kind: "deals" }
  | { kind: "best-sellers" }
  | { kind: "new" }
  | { kind: "for-you" }
  | { kind: "essentials" }
  | { kind: "seller"; sellerId: string };

const discount = (p: CatalogProduct) => (p.compareAtPrice ? 1 - p.price / p.compareAtPrice : 0);

function searchScore(p: CatalogProduct, tokens: string[], labels: Map<string, string>): number {
  const title = p.title.toLowerCase();
  const brand = (p.brand ?? "").toLowerCase();
  const category = (labels.get(p.categoryPath) ?? "").toLowerCase();
  let score = 0;
  for (const t of tokens) {
    const s = (title.includes(t) ? 3 : 0) + (brand.includes(t) ? 2 : 0) + (category.includes(t) ? 1 : 0);
    if (s === 0) return 0; // every word must match something
    score += s;
  }
  return score;
}

export async function getCollectionListing(source: CollectionSource, query: FilterQuery): Promise<CategoryListing> {
  const all = await getAllCatalogProducts();
  let pool = all;
  let order: ((a: CatalogProduct, b: CatalogProduct) => number) | undefined;

  switch (source.kind) {
    case "search": {
      const tokens = source.q.toLowerCase().split(/\s+/).filter(Boolean).slice(0, 8);
      const { departments } = await getNavigation();
      const labels = await getCategoryLabels();
      const dept = departments.find((d) => d.id === source.department);
      const prefix = dept?.href.replace("/c/", "");
      const scores = new Map(all.map((p) => [p.id, searchScore(p, tokens, labels)]));
      pool = all.filter((p) => (scores.get(p.id) ?? 0) > 0 && (!prefix || p.categoryPath.startsWith(prefix)));
      order = (a, b) => (scores.get(b.id) ?? 0) - (scores.get(a.id) ?? 0) || b.reviewCount - a.reviewCount;
      break;
    }
    case "deals":
      pool = all.filter((p) => p.compareAtPrice && p.compareAtPrice > p.price);
      order = (a, b) => discount(b) - discount(a);
      break;
    case "best-sellers":
      pool = all.filter((p) => p.badge === "Best seller" || p.reviewCount > 8000);
      order = (a, b) => b.reviewCount - a.reviewCount;
      break;
    case "new":
      pool = all.filter((p) => p.badge === "New" || p.rank >= 8);
      order = (a, b) => b.rank - a.rank;
      break;
    case "for-you":
      pool = all.filter((p) => p.rating >= 4.4);
      order = (a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount;
      break;
    case "essentials":
      pool = all.filter((p) => p.price <= 3000);
      order = (a, b) => b.reviewCount - a.reviewCount;
      break;
    case "seller":
      pool = all.filter((p) => p.sellerId === source.sellerId);
      break;
  }

  const filtered = applyFilters(pool, query);
  // "Featured" means each collection's own natural order; explicit sorts override it.
  const sorted = query.sort === "featured" && order ? [...filtered].sort(order) : sortProducts(filtered, query.sort);

  const total = sorted.length;
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const page = Math.min(query.page, pageCount);

  return {
    products: sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    total,
    page,
    pageCount,
    pageSize: PAGE_SIZE,
    facets: computeFacets(pool, query, { sellerNames, includeAttrs: false }),
    priceBounds: priceBounds(pool),
  };
}
