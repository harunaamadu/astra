"use client";

import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { CLEAR_FILTERS } from "@/lib/catalog/query";
import type { Facets, FilterQuery, PriceBounds, QueryPatch } from "@/types/catalog";
import { useCatalogNav } from "./catalog-nav-provider";
import { FilterPanel } from "./filter-panel";

/** Mobile filters: edits stay in a draft until "Show results", so the page doesn't reload on every tap. */
export function FilterSheet({ facets, priceBounds, activeCount }: { facets: Facets; priceBounds: PriceBounds; activeCount: number }) {
  const { query, update } = useCatalogNav();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<FilterQuery>(query);

  function onOpenChange(next: boolean) {
    if (next) setDraft(query);
    setOpen(next);
  }

  function apply() {
    update({
      seller: draft.seller, brand: draft.brand, color: draft.color,
      rating: draft.rating, min: draft.min, max: draft.max, attrs: draft.attrs,
    });
    setOpen(false);
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="h-9 gap-2 lg:hidden">
          <SlidersHorizontal className="size-4" aria-hidden />
          Filters{activeCount > 0 ? ` (${activeCount})` : ""}
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="flex h-[88dvh] flex-col gap-0 rounded-t-2xl p-0">
        <SheetHeader className="border-b p-4 pr-12">
          <SheetTitle>Filters</SheetTitle>
          <SheetDescription className="sr-only">Narrow the products by seller, rating, brand, price and more.</SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto px-4">
          <FilterPanel
            facets={facets}
            priceBounds={priceBounds}
            value={draft}
            onChange={(patch: QueryPatch) => setDraft((d) => ({ ...d, ...patch }))}
            idPrefix="sh"
          />
        </div>
        <SheetFooter className="grid grid-cols-2 gap-3 border-t p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
          <Button variant="outline" size="lg" onClick={() => setDraft((d) => ({ ...d, ...CLEAR_FILTERS } as FilterQuery))}>Clear all</Button>
          <Button size="lg" onClick={apply}>Show results</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
