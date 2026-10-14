import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BuyAgainButton } from "@/components/account/buy-again-button";
import { OrderStatusBadge } from "@/components/account/order-status-badge";
import { OrderSummaryCard } from "@/components/account/order-summary-card";
import { OrderTimeline } from "@/components/account/order-timeline";
import { requireSession } from "@/lib/auth/session";
import { getOrder } from "@/lib/data/orders";

export const metadata: Metadata = {
  title: "Order details",
  robots: { index: false },
};

type Props = { params: Promise<{ id: string }> };

const fmt = new Intl.DateTimeFormat("en-US", {
  dateStyle: "long",
  timeZone: "UTC",
});

export default function OrderPage({ params }: Props) {
  return (
    <Suspense
      fallback={
        <div
          role="status"
          aria-label="Loading order"
          className="h-96 animate-pulse rounded-2xl bg-muted"
        />
      }
    >
      <OrderContent params={params} />
    </Suspense>
  );
}

async function OrderContent({ params }: Props) {
  const { id } = await params;
  const session = await requireSession(`/account/orders/${id}`);
  const order = await getOrder(id);
  // A missing order and someone else's order look identical on purpose.
  if (!order || order.userId !== session.userId) notFound();

  return (
    <div className="space-y-6">
      <Link
        href="/account/orders"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="size-4" aria-hidden /> All orders
      </Link>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold md:text-3xl">
            Order {order.id}
          </h1>
          <p className="text-sm text-muted-foreground">
            Placed on{" "}
            <time dateTime={order.createdAt}>
              {fmt.format(new Date(order.createdAt))}
            </time>
          </p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      <div className="rounded-2xl border p-5 md:p-6">
        <OrderTimeline status={order.status} />
      </div>

      <OrderSummaryCard order={order} />

      <div className="flex flex-wrap gap-3">
        <BuyAgainButton items={order.items} />
        <Button asChild variant="ghost">
          <Link href="/help/returns">Return or replace items</Link>
        </Button>
        <Button asChild variant="ghost">
          <Link href="/help">Get help with this order</Link>
        </Button>
      </div>
    </div>
  );
}
