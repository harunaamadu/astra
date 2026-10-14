"use client";

import Link from "next/link";
import { toast } from "sonner";
import { useCart } from "@/hooks/use-cart";
import { useCartStore } from "@/store/cart-store";
import { CartItemRow } from "./cart-item-row";
import { CartEmpty } from "./cart-empty";
import { OrderSummary } from "./order-summary";
import { SavedForLater } from "./saved-for-later";
import { StickyCheckoutBar } from "./sticky-checkout-bar";

function Bone({ className }: { className: string }) {
  return <div aria-hidden className={`animate-pulse rounded-md bg-muted ${className}`} />;
}

function CartSkeleton() {
  return (
    <div role="status" aria-label="Loading your cart" className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_24rem]">
      <div className="space-y-4">
        {Array.from({ length: 3 }, (_, i) => <Bone key={i} className="h-28 w-full" />)}
      </div>
      <Bone className="h-96 w-full rounded-2xl" />
    </div>
  );
}

export function CartPageContent() {
  const { ready, items, saved, totals } = useCart();
  const setAllSelected = useCartStore((s) => s.setAllSelected);
  const clear = useCartStore((s) => s.clear);
  const restoreAll = useCartStore((s) => s.restoreAll);

  if (!ready) return <CartSkeleton />;
  if (items.length === 0 && saved.length === 0) return <CartEmpty />;

  const allSelected = items.length > 0 && items.every((i) => i.selected);

  function onClear() {
    const previous = clear();
    toast("Cart cleared", { action: { label: "Undo", onClick: () => restoreAll(previous) } });
  }

  return (
    <div className="pb-20 lg:pb-0">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_24rem] lg:gap-10">
        <div>
          {items.length === 0 ? (
            <div className="rounded-xl border p-6 text-center">
              <p className="font-medium">Your cart is empty</p>
              <p className="mt-1 text-sm text-muted-foreground">Items you saved for later are below.</p>
              <Link href="/" className="mt-3 inline-block text-sm underline-offset-4 hover:underline">Continue shopping</Link>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between gap-4 pb-3">
                <label className="flex cursor-pointer items-center gap-3 text-sm">
                  <input type="checkbox" checked={allSelected} onChange={(e) => setAllSelected(e.target.checked)} className="size-4 accent-primary" />
                  <span>Select all ({totals.itemCount} {totals.itemCount === 1 ? "item" : "items"})</span>
                </label>
                <button type="button" onClick={onClear} className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
                  Clear cart
                </button>
              </div>
              <ul className="divide-y border-t">
                {items.map((item) => (
                  <CartItemRow key={`${item.productId}:${item.variantId ?? ""}`} item={item} layout="page" />
                ))}
              </ul>
            </>
          )}
          <SavedForLater items={saved} />
        </div>

        {items.length > 0 && <OrderSummary />}
      </div>
      {items.length > 0 && <StickyCheckoutBar totals={totals} />}
    </div>
  );
}
