import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ProductImage } from "./product-image";
import { ProductRating } from "./product-rating";
import { ProductPrice } from "./product-price";
import { QuickAddButton, WishlistToggle } from "./product-card-actions";
import type { Product } from "@/types";

export function ProductCard({ product, priority }: { product: Product; priority?: boolean }) {
  const href = `/p/${product.slug}`;
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border bg-card text-card-foreground">
      <div className="relative">
        <Link href={href} tabIndex={-1} aria-hidden className="block">
          <ProductImage src={product.image} alt="" icon={product.icon} className="aspect-square" priority={priority} />
        </Link>
        {product.badge && (
          <Badge
            variant={product.badge === "Best seller" ? "default" : "secondary"}
            className="absolute left-2 top-2"
          >
            {product.badge}
          </Badge>
        )}
        <WishlistToggle product={product} className="absolute right-2 top-2" />
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-3">
        {product.brand && <p className="text-xs text-muted-foreground">{product.brand}</p>}
        <h3 className="line-clamp-2 text-sm font-medium leading-snug">
          <Link href={href} className="hover:underline">{product.title}</Link>
        </h3>
        <ProductRating rating={product.rating} reviewCount={product.reviewCount} />
        <div className="mt-auto pt-1">
          <ProductPrice price={product.price} compareAtPrice={product.compareAtPrice} />
        </div>
        <QuickAddButton product={product} />
      </div>
    </article>
  );
}
