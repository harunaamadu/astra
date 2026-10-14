import { Suspense } from "react";
import type { Metadata } from "next";
import { CollectionContent } from "@/components/catalog/collection-content";
import { CategorySkeleton } from "@/components/catalog/category-skeleton";

const title = "Today's deals";
const description = "Markdowns from every department. Prices drop and sell out fast.";

export const metadata: Metadata = { title, description, alternates: { canonical: "/deals" } };

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default function DealsPage({ searchParams }: Props) {
  return (
    <Suspense fallback={<CategorySkeleton />}>
      <CollectionContent source={{ kind: "deals" }} title={title} description={description} basePath="/deals" searchParams={searchParams} />
    </Suspense>
  );
}
