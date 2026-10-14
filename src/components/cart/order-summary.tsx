"use client";

import Link from "next/link";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/utils";
import { FreeShippingProgress } from "./free-shipping-progress";
import { PromoCodeForm } from "./promo-code-form";
import { ShippingOptions } from "./shipping-options";

function Row({ label, value, tone }: { label: string; value: string; tone?: "discount" }) {
  return (
    <div className="flex items-baseline justify-between gap-4 text-sm">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className={tone === "discount" ? "tabular-nums text-destructive" : "tabular-nums"}>{value}</dd>
    </div>
  );
}

export function OrderSummary() {
  const { promo, shippingMethod, totals } = useCart();
  const none = totals.selectedCount === 0;

  return (
    <aside aria-label="Order summary" className="space-y-5 rounded-2xl border p-5 lg:sticky lg:top-28">
      <h2 className="text-lg font-semibold">Order summary</h2>

      <FreeShippingProgress subtotal={totals.subtotal} promoFreeShipping={promo?.type === "free_shipping"} />
      <PromoCodeForm subtotal={totals.subtotal} promo={promo} />
      {promo && totals.promoBelowMinimum && promo.minSubtotal && (
        <p className="-mt-3 text-xs text-muted-foreground">
          Spend {formatPrice(promo.minSubtotal - totals.subtotal)} more to use {promo.code}.
        </p>
      )}
      <ShippingOptions value={shippingMethod} freeStandard={totals.freeShippingEligible} />

      <dl className="space-y-2 border-t pt-4">
        <Row label={`Subtotal (${totals.selectedCount} ${totals.selectedCount === 1 ? "item" : "items"})`} value={formatPrice(totals.subtotal)} />
        {totals.discount > 0 && <Row label={`Discount (${promo?.code})`} value={`-${formatPrice(totals.discount)}`} tone="discount" />}
        <Row label="Delivery" value={none ? "-" : totals.shipping === 0 ? "Free" : formatPrice(totals.shipping)} />
        <div className="flex items-baseline justify-between gap-4 border-t pt-3">
          <dt className="font-semibold">Estimated total</dt>
          <dd className="text-xl font-semibold tabular-nums">{formatPrice(totals.total)}</dd>
        </div>
      </dl>
      <p className="-mt-2 text-xs text-muted-foreground">Taxes are calculated at checkout.</p>

      {none ? (
        <Button size="lg" className="w-full" disabled>Select items to check out</Button>
      ) : (
        <Button asChild size="lg" className="w-full">
          <Link href="/checkout">Checkout ({totals.selectedCount})</Link>
        </Button>
      )}
      <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
        <Lock className="size-3.5" aria-hidden /> Secure checkout
      </p>
    </aside>
  );
}
