"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SORT_OPTIONS } from "@/lib/catalog/query";
import type { SortValue } from "@/types/catalog";
import { useCatalogNav } from "./catalog-nav-provider";

export function SortSelect() {
  const { query, update } = useCatalogNav();
  return (
    <Select value={query.sort} onValueChange={(v) => update({ sort: v as SortValue })}>
      <SelectTrigger aria-label="Sort products" className="h-9 w-[42 text-sm sm:w-48">
        <SelectValue />
      </SelectTrigger>
      <SelectContent align="end">
        {SORT_OPTIONS.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
      </SelectContent>
    </Select>
  );
}
