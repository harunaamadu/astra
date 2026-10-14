import { Suspense } from "react";
import type { Metadata } from "next";
import { CollectionContent } from "@/components/catalog/collection-content";
import { CategorySkeleton } from "@/components/catalog/category-skeleton";

const title = "New arrivals";
const description = "The latest products from our sellers.";

export const metadata: Metadata = { title, description, alternates: { canonical: "/new" } };

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default function NewArrivalsPage({ searchParams }: Props) {
  return (
    <Suspense fallback={<CategorySkeleton />}>
      <CollectionContent source={{ kind: "new" }} title={title} description={description} basePath="/new" searchParams={searchParams} />
    </Suspense>
  );
}
