"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useUIStore } from "@/store/ui-store";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/utils";
import { CartItemRow } from "./cart-item-row";
import { CartEmpty } from "./cart-empty";
import { FreeShippingProgress } from "./free-shipping-progress";

/** Slide-over cart. Opened from the header, bottom nav, product pages and "Add to cart" toasts. */
export function CartDrawer() {
  const open = useUIStore((s) => s.cartOpen);
  const setOpen = useUIStore((s) => s.setCartOpen);
  const pathname = usePathname();
  const { ready, items, promo, totals, allSubtotal } = useCart();
  const close = () => setOpen(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname, setOpen]);

  const hasItems = ready && items.length > 0;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right" className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
        <SheetHeader className="border-b p-4 pr-12">
          <SheetTitle>Your cart{hasItems ? ` (${totals.itemCount})` : ""}</SheetTitle>
          <SheetDescription className="sr-only">Review the items in your cart before checking out.</SheetDescription>
        </SheetHeader>

        {!hasItems ? (
          ready && <CartEmpty compact onNavigate={close} />
        ) : (
          <>
            <div className="border-b p-4">
              <FreeShippingProgress subtotal={allSubtotal} promoFreeShipping={promo?.type === "free_shipping"} />
            </div>
            <ul className="flex-1 divide-y overflow-y-auto px-4">
              {items.map((item) => (
                <CartItemRow key={`${item.productId}:${item.variantId ?? ""}`} item={item} layout="drawer" onNavigate={close} />
              ))}
            </ul>
            <SheetFooter className="gap-3 border-t p-4">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-muted-foreground">Subtotal</span>
                <span className="text-lg font-semibold tabular-nums">{formatPrice(allSubtotal)}</span>
              </div>
              <p className="text-xs text-muted-foreground">Shipping, discounts and taxes are shown at checkout.</p>
              <div className="grid grid-cols-2 gap-3">
                <Button asChild variant="outline" size="lg"><Link href="/cart">View cart</Link></Button>
                <Button asChild size="lg"><Link href="/checkout">Checkout</Link></Button>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
