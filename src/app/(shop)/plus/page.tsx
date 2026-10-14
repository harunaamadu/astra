import type { Metadata } from "next";
import { CtaBanner } from "@/components/content/cta-banner";
import { FaqAccordion } from "@/components/content/faq-accordion";
import { PageShell } from "@/components/content/page-shell";
import { PricingCards } from "@/components/content/pricing-cards";
import { plusBenefits, plusPlans } from "@/lib/constants/plans";
import { PLUS_RETURN_WINDOW_DAYS } from "@/lib/constants/policies";

export const metadata: Metadata = {
  title: "Astra Plus",
  description: "Free delivery, early access to deals and longer returns with Astra Plus.",
  alternates: { canonical: "/plus" },
};

const faq = [
  { question: "Can I cancel any time?", answer: "Yes. Cancel from Astra Plus in your account and you keep the benefits until the end of the period you've paid for." },
  { question: "Which orders get free delivery?", answer: "Standard delivery is free on eligible orders over $10. Express delivery is charged at the normal rate." },
  { question: "How do longer returns work?", answer: `Members have ${PLUS_RETURN_WINDOW_DAYS} days to return eligible items, instead of the usual 30.` },
];

export default function PlusPage() {
  return (
    <PageShell title="Astra Plus" intro="Free delivery, early access to deals and longer returns, for one simple price." width="wide">
      <div className="space-y-14">
        <section aria-labelledby="benefits">
          <h2 id="benefits" className="mb-4 text-2xl font-semibold">What you get</h2>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {plusBenefits.map((b) => (
              <li key={b.title} className="rounded-xl border p-4">
                <h3 className="font-medium">{b.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{b.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="plans">
          <h2 id="plans" className="mb-4 text-2xl font-semibold">Choose a plan</h2>
          <PricingCards plans={plusPlans} />
        </section>

        <section aria-labelledby="faq">
          <h2 id="faq" className="mb-4 text-2xl font-semibold">Questions</h2>
          <FaqAccordion faq={faq} />
        </section>

        <CtaBanner title="Not ready yet?" text="Keep shopping. You can join any time from your account." label="Browse deals" href="/deals" />
      </div>
    </PageShell>
  );
}
