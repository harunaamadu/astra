import type { NavLink, Product } from "@/types";

export type SortValue = "featured" | "price-asc" | "price-desc" | "rating" | "newest";
export type ViewMode = "grid" | "list";

export type FilterQuery = {
  sort: SortValue;
  page: number;
  view: ViewMode;
  seller: string[];
  brand: string[];
  color: string[];
  /** minimum star rating (1-4) */
  rating?: number;
  /** whole dollars */
  min?: number;
  max?: number;
  /** attribute slug -> selected value slugs */
  attrs: Record<string, string[]>;
};

export type QueryPatch = Partial<FilterQuery>;

export type CatalogProduct = Product & {
  /** e.g. "computers/monitors" */
  categoryPath: string;
  sellerId: string;
  color?: string;
  attrs: Record<string, string>;
  /** higher = newer */
  rank: number;
};

export type FacetOption = { value: string; label: string; count: number; swatch?: string };

export type Facets = {
  seller: FacetOption[];
  brand: FacetOption[];
  color: FacetOption[];
  rating: { min: number; count: number }[];
  attrs: { key: string; label: string; options: FacetOption[] }[];
};

export type PriceBounds = { min: number; max: number };

export type CategoryListing = {
  products: Product[];
  total: number;
  page: number;
  pageCount: number;
  pageSize: number;
  facets: Facets;
  priceBounds: PriceBounds;
};

export type Category = {
  path: string;
  label: string;
  trail: NavLink[];
  children: NavLink[];
  isLeaf: boolean;
};

export type FilterChip = { id: string; label: string; patch: QueryPatch };
