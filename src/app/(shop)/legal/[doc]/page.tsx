import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentSections } from "@/components/content/content-sections";
import { CookiePreferences } from "@/components/content/cookie-preferences";
import { PageShell } from "@/components/content/page-shell";
import { getLegalDoc, getLegalDocs } from "@/lib/cms/pages";

type Props = { params: Promise<{ doc: string }> };

export async function generateStaticParams() {
  return (await getLegalDocs()).map((d) => ({ doc: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { doc } = await params;
  const d = await getLegalDoc(doc);
  return d ? { title: d.title, description: d.summary, alternates: { canonical: `/legal/${doc}` } } : { title: "Document not found" };
}

const fmt = new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeZone: "UTC" });

export default function LegalPage({ params }: Props) {
  return (
    <Suspense fallback={<div role="status" aria-label="Loading" className="mx-auto h-96 max-w-3xl animate-pulse px-4" />}>
      <LegalContent params={params} />
    </Suspense>
  );
}

async function LegalContent({ params }: Props) {
  const { doc } = await params;
  const d = await getLegalDoc(doc);
  if (!d) notFound();
  return (
    <PageShell
      title={d.title}
      intro={d.summary}
      trail={[{ label: "Legal", href: "/legal/terms" }]}
      meta={<p className="mt-3 text-sm text-muted-foreground">Last updated <time dateTime={d.updated}>{fmt.format(new Date(d.updated))}</time></p>}
    >
      <ContentSections sections={d.sections} />
      {d.slug === "cookies" && <CookiePreferences />}
    </PageShell>
  );
}
