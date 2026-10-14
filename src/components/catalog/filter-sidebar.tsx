"use client";

import { CLEAR_FILTERS } from "@/lib/catalog/query";
import type { Facets, PriceBounds } from "@/types/catalog";
import { useCatalogNav } from "./catalog-nav-provider";
import { FilterPanel } from "./filter-panel";

/** Desktop filters: every change applies immediately. */
export function FilterSidebar({ facets, priceBounds, activeCount }: { facets: Facets; priceBounds: PriceBounds; activeCount: number }) {
  const { query, update } = useCatalogNav();
  return (
    <div className="lg:sticky lg:top-28">
      <div className="flex items-center justify-between border-b pb-3">
        <h2 className="font-semibold">Filters</h2>
        {activeCount > 0 && (
          <button type="button" onClick={() => update(CLEAR_FILTERS)} className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
            Reset ({activeCount})
          </button>
        )}
      </div>
      <FilterPanel facets={facets} priceBounds={priceBounds} value={query} onChange={update} idPrefix="sb" />
    </div>
  );
}
