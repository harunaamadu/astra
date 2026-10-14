import type { Metadata } from "next";
import { Check, Minus } from "lucide-react";
import { CtaBanner } from "@/components/content/cta-banner";
import { PageShell } from "@/components/content/page-shell";
import { PricingCards } from "@/components/content/pricing-cards";
import { sellerPlans } from "@/lib/constants/plans";

export const metadata: Metadata = {
  title: "Seller Pro",
  description: "Lower fees, advanced analytics and ad credit for growing sellers.",
  alternates: { canonical: "/sell/pro" },
};

const rows: [string, boolean, boolean][] = [
  ["Unlimited listings", true, true],
  ["Sales dashboard", true, true],
  ["Sponsored placements", true, true],
  ["Referral fees reduced by 3 points", false, true],
  ["Advanced analytics and exports", false, true],
  ["$20 monthly ad credit", false, true],
  ["Bulk upload", false, true],
  ["Priority seller support", false, true],
];

const Mark = ({ on, label }: { on: boolean; label: string }) =>
  on ? <Check className="mx-auto size-4 text-primary" aria-label={`${label}: included`} /> : <Minus className="mx-auto size-4 text-muted-foreground" aria-label={`${label}: not included`} />;

export default function SellerProPage() {
  return (
    <PageShell title="Seller Pro" intro="Lower fees, deeper analytics and monthly ad credit for sellers who are growing." trail={[{ label: "Sell on Astra", href: "/sell" }]} width="wide">
      <div className="space-y-14">
        <PricingCards plans={sellerPlans} />

        <section aria-labelledby="compare">
          <h2 id="compare" className="mb-4 text-2xl font-semibold">Compare plans</h2>
          <div className="overflow-x-auto rounded-xl border">
            <table className="w-full text-sm">
              <caption className="sr-only">Starter and Seller Pro features</caption>
              <thead className="bg-secondary/60"><tr><th scope="col" className="px-4 py-3 text-left font-medium">Feature</th><th scope="col" className="px-4 py-3 font-medium">Starter</th><th scope="col" className="px-4 py-3 font-medium">Seller Pro</th></tr></thead>
              <tbody className="divide-y">
                {rows.map(([label, starter, pro]) => (
                  <tr key={label}>
                    <th scope="row" className="px-4 py-3 text-left font-normal">{label}</th>
                    <td className="px-4 py-3"><Mark on={starter} label={label} /></td>
                    <td className="px-4 py-3"><Mark on={pro} label={label} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <CtaBanner title="Grow with Seller Pro" text="Upgrade any time from your seller dashboard." label="Go Pro" href="/sign-up?next=/sell/pro" />
      </div>
    </PageShell>
  );
}
