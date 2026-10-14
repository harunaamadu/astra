"use client";

import { cn } from "@/lib/utils";
import { useCatalogNav } from "./catalog-nav-provider";

/** Dims the results while a new filter/sort/page is loading, so changes feel acknowledged. */
export function ResultsRegion({ children }: { children: React.ReactNode }) {
  const { isPending } = useCatalogNav();
  return (
    <div aria-busy={isPending} className={cn("transition-opacity duration-150", isPending && "pointer-events-none opacity-50")}>
      {children}
    </div>
  );
}
