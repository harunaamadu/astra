import type { ProductDetail } from "@/types/product";

/** schema.org Product markup for rich results. Prices are converted from cents. */
export function ProductJsonLd({ product }: { product: ProductDetail }) {
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const inStock = product.variants.some((v) => v.stock > 0);

  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    sku: product.variants[0]?.sku,
    ...(product.brand && { brand: { "@type": "Brand", name: product.brand } }),
    ...(product.image && { image: [product.image] }),
    url: `${site}/p/${product.slug}`,
    ...(product.reviewCount > 0 && {
      aggregateRating: { "@type": "AggregateRating", ratingValue: product.rating, reviewCount: product.reviewCount },
    }),
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: (product.price / 100).toFixed(2),
      availability: inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      seller: { "@type": "Organization", name: product.seller.name },
    },
  };

  return (
    <script
      type="application/ld+json"
      // "<" is escaped so product text can never close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
