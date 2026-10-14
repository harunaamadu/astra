"use client";

import { createContext, useCallback, useContext, useMemo, useTransition } from "react";
import { useRouter } from "next/navigation";
import { buildQueryString } from "@/lib/catalog/query";
import type { FilterQuery, QueryPatch } from "@/types/catalog";

type Ctx = {
  query: FilterQuery;
  basePath: string;
  isPending: boolean;
  /** Applies a patch to the URL. The server re-renders the listing; filters stay shareable and back-button friendly. */
  update: (patch: QueryPatch) => void;
};

const CatalogNavContext = createContext<Ctx | null>(null);

type Props = {
  query: FilterQuery;
  basePath: string;
  /** Params that must survive every filter change, such as the search term (q). */
  fixed?: Record<string, string>;
  children: React.ReactNode;
};

export function CatalogNavProvider({ query, basePath, fixed, children }: Props) {
  const router = useRouter();
  const [isPending, start] = useTransition();
  const fixedKey = JSON.stringify(fixed ?? {});

  const update = useCallback(
    (patch: QueryPatch) => {
      start(() => {
        router.push(`${basePath}${buildQueryString(query, patch, JSON.parse(fixedKey))}`, { scroll: false });
      });
    },
    [router, basePath, query, fixedKey],
  );

  const value = useMemo(() => ({ query, basePath, isPending, update }), [query, basePath, isPending, update]);
  return <CatalogNavContext.Provider value={value}>{children}</CatalogNavContext.Provider>;
}

export function useCatalogNav() {
  const ctx = useContext(CatalogNavContext);
  if (!ctx) throw new Error("useCatalogNav must be used inside <CatalogNavProvider>");
  return ctx;
}