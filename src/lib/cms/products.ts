import { getProductBySlug } from "@/lib/data/products";
import { sanityFetch } from "@/lib/sanity/fetch";
import { productContentQuery } from "@/lib/sanity/queries";
import type { ProductDetail, ProductMedia, ProductSpec } from "@/types/product";

type ProductContent = {
  description?: string;
  highlights?: string[];
  specs?: ProductSpec[];
  faq?: { question: string; answer: string }[];
  images?: { src: string; alt: string }[];
};

/** Spec rows derived from code-owned data (variants, seller). They survive an editorial override. */
const isDerivedSpec = (s: ProductSpec) => s.label === "Sold by" || s.label === "Edition" || s.label.endsWith(" options");

/**
 * Product page data: the catalog product (price, stock, variants, reviews, seller) with marketing
 * copy and images from Sanity laid over it. Only editorial fields are overridden. Checkout and the
 * cart keep using getProductBySlug, so money never depends on the CMS.
 */
export async function getProductDetail(slug: string): Promise<ProductDetail | null> {
  const product = await getProductBySlug(slug);
  if (!product) return null;

  const content = await sanityFetch<ProductContent>(productContentQuery, ["sanity:product"], { slug });
  if (!content) return product;

  const images: ProductMedia[] | undefined = content.images?.length
    ? content.images.map((i) => ({ src: i.src, alt: i.alt, icon: product.icon }))
    : undefined;

  return {
    ...product,
    description: content.description ?? product.description,
    highlights: content.highlights?.length ? content.highlights : product.highlights,
    specs: content.specs?.length ? [...content.specs, ...product.specs.filter(isDerivedSpec)] : product.specs,
    faq: content.faq?.length ? content.faq : product.faq,
    images: images ?? product.images,
  };
}
