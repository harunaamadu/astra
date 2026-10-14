import Link from "next/link";
import { ProductImage } from "@/components/product/product-image";
import { shippingMethods } from "@/lib/cart/pricing";
import { countryName } from "@/lib/constants/countries";
import { formatPrice } from "@/lib/utils";
import type { Order } from "@/types/order";

const paymentLabels = { card: "Card", "mobile-money": "Mobile money", paypal: "PayPal" } as const;

function Row({ label, value, tone }: { label: string; value: string; tone?: "discount" }) {
  return (
    <div className="flex justify-between gap-4 text-sm">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className={tone === "discount" ? "tabular-nums text-destructive" : "tabular-nums"}>{value}</dd>
    </div>
  );
}

/** Items, delivery details and totals. Used on the confirmation page and the order detail page. */
export function OrderSummaryCard({ order }: { order: Order }) {
  const { address, totals } = order;
  const method = shippingMethods[order.shippingMethod];

  return (
    <div className="divide-y rounded-2xl border">
      <ul className="divide-y px-5">
        {order.items.map((i) => (
          <li key={`${i.productId}:${i.variantId ?? ""}`} className="flex items-center gap-4 py-4">
            <ProductImage src={i.image || undefined} alt="" icon={i.icon} className="size-16 shrink-0 rounded-lg" iconClassName="size-6" sizes="64px" />
            <div className="min-w-0 flex-1 text-sm">
              <Link href={`/p/${i.slug}`} className="line-clamp-2 font-medium hover:underline">{i.title}</Link>
              <p className="text-xs text-muted-foreground">
                {i.variantLabel ? `${i.variantLabel} · ` : ""}Qty {i.quantity}{i.gift ? " · Gift" : ""}
              </p>
            </div>
            <p className="text-sm tabular-nums">{formatPrice(i.price * i.quantity)}</p>
          </li>
        ))}
      </ul>

      <div className="grid gap-6 p-5 sm:grid-cols-2">
        <div className="text-sm">
          <h3 className="mb-1.5 font-semibold">Shipping to</h3>
          <address className="not-italic text-muted-foreground">
            {address.fullName}<br />
            {address.line1}{address.line2 ? `, ${address.line2}` : ""}<br />
            {address.city}, {address.region} {address.postalCode}<br />
            {countryName(address.country)}
          </address>
          <p className="mt-3 text-muted-foreground">{method.label} delivery, {method.description}</p>
          <p className="text-muted-foreground">Paid with {paymentLabels[order.paymentMethod]}</p>
        </div>
        <dl className="space-y-2">
          <Row label="Subtotal" value={formatPrice(totals.subtotal)} />
          {totals.discount > 0 && <Row label={`Discount${order.promoCode ? ` (${order.promoCode})` : ""}`} value={`-${formatPrice(totals.discount)}`} tone="discount" />}
          <Row label="Delivery" value={totals.shipping === 0 ? "Free" : formatPrice(totals.shipping)} />
          <div className="flex justify-between gap-4 border-t pt-2">
            <dt className="font-semibold">Total</dt>
            <dd className="text-lg font-semibold tabular-nums">{formatPrice(totals.total)}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}