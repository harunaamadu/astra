import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OrderCard } from "@/components/account/order-card";
import { requireSession } from "@/lib/auth/session";
import { getOrdersForUser } from "@/lib/data/orders";

export const metadata: Metadata = { title: "Your account", robots: { index: false } };

export default async function AccountPage() {
  const session = await requireSession("/account");
  const orders = await getOrdersForUser(session.userId);
  const open = orders.filter((o) => o.status === "processing" || o.status === "shipped").length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold md:text-3xl">Welcome back, {session.name}</h1>
        <p className="mt-1 text-muted-foreground">Here&apos;s what&apos;s happening with your orders.</p>
      </div>

      <dl className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border p-5"><dt className="text-sm text-muted-foreground">Total orders</dt><dd className="mt-1 text-3xl font-semibold">{orders.length}</dd></div>
        <div className="rounded-2xl border p-5"><dt className="text-sm text-muted-foreground">On the way</dt><dd className="mt-1 text-3xl font-semibold">{open}</dd></div>
      </dl>

      <section aria-labelledby="recent">
        <div className="mb-3 flex items-baseline justify-between">
          <h2 id="recent" className="text-lg font-semibold">Recent orders</h2>
          <Link href="/account/orders" className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">See all</Link>
        </div>
        {orders.length === 0 ? (
          <p className="rounded-2xl border border-dashed p-8 text-center text-sm text-muted-foreground">No orders yet. When you place one, it will show up here.</p>
        ) : (
          <div className="space-y-3">{orders.slice(0, 2).map((o) => <OrderCard key={o.id} order={o} />)}</div>
        )}
      </section>

      <section className="flex flex-col items-start justify-between gap-4 rounded-2xl bg-primary/15 p-6 sm:flex-row sm:items-center">
        <div className="flex items-start gap-3">
          <Sparkles className="mt-0.5 size-5" aria-hidden />
          <div>
            <h2 className="font-semibold">Get free delivery with Astra Plus</h2>
            <p className="text-sm text-muted-foreground">Free standard delivery, early deals and longer returns.</p>
          </div>
        </div>
        <Button asChild><Link href="/plus">Explore Plus</Link></Button>
      </section>
    </div>
  );
}