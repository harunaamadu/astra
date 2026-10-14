import { Suspense } from "react";
import type { Metadata } from "next";
import { CheckoutForm } from "@/components/checkout/checkout-form";
import { getSession } from "@/lib/auth/session";

export const metadata: Metadata = { title: "Checkout", robots: { index: false } };

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div role="status" aria-label="Loading checkout" className="h-96 animate-pulse rounded-2xl bg-muted" />}>
      <CheckoutContent />
    </Suspense>
  );
}

async function CheckoutContent() {
  const session = await getSession(); // guests are allowed; this only prefills
  return (
    <>
      <h1 className="mb-6 text-2xl font-semibold md:text-3xl">Checkout</h1>
      <CheckoutForm defaults={{ email: session?.email ?? "", fullName: session?.name ?? "" }} />
    </>
  );
}