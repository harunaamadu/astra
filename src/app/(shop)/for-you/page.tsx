import { Suspense } from "react";
import type { Metadata } from "next";
import { CollectionContent } from "@/components/catalog/collection-content";
import { CategorySkeleton } from "@/components/catalog/category-skeleton";

const title = "Picked for you";
const description = "Highly rated products we think you will like.";

export const metadata: Metadata = { title, description, alternates: { canonical: "/for-you" } };

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default function ForYouPage({ searchParams }: Props) {
  return (
    <Suspense fallback={<CategorySkeleton />}>
      <CollectionContent source={{ kind: "for-you" }} title={title} description={description} basePath="/for-you" searchParams={searchParams} />
    </Suspense>
  );
}
