import type { Metadata } from "next";
import { GiftCardForm } from "@/components/content/gift-card-form";
import { PageShell } from "@/components/content/page-shell";

export const metadata: Metadata = {
  title: "Gift cards",
  description: "Send an Astra gift card by email. Choose an amount from $25 to $200.",
  alternates: { canonical: "/gift-cards" },
};

export default function GiftCardsPage() {
  return (
    <PageShell title="Gift cards" intro="The easy gift. Delivered by email and usable on any Astra order." width="wide">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <GiftCardForm />
        <div className="space-y-6 text-muted-foreground">
          <div>
            <h2 className="mb-1.5 text-lg font-semibold text-foreground">How it works</h2>
            <ol className="list-decimal space-y-1.5 pl-5">
              <li>Choose an amount and check out.</li>
              <li>We email the gift card code.</li>
              <li>The code is entered at checkout and applied to the order.</li>
            </ol>
          </div>
          <div>
            <h2 className="mb-1.5 text-lg font-semibold text-foreground">Good to know</h2>
            <ul className="list-disc space-y-1.5 pl-5">
              <li>Digital gift cards cannot be returned.</li>
              <li>Keep the code private. Anyone with it can spend the balance.</li>
            </ul>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
