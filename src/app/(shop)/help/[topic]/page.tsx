import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentSections } from "@/components/content/content-sections";
import { PageShell } from "@/components/content/page-shell";
import { getHelpArticle, helpArticles } from "@/lib/content/help";

type Props = { params: Promise<{ topic: string }> };

export function generateStaticParams() {
  return helpArticles.map((a) => ({ topic: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { topic } = await params;
  const a = getHelpArticle(topic);
  return a ? { title: a.title, description: a.summary, alternates: { canonical: `/help/${topic}` } } : { title: "Help topic not found" };
}

export default function HelpTopicPage({ params }: Props) {
  return (
    <Suspense fallback={<div role="status" aria-label="Loading" className="mx-auto h-96 max-w-3xl animate-pulse px-4" />}>
      <HelpTopicContent params={params} />
    </Suspense>
  );
}

async function HelpTopicContent({ params }: Props) {
  const { topic } = await params;
  const article = getHelpArticle(topic);
  if (!article) notFound();
  return (
    <PageShell title={article.title} intro={article.summary} trail={[{ label: "Help center", href: "/help" }]}>
      <ContentSections sections={article.sections} />
    </PageShell>
  );
}
