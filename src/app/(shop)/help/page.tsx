import type { Metadata } from "next";
import Link from "next/link";
import { LifeBuoy, Mail } from "lucide-react";
import { FaqAccordion } from "@/components/content/faq-accordion";
import { PageShell } from "@/components/content/page-shell";
import { getHelpArticles, getHelpFaq } from "@/lib/cms/pages";

export const metadata: Metadata = {
  title: "Help center",
  description: "Answers about orders, delivery, returns and payments.",
  alternates: { canonical: "/help" },
};

export default async function HelpPage() {
  const [helpArticles, helpFaq] = await Promise.all([getHelpArticles(), getHelpFaq()]);
  return (
    <PageShell title="Help center" intro="Find answers about orders, delivery, returns and payments." width="wide">
      <div className="space-y-14">
        <section aria-labelledby="topics">
          <h2 id="topics" className="mb-4 text-2xl font-semibold">Browse topics</h2>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {helpArticles.map((a) => (
              <li key={a.slug}>
                <Link href={`/help/${a.slug}`} className="block h-full rounded-xl border p-5 transition-colors hover:bg-accent">
                  <h3 className="font-medium">{a.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{a.summary}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="faq">
          <h2 id="faq" className="mb-4 text-2xl font-semibold">Common questions</h2>
          <FaqAccordion faq={helpFaq} />
        </section>

        <section aria-labelledby="contact" className="flex items-start gap-4 rounded-2xl bg-secondary/60 p-6">
          <LifeBuoy className="mt-1 size-6 shrink-0" strokeWidth={1.5} aria-hidden />
          <div>
            <h2 id="contact" className="text-lg font-semibold">Still need help?</h2>
            <p className="mt-1 text-sm text-muted-foreground">Include your order number so we can find it quickly.</p>
            <a href="mailto:support@astra.example" className="mt-3 inline-flex items-center gap-2 text-sm underline underline-offset-4">
              <Mail className="size-4" aria-hidden /> support@astra.example
            </a>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
