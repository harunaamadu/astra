import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ProductImage } from "@/components/product/product-image";
import { ProductRating } from "@/components/product/product-rating";
import { ProductPrice } from "@/components/product/product-price";
import { QuickAddButton, WishlistToggle } from "@/components/product/product-card-actions";
import type { Product } from "@/types";

export function ProductListItem({ product }: { product: Product }) {
  const href = `/p/${product.slug}`;
  return (
    <article className="flex gap-4 rounded-xl border bg-card p-3 text-card-foreground sm:p-4">
      <div className="relative shrink-0">
        <Link href={href} tabIndex={-1} aria-hidden className="block">
          <ProductImage src={product.image} alt="" icon={product.icon} className="size-28 rounded-lg sm:size-40" sizes="160px" />
        </Link>
        {product.badge && (
          <Badge variant={product.badge === "Best seller" ? "default" : "secondary"} className="absolute left-1.5 top-1.5">
            {product.badge}
          </Badge>
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        {product.brand && <p className="text-xs text-muted-foreground">{product.brand}</p>}
        <h3 className="line-clamp-2 font-medium leading-snug">
          <Link href={href} className="hover:underline">{product.title}</Link>
        </h3>
        <ProductRating rating={product.rating} reviewCount={product.reviewCount} />
        <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-2">
          <ProductPrice price={product.price} compareAtPrice={product.compareAtPrice} />
          <div className="flex items-center gap-2">
            <div className="w-32"><QuickAddButton product={product} /></div>
            <WishlistToggle product={product} className="size-9 border" />
          </div>
        </div>
      </div>
    </article>
  );
}
