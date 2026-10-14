"use client";

import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ProductImage } from "@/components/product/product-image";
import { useCartStore } from "@/store/cart-store";
import { cartItemKey } from "@/lib/cart/pricing";
import { formatPrice } from "@/lib/utils";
import type { CartItem } from "@/types";

export function SavedForLater({ items }: { items: CartItem[] }) {
  const moveToCart = useCartStore((s) => s.moveToCart);
  const removeSaved = useCartStore((s) => s.removeSaved);
  const restoreSaved = useCartStore((s) => s.restoreSaved);

  if (items.length === 0) return null;

  return (
    <section aria-labelledby="saved-heading" className="mt-10">
      <h2 id="saved-heading" className="mb-1 text-lg font-semibold">Saved for later ({items.length})</h2>
      <ul className="divide-y border-t">
        {items.map((item) => {
          const key = cartItemKey(item);
          return (
            <li key={key} className="flex items-center gap-3 py-4">
              <ProductImage src={item.image || undefined} alt="" icon={item.icon} className="size-16 shrink-0 rounded-lg" iconClassName="size-6" sizes="64px" />
              <div className="min-w-0 flex-1">
                <Link href={`/p/${item.slug}`} className="line-clamp-1 text-sm font-medium hover:underline">{item.title}</Link>
                {item.variantLabel && <p className="text-xs text-muted-foreground">{item.variantLabel}</p>}
                <p className="text-sm tabular-nums">{formatPrice(item.price)}</p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1.5">
                <Button size="sm" variant="outline" onClick={() => moveToCart(key)}>Move to cart</Button>
                <button
                  type="button"
                  className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                  onClick={() => {
                    const removed = removeSaved(key);
                    if (removed) toast("Removed", { action: { label: "Undo", onClick: () => restoreSaved(removed) } });
                  }}
                >
                  Remove
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
