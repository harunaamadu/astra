"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import type { CartTotals } from "@/types/cart";

/** Mobile only. Sits above the bottom nav so the total and checkout stay in reach while scrolling. */
export function StickyCheckoutBar({ totals }: { totals: CartTotals }) {
  const none = totals.selectedCount === 0;
  return (
    <div className="fixed inset-x-0 bottom-[calc(3.5rem+env(safe-area-inset-bottom))] z-30 flex items-center gap-3 border-t bg-background px-4 py-2.5 lg:hidden">
      <div className="flex-1">
        <p className="text-xs text-muted-foreground">Estimated total</p>
        <p className="text-lg font-semibold tabular-nums">{formatPrice(totals.total)}</p>
      </div>
      {none ? (
        <Button disabled>Checkout</Button>
      ) : (
        <Button asChild><Link href="/checkout">Checkout ({totals.selectedCount})</Link></Button>
      )}
    </div>
  );
}
