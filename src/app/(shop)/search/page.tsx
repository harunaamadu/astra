import { Suspense } from "react";
import type { Metadata } from "next";
import { ListingView } from "@/components/catalog/listing-view";
import { SearchEmpty } from "@/components/catalog/search-empty";
import { CategorySkeleton } from "@/components/catalog/category-skeleton";
import { departments } from "@/lib/constants/navigation";
import { parseCategoryQuery } from "@/lib/catalog/query";
import { getCollectionListing } from "@/lib/data/collections";

export const metadata: Metadata = { title: "Search", robots: { index: false, follow: true } };

type SP = Record<string, string | string[] | undefined>;
type Props = { searchParams: Promise<SP> };

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

export default function SearchPage({ searchParams }: Props) {
  return (
    <Suspense fallback={<CategorySkeleton />}>
      <SearchContent searchParams={searchParams} />
    </Suspense>
  );
}

async function SearchContent({ searchParams }: Props) {
  const sp = await searchParams;
  const q = (first(sp.q) ?? "").trim().slice(0, 120);
  const department = departments.find((d) => d.id === first(sp.category));

  if (!q) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12">
        <SearchEmpty />
      </div>
    );
  }

  const query = parseCategoryQuery(sp);
  const listing = await getCollectionListing({ kind: "search", q, department: department?.id }, query);

  return (
    <ListingView
      title={`Results for "${q}"`}
      description={department ? `Searching in ${department.label}` : undefined}
      current="Search"
      listing={listing}
      query={query}
      basePath="/search"
      fixed={{ q, ...(department ? { category: department.id } : {}) }}
      emptyState={<SearchEmpty q={q} />}
    />
  );
}
