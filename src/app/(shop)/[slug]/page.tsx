import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InfoPageView } from "@/components/content/info-page-view";
import { getInfoPage, infoPages } from "@/lib/content/info";

type Props = { params: Promise<{ slug: string }> };

/** About, careers, press, sustainability, advertise, affiliates, registry. Static routes like /cart win over this. */
export function generateStaticParams() {
  return infoPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getInfoPage(slug);
  return page ? { title: page.title, description: page.description, alternates: { canonical: `/${slug}` } } : { title: "Page not found" };
}

export default function InfoPageRoute({ params }: Props) {
  return (
    <Suspense fallback={<div role="status" aria-label="Loading" className="mx-auto h-96 max-w-6xl animate-pulse px-4" />}>
      <InfoContent params={params} />
    </Suspense>
  );
}

async function InfoContent({ params }: Props) {
  const { slug } = await params;
  const page = getInfoPage(slug);
  if (!page) notFound();
  return <InfoPageView page={page} />;
}
