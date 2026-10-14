import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CollectionContent } from "@/components/catalog/collection-content";
import { CategorySkeleton } from "@/components/catalog/category-skeleton";
import { sellers } from "@/lib/data/catalog";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export function generateStaticParams() {
  return sellers.map((s) => ({ id: s.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const seller = sellers.find((s) => s.id === id);
  return seller
    ? { title: `${seller.name} on Astra`, description: `Shop products from ${seller.name}.`, alternates: { canonical: `/s/${id}` } }
    : { title: "Seller not found" };
}

export default function SellerPage(props: Props) {
  return (
    <Suspense fallback={<CategorySkeleton />}>
      <SellerContent {...props} />
    </Suspense>
  );
}

async function SellerContent({ params, searchParams }: Props) {
  const { id } = await params;
  const seller = sellers.find((s) => s.id === id);
  if (!seller) notFound();
  return (
    <CollectionContent
      source={{ kind: "seller", sellerId: seller.id }}
      title={seller.name}
      description={`Everything ${seller.name} sells on Astra.`}
      basePath={`/s/${seller.id}`}
      trail={[{ label: "Sellers", href: "/c" }]}
      searchParams={searchParams}
    />
  );
}
