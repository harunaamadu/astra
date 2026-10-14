"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Gift } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { QuantityInput } from "@/components/product/detail/quantity-input";
import { VariantSelector } from "@/components/product/detail/variant-selector";
import { useCartStore } from "@/store/cart-store";
import { useUIStore } from "@/store/ui-store";
import { formatPrice } from "@/lib/utils";
import type { ProductVariant } from "@/types/product";
import { Logo } from "../layout/header/logo";

const variants: ProductVariant[] = [25, 50, 100, 200].map((a) => ({
  id: `gc-${a}`,
  label: `$${a}`,
  stock: 999,
  sku: `GC-${a}`,
  price: a * 100,
}));

/** Adds a gift card (a product with amount variants) to the cart. Slug matches /p/astra-gift-card. */
export function GiftCardForm() {
  const router = useRouter();
  const add = useCartStore((s) => s.add);
  const setCartOpen = useUIStore((s) => s.setCartOpen);
  const [variantId, setVariantId] = useState("gc-50");
  const [quantity, setQuantity] = useState(1);
  const variant = variants.find((v) => v.id === variantId) ?? variants[0];

  function addToCart() {
    add(
      {
        productId: "p-giftcard",
        variantId: variant.id,
        variantLabel: variant.label,
        vendorId: "astra",
        slug: "astra-gift-card",
        title: "Astra Gift Card",
        image: "",
        icon: "gift",
        price: variant.price ?? 0,
        maxQuantity: 10,
      },
      quantity,
    );
  }

  return (
    <div className="space-y-6 rounded-2xl border p-6">
      <div className="grid aspect-video place-items-center rounded-xl bg-primary text-primary-foreground relative">
        <h1 className="absolute bottom-4 left-4 font-black text-5xl sm:text-7xl uppercase leading-none opacity-40">
          <Gift className="size-16" strokeWidth={1.25} aria-hidden />
          Gift <br /> Card
        </h1>

        <Logo className="[&_svg]:hidden absolute bottom-4 right-4" />

        <h3 className="absolute z-10! top-4 right-4 font-semibold text-4xl sm:text-5xl uppercase leading-none">
          <sup className="text-2xl -top-4">$</sup>{(variant.price ?? 0) / 100}
        </h3>

        <div className="ptn absolute inset-0 z-0! block opacity-40" />
      </div>
      <VariantSelector
        label="Amount"
        variants={variants}
        value={variantId}
        onChange={setVariantId}
      />
      <div className="flex items-center gap-4">
        <QuantityInput value={quantity} onChange={setQuantity} max={10} />
        <p className="text-lg font-semibold tabular-nums">
          {formatPrice((variant.price ?? 0) * quantity)}
        </p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          size="lg"
          className="flex-1"
          onClick={() => {
            addToCart();
            router.push("/checkout");
          }}
        >
          Buy now
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="flex-1"
          onClick={() => {
            addToCart();
            toast.success("Added to cart", {
              action: { label: "View cart", onClick: () => setCartOpen(true) },
            });
          }}
        >
          Add to cart
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">
        Delivered by email after purchase. Digital gift cards cannot be
        returned.
      </p>
    </div>
  );
}
