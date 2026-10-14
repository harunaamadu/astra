"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductRating } from "@/components/product/product-rating";
import { ProductPrice } from "@/components/product/product-price";
import { WishlistToggle } from "@/components/product/product-card-actions";
import { useCartStore } from "@/store/cart-store";
import { useUIStore } from "@/store/ui-store";
import { addToCartSchema } from "@/lib/validations/cart";
import { formatPrice } from "@/lib/utils";
import type { ProductDetail } from "@/types/product";
import { ProductGallery } from "./product-gallery";
import { VariantSelector } from "./variant-selector";
import { QuantityInput } from "./quantity-input";
import { StickyAddToCart } from "./sticky-add-to-cart";
import { DeliveryInfo } from "./delivery-info";
import { SellerCard } from "./seller-card";

/**
 * Client island for everything that shares selection state:
 * gallery, variant, quantity, purchase buttons and the mobile sticky bar.
 */
export function ProductView({ product }: { product: ProductDetail }) {
  const router = useRouter();
  const addItem = useCartStore((s) => s.add);
  const setCartOpen = useUIStore((s) => s.setCartOpen);
  const ctaRef = useRef<HTMLDivElement>(null);

  const [variantId, setVariantId] = useState(product.variants[0].id);
  const [quantity, setQuantity] = useState(1);

  const variant = product.variants.find((v) => v.id === variantId) ?? product.variants[0];
  const hasOptions = product.variants.length > 1;
  const price = variant.price ?? product.price;
  const soldOut = variant.stock <= 0;
  const maxQty = Math.max(1, Math.min(variant.stock, 10));
  const images = variant.images ?? product.images;
  const saving = product.compareAtPrice && product.compareAtPrice > price ? product.compareAtPrice - price : 0;

  function selectVariant(id: string) {
    setVariantId(id);
    setQuantity(1);
  }

  function addToCart(): boolean {
    const parsed = addToCartSchema.safeParse({ productId: product.id, variantId: variant.id, quantity });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return false;
    }
    if (soldOut || parsed.data.quantity > variant.stock) {
      toast.error(soldOut ? "This option is out of stock" : `Only ${variant.stock} left`);
      return false;
    }
    addItem(
      {
        productId: product.id,
        variantId: variant.id,
        variantLabel: hasOptions ? variant.label : undefined,
        vendorId: product.vendorId,
        slug: product.slug,
        title: product.title,
        image: images[0]?.src ?? "",
        price,
      },
      parsed.data.quantity,
    );
    return true;
  }

  function onAdd() {
    if (addToCart()) {
      toast.success("Added to cart", { action: { label: "View cart", onClick: () => setCartOpen(true) } });
    }
  }

  function onBuyNow() {
    if (addToCart()) router.push("/checkout");
  }

  const stockText = soldOut ? "Out of stock" : variant.stock <= 5 ? `Only ${variant.stock} left` : "In stock";

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-12">
      <ProductGallery key={variant.id} images={images} />

      <div className="space-y-6">
        <header className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              {product.brand && (
                <p className="mb-1 text-sm text-muted-foreground">{product.brand}</p>
              )}
              <h1 className="text-2xl font-semibold leading-tight md:text-3xl">{product.title}</h1>
            </div>
            <WishlistToggle product={product} className="size-10 shrink-0 border" />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link href="#details" className="hover:underline">
              <ProductRating rating={product.rating} reviewCount={product.reviewCount} />
            </Link>
            {product.badge && <Badge variant={product.badge === "Best seller" ? "default" : "secondary"}>{product.badge}</Badge>}
          </div>

          <div>
            <div className="text-2xl [&_span:first-child]:text-3xl">
              <ProductPrice price={price} compareAtPrice={product.compareAtPrice} />
            </div>
            {saving > 0 && <p className="mt-1 text-sm text-muted-foreground">You save {formatPrice(saving)}</p>}
          </div>
        </header>

        {hasOptions && (
          <VariantSelector label={product.optionName} variants={product.variants} value={variant.id} onChange={selectVariant} />
        )}

        <div className="flex flex-wrap items-center gap-4">
          <QuantityInput value={quantity} onChange={setQuantity} max={maxQty} disabled={soldOut} />
          <p role="status" className={soldOut || variant.stock <= 5 ? "text-sm font-medium text-destructive" : "text-sm text-muted-foreground"}>
            {stockText}
          </p>
        </div>

        <div ref={ctaRef} className="space-y-3">
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button size="lg" className="flex-1" onClick={onBuyNow} disabled={soldOut}>Buy now</Button>
            <Button size="lg" variant="outline" className="flex-1" onClick={onAdd} disabled={soldOut}>Add to cart</Button>
          </div>
          {soldOut && (
            <p className="text-sm text-muted-foreground">
              {variant.label} is out of stock{hasOptions ? `. Choose another ${product.optionName.toLowerCase()}` : ""}
              {" "}or save this item to your wishlist.
            </p>
          )}
        </div>

        <DeliveryInfo shipping={product.shipping} />
        <SellerCard seller={product.seller} />
      </div>

      <StickyAddToCart
        title={product.title}
        price={price}
        compareAtPrice={product.compareAtPrice}
        disabled={soldOut}
        onAdd={onAdd}
        targetRef={ctaRef}
      />
    </div>
  );
}
