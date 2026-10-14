"use client";

import Link from "next/link";
import { toast } from "sonner";
import { useShallow } from "zustand/react/shallow";
import { ProductImage } from "@/components/product/product-image";
import { QuantityInput } from "@/components/product/detail/quantity-input";
import { useCartStore } from "@/store/cart-store";
import { cartItemKey, lineCap } from "@/lib/cart/pricing";
import { cn, formatPrice } from "@/lib/utils";
import type { CartItem } from "@/types";

type Props = { item: CartItem; layout: "drawer" | "page"; onNavigate?: () => void };

export function CartItemRow({ item, layout, onNavigate }: Props) {
  const key = cartItemKey(item);
  const { remove, restore, setQuantity, toggleSelected, setGift, saveForLater, moveToCart } = useCartStore(
    useShallow((s) => ({
      remove: s.remove, restore: s.restore, setQuantity: s.setQuantity, toggleSelected: s.toggleSelected,
      setGift: s.setGift, saveForLater: s.saveForLater, moveToCart: s.moveToCart,
    })),
  );
  const isPage = layout === "page";

  function onRemove() {
    const removed = remove(key);
    if (!removed) return;
    toast("Removed from cart", { action: { label: "Undo", onClick: () => restore(removed.item, removed.index) } });
  }

  function onSave() {
    saveForLater(key);
    toast("Saved for later", { action: { label: "Undo", onClick: () => moveToCart(key) } });
  }

  return (
    <li className={cn("flex gap-3 py-4 transition-opacity", isPage && !item.selected && "opacity-60")}>
      {isPage && (
        <input
          type="checkbox"
          checked={item.selected}
          onChange={() => toggleSelected(key)}
          aria-label={`Include ${item.title} in checkout`}
          className="mt-9 size-4 shrink-0 accent-primary"
        />
      )}

      <Link href={`/p/${item.slug}`} onClick={onNavigate} className="shrink-0" tabIndex={-1} aria-hidden>
        <ProductImage
          src={item.image || undefined}
          alt=""
          icon={item.icon}
          className={cn("rounded-lg", isPage ? "size-24 sm:size-28" : "size-20")}
          iconClassName="size-8"
          sizes="112px"
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link href={`/p/${item.slug}`} onClick={onNavigate} className="line-clamp-2 text-sm font-medium hover:underline">
              {item.title}
            </Link>
            {item.variantLabel && <p className="text-xs text-muted-foreground">{item.variantLabel}</p>}
          </div>
          <p className="shrink-0 text-sm font-semibold tabular-nums">{formatPrice(item.price * item.quantity)}</p>
        </div>

        {item.quantity > 1 && <p className="text-xs text-muted-foreground">{formatPrice(item.price)} each</p>}
        {item.quantity >= lineCap(item) && (
          <p className="text-xs text-muted-foreground">Maximum quantity for this item</p>
        )}

        {isPage && (
          <label className="flex w-fit items-center gap-2 text-xs text-muted-foreground">
            <input type="checkbox" checked={!!item.gift} onChange={(e) => setGift(key, e.target.checked)} className="size-3.5 accent-primary" />
            This is a gift
          </label>
        )}

        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-1">
          <QuantityInput value={item.quantity} max={lineCap(item)} onChange={(q) => setQuantity(key, q)} />
          <button type="button" onClick={onRemove} className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
            Remove
          </button>
          {isPage && (
            <button type="button" onClick={onSave} className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
              Save for later
            </button>
          )}
        </div>
      </div>
    </li>
  );
}
