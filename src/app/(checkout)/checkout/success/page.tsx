import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OrderSummaryCard } from "@/components/account/order-summary-card";
import { getSession } from "@/lib/auth/session";
import { getOrder } from "@/lib/data/orders";

export const metadata: Metadata = { title: "Order confirmed", robots: { index: false } };

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default function SuccessPage({ searchParams }: Props) {
  return (
    <Suspense fallback={<div role="status" aria-label="Loading order" className="h-72 animate-pulse rounded-2xl bg-muted" />}>
      <SuccessContent searchParams={searchParams} />
    </Suspense>
  );
}

async function SuccessContent({ searchParams }: Props) {
  const sp = await searchParams;
  const id = typeof sp.order === "string" ? sp.order : "";
  const [order, session] = await Promise.all([id ? getOrder(id) : null, getSession()]);
  // Only the order's owner may see it, so a guessed id reveals nothing.
  const visible = order && order.userId === (session?.userId ?? "guest") ? order : null;

  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex flex-col items-center text-center">
        <CheckCircle2 className="size-14 text-primary" strokeWidth={1.5} aria-hidden />
        <h1 className="mt-4 text-3xl font-bold">Thank you for your order</h1>
        <p className="mt-2 text-muted-foreground">
          {visible
            ? `Order ${visible.id} is confirmed. We've sent the details to ${visible.email}.`
            : "Your order is confirmed. You can find it in your account."}
        </p>
      </div>

      {visible && <div className="mt-8"><OrderSummaryCard order={visible} /></div>}

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button asChild size="lg"><Link href="/">Continue shopping</Link></Button>
        <Button asChild size="lg" variant="outline">
          <Link href={visible ? `/account/orders/${visible.id}` : "/account/orders"}>View order</Link>
        </Button>
      </div>
    </div>
  );
}