import { Suspense } from "react";
import type { Metadata } from "next";
import { CollectionContent } from "@/components/catalog/collection-content";
import { CategorySkeleton } from "@/components/catalog/category-skeleton";

const title = "Astra Essentials";
const description = "Everyday basics under $30, with lightning deals and limited-time discounts.";

export const metadata: Metadata = { title, description, alternates: { canonical: "/essentials" } };

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default function EssentialsPage({ searchParams }: Props) {
  return (
    <Suspense fallback={<CategorySkeleton />}>
      <CollectionContent source={{ kind: "essentials" }} title={title} description={description} basePath="/essentials" searchParams={searchParams} />
    </Suspense>
  );
}
