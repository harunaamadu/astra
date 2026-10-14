import type { ReactNode } from "react";
import { ProductBreadcrumbs } from "@/components/product/detail/product-breadcrumbs";
import { SponsoredStrip } from "@/components/home/sponsored-strip";
import { getSponsoredShortcuts } from "@/lib/cms/home";
import { countActiveFilters } from "@/lib/catalog/query";
import type { NavLink } from "@/types";
import type { CategoryListing, FilterQuery } from "@/types/catalog";
import { CatalogNavProvider } from "./catalog-nav-provider";
import { FilterSidebar } from "./filter-sidebar";
import { FilterSheet } from "./filter-sheet";
import { SortSelect } from "./sort-select";
import { ViewToggle } from "./view-toggle";
import { ActiveFilters } from "./active-filters";
import { ResultsRegion } from "./results-region";
import { ProductGrid } from "./product-grid";
import { Pagination } from "./pagination";
import { CategoryEmpty } from "./category-empty";

type Props = {
  title: string;
  description?: string;
  trail?: NavLink[];
  /** last breadcrumb */
  current: string;
  /** extra header content, such as subcategory chips */
  header?: ReactNode;
  listing: CategoryListing;
  query: FilterQuery;
  basePath: string;
  /** params kept on every URL (for example the search term) */
  fixed?: Record<string, string>;
  /** shown when there are no results and no filters are active */
  emptyState?: ReactNode;
};

/** Everything below the page title for any product listing: filters, sort, grid, pagination. */
export async function ListingView({
  title, description, trail = [], current, header, listing, query, basePath, fixed, emptyState,
}: Props) {
  const sponsored = await getSponsoredShortcuts();
  const activeCount = countActiveFilters(query);
  const from = (listing.page - 1) * listing.pageSize + 1;
  const to = from + listing.products.length - 1;
  const fixedQs = fixed && Object.keys(fixed).length ? `?${new URLSearchParams(fixed)}` : "";

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-6 md:py-8">
        <ProductBreadcrumbs trail={trail} current={current} />
        <header className="mb-6">
          <h1 className="text-2xl font-semibold md:text-4xl">{title}</h1>
          {description && <p className="mt-2 max-w-2xl text-muted-foreground">{description}</p>}
          {header}
        </header>

        <CatalogNavProvider query={query} basePath={basePath} fixed={fixed}>
          <div className="grid gap-8 lg:grid-cols-[15rem_minmax(0,1fr)] xl:gap-10">
            <aside aria-label="Filters" className="hidden lg:block">
              <FilterSidebar facets={listing.facets} priceBounds={listing.priceBounds} activeCount={activeCount} />
            </aside>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4">
                <p role="status" aria-live="polite" className="text-sm text-muted-foreground">
                  {listing.total === 0 ? "No results" : `${from}-${to} of ${listing.total} results`}
                </p>
                <div className="flex items-center gap-2">
                  <FilterSheet facets={listing.facets} priceBounds={listing.priceBounds} activeCount={activeCount} />
                  <SortSelect />
                  <ViewToggle />
                </div>
              </div>

              <ActiveFilters facets={listing.facets} />

              <ResultsRegion>
                {listing.products.length > 0 ? (
                  <>
                    <ProductGrid products={listing.products} view={query.view} />
                    <Pagination basePath={basePath} query={query} page={listing.page} pageCount={listing.pageCount} fixed={fixed} />
                  </>
                ) : activeCount > 0 || !emptyState ? (
                  <CategoryEmpty clearHref={`${basePath}${fixedQs}`} filtered={activeCount > 0} />
                ) : (
                  emptyState
                )}
              </ResultsRegion>
            </div>
          </div>
        </CatalogNavProvider>
      </div>
      <SponsoredStrip items={sponsored} />
    </>
  );
}