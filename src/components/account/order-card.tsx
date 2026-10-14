import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductImage } from "@/components/product/product-image";
import { formatPrice } from "@/lib/utils";
import type { Order } from "@/types/order";
import { OrderStatusBadge } from "./order-status-badge";

const fmt = new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeZone: "UTC" });

export function OrderCard({ order }: { order: Order }) {
  const units = order.items.reduce((n, i) => n + i.quantity, 0);
  return (
    <article className="rounded-2xl border p-4 md:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm">
          <p className="font-medium">Order {order.id}</p>
          <p className="text-muted-foreground">
            Placed <time dateTime={order.createdAt}>{fmt.format(new Date(order.createdAt))}</time> · {units} {units === 1 ? "item" : "items"}
          </p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <ul className="flex -space-x-2" aria-label="Items in this order">
          {order.items.slice(0, 4).map((i) => (
            <li key={`${i.productId}:${i.variantId ?? ""}`}>
              <ProductImage src={i.image || undefined} alt={i.title} icon={i.icon} className="size-12 rounded-lg border-2 border-background" iconClassName="size-5" sizes="48px" />
            </li>
          ))}
          {order.items.length > 4 && (
            <li className="grid size-12 place-items-center rounded-lg border-2 border-background bg-secondary text-xs">+{order.items.length - 4}</li>
          )}
        </ul>
        <div className="flex items-center gap-4">
          <p className="text-lg font-semibold tabular-nums">{formatPrice(order.totals.total)}</p>
          <Button asChild variant="outline" size="sm"><Link href={`/account/orders/${order.id}`}>View order</Link></Button>
        </div>
      </div>
    </article>
  );
}