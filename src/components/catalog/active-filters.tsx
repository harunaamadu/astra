"use client";

import { X } from "lucide-react";
import { activeChips, CLEAR_FILTERS } from "@/lib/catalog/query";
import type { Facets } from "@/types/catalog";
import { useCatalogNav } from "./catalog-nav-provider";

export function ActiveFilters({ facets }: { facets: Facets }) {
  const { query, update } = useCatalogNav();
  const chips = activeChips(query, facets);
  if (chips.length === 0) return null;

  return (
    <div className="mb-4 flex flex-wrap items-center gap-2" aria-label="Active filters" role="group">
      {chips.map((chip) => (
        <button
          key={chip.id}
          type="button"
          onClick={() => update(chip.patch)}
          aria-label={`Remove filter ${chip.label}`}
          className="inline-flex items-center gap-1.5 rounded-full border bg-secondary/60 py-1 pl-3 pr-2 text-sm transition-colors hover:bg-accent"
        >
          {chip.label}
          <X className="size-3.5" aria-hidden />
        </button>
      ))}
      <button
        type="button"
        onClick={() => update(CLEAR_FILTERS)}
        className="px-1 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
      >
        Reset
      </button>
    </div>
  );
}
