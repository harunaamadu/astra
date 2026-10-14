import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CtaBanner } from "@/components/content/cta-banner";
import { FaqAccordion } from "@/components/content/faq-accordion";
import { PageShell } from "@/components/content/page-shell";
import { PricingCards } from "@/components/content/pricing-cards";
import { referralRates, sellerPlans } from "@/lib/constants/plans";

export const metadata: Metadata = {
  title: "Sell on Astra",
  description: "Reach shoppers, track sales and promote listings. No monthly fee to start.",
  alternates: { canonical: "/sell" },
};

const steps = [
  { title: "Create your seller account", text: "Tell us about your business and verify your identity." },
  { title: "List your products", text: "Add products one by one or upload them in bulk." },
  { title: "Ship and get paid", text: "We notify you of each order, and you are paid after delivery." },
];

const faq = [
  { question: "What does it cost to start?", answer: "Nothing. The Starter plan has no monthly fee. You pay a referral fee only when something sells." },
  { question: "How are referral fees calculated?", answer: "As a percentage of the item price, set by category. See the table above." },
  { question: "When do I get paid?", answer: "Payouts are sent after the buyer's return window starts, to the account you register." },
  { question: "How do sponsored placements work?", answer: "You choose products and a budget, and pay only when shoppers click. Sponsored results are always labelled." },
];

export default function SellPage() {
  return (
    <PageShell title="Sell on Astra" intro="Reach shoppers, track sales from one dashboard, and promote listings when you want more visibility." width="wide">
      <div className="space-y-14">
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg"><Link href="/sign-up?next=/sell">Start selling</Link></Button>
          <Button asChild size="lg" variant="outline"><Link href="/sell/pro">See Seller Pro</Link></Button>
        </div>

        <section aria-labelledby="how">
          <h2 id="how" className="mb-4 text-2xl font-semibold">How it works</h2>
          <ol className="grid gap-4 md:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.title} className="rounded-xl border p-5">
                <span aria-hidden className="mb-3 grid size-8 place-items-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">{i + 1}</span>
                <h3 className="font-medium">{s.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="fees">
          <h2 id="fees" className="mb-4 text-2xl font-semibold">Referral fees</h2>
          <div className="max-w-2xl overflow-x-auto rounded-xl border">
            <table className="w-full text-sm">
              <caption className="sr-only">Referral fee by category</caption>
              <thead className="bg-secondary/60 text-left"><tr><th scope="col" className="px-4 py-3 font-medium">Category</th><th scope="col" className="px-4 py-3 font-medium">Fee</th></tr></thead>
              <tbody className="divide-y">
                {referralRates.map((r) => (
                  <tr key={r.category}><th scope="row" className="px-4 py-3 text-left font-normal">{r.category}</th><td className="px-4 py-3 tabular-nums">{r.rate}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section aria-labelledby="plans">
          <h2 id="plans" className="mb-4 text-2xl font-semibold">Plans</h2>
          <PricingCards plans={sellerPlans} />
        </section>

        <section aria-labelledby="faq">
          <h2 id="faq" className="mb-4 text-2xl font-semibold">Questions</h2>
          <FaqAccordion faq={faq} />
        </section>

        <CtaBanner title="Ready to start?" text="Create a seller account in a few minutes." label="Start selling" href="/sign-up?next=/sell" />
      </div>
    </PageShell>
  );
}
