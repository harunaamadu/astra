import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductBreadcrumbs } from "@/components/product/detail/product-breadcrumbs";
import { ProductView } from "@/components/product/detail/product-view";
import { ProductTabs } from "@/components/product/detail/product-tabs";
import { ProductJsonLd } from "@/components/product/detail/product-json-ld";
import { ProductPageSkeleton } from "@/components/product/detail/product-page-skeleton";
import { ProductRail } from "@/components/product/product-rail";
import { getAllProductSlugs, getProductBySlug, getRelatedProducts } from "@/lib/data/products";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getAllProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product not found" };

  const description = product.description.slice(0, 155);
  return {
    title: product.title,
    description,
    alternates: { canonical: `/p/${product.slug}` },
    openGraph: {
      title: product.title,
      description,
      type: "website",
      ...(product.image && { images: [product.image] }),
    },
  };
}

/**
 * The page itself is synchronous so Next.js can serve the shell instantly.
 * The promise is passed down un-awaited; ProductContent reads it inside <Suspense>.
 */
export default function ProductPage({ params }: Props) {
  return (
    <Suspense fallback={<ProductPageSkeleton />}>
      <ProductContent params={params} />
    </Suspense>
  );
}

async function ProductContent({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const related = await getRelatedProducts(product);

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-6 md:py-8">
        <ProductBreadcrumbs trail={product.category} current={product.title} />
        <ProductView product={product} />
        <ProductTabs product={product} />
      </div>
      <ProductRail id="related" title="More like this" products={related} />
      <ProductJsonLd product={product} />
    </>
  );
}