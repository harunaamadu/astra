import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { OrderCard } from "@/components/account/order-card";
import { requireSession } from "@/lib/auth/session";
import { getOrdersForUser } from "@/lib/data/orders";

export const metadata: Metadata = { title: "Your orders", robots: { index: false } };

export default async function OrdersPage() {
  const session = await requireSession("/account/orders");
  const orders = await getOrdersForUser(session.userId);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold md:text-3xl">Your orders</h1>
      {orders.length === 0 ? (
        <div className="flex flex-col items-center rounded-2xl border border-dashed px-6 py-16 text-center">
          <h2 className="text-lg font-semibold">No orders yet</h2>
          <p className="mt-1 text-sm text-muted-foreground">When you place an order, you can track it here.</p>
          <Button asChild className="mt-5"><Link href="/">Start shopping</Link></Button>
        </div>
      ) : (
        <div className="space-y-3">{orders.map((o) => <OrderCard key={o.id} order={o} />)}</div>
      )}
    </div>
  );
}