"use client";

import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductImage } from "@/components/product/product-image";
import { PromoCodeForm } from "@/components/cart/promo-code-form";
import { formatPrice } from "@/lib/utils";
import type { CartItem } from "@/types";
import type { AppliedPromo, CartTotals } from "@/types/cart";

type Props = { items: CartItem[]; totals: CartTotals; promo: AppliedPromo | null; pending: boolean };

function Row({ label, value, tone }: { label: string; value: string; tone?: "discount" }) {
  return (
    <div className="flex items-baseline justify-between gap-4 text-sm">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className={tone === "discount" ? "tabular-nums text-destructive" : "tabular-nums"}>{value}</dd>
    </div>
  );
}

/** Lives outside the <form> (the promo field is its own form), so the button targets it by id. */
export function CheckoutSummary({ items, totals, promo, pending }: Props) {
  return (
    <aside aria-label="Order summary" className="space-y-5 rounded-2xl border p-5 lg:sticky lg:top-6">
      <h2 className="text-lg font-semibold">Order summary</h2>

      <ul className="space-y-3">
        {items.map((i) => (
          <li key={`${i.productId}:${i.variantId ?? ""}`} className="flex items-center gap-3">
            <span className="relative shrink-0">
              <ProductImage src={i.image || undefined} alt="" icon={i.icon} className="size-14 rounded-lg" iconClassName="size-5" sizes="56px" />
              <span className="absolute -right-1.5 -top-1.5 grid min-w-5 place-items-center rounded-full bg-foreground px-1 text-[11px] font-medium leading-5 text-background">
                {i.quantity}
              </span>
            </span>
            <span className="min-w-0 flex-1 text-sm">
              <span className="line-clamp-1 block font-medium">{i.title}</span>
              {i.variantLabel && <span className="text-xs text-muted-foreground">{i.variantLabel}</span>}
            </span>
            <span className="text-sm tabular-nums">{formatPrice(i.price * i.quantity)}</span>
          </li>
        ))}
      </ul>

      <PromoCodeForm subtotal={totals.subtotal} promo={promo} />

      <dl className="space-y-2 border-t pt-4">
        <Row label="Subtotal" value={formatPrice(totals.subtotal)} />
        {totals.discount > 0 && <Row label={`Discount (${promo?.code})`} value={`-${formatPrice(totals.discount)}`} tone="discount" />}
        <Row label="Delivery" value={totals.shipping === 0 ? "Free" : formatPrice(totals.shipping)} />
        <div className="flex items-baseline justify-between gap-4 border-t pt-3">
          <dt className="font-semibold">Total</dt>
          <dd className="text-xl font-semibold tabular-nums">{formatPrice(totals.total)}</dd>
        </div>
      </dl>
      <p className="-mt-2 text-xs text-muted-foreground">Taxes are included where applicable.</p>

      <Button type="submit" form="checkout-form" size="lg" className="w-full" disabled={pending}>
        {pending ? "Placing order" : `Place order, ${formatPrice(totals.total)}`}
      </Button>
      <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
        <Lock className="size-3.5" aria-hidden /> Your payment details are handled securely by our provider.
      </p>
    </aside>
  );
}