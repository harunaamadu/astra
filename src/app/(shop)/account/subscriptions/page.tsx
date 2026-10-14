import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { EmailPreferences } from "@/components/account/email-preferences";

export const metadata: Metadata = { title: "Astra Plus and subscriptions", robots: { index: false } };

export default function SubscriptionsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold md:text-3xl">Astra Plus and subscriptions</h1>

      <section aria-labelledby="plus-status" className="rounded-2xl border p-6">
        <h2 id="plus-status" className="text-lg font-semibold">Astra Plus</h2>
        <p className="mt-1 text-sm text-muted-foreground">You aren&apos;t a member yet. Members get free standard delivery, early access to deals and longer returns.</p>
        <Button asChild className="mt-4"><Link href="/plus">See membership plans</Link></Button>
      </section>

      <section aria-labelledby="email-prefs" className="rounded-2xl border p-6">
        <h2 id="email-prefs" className="mb-4 text-lg font-semibold">Email preferences</h2>
        <EmailPreferences />
      </section>
    </div>
  );
}