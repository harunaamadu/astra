import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentSections } from "@/components/content/content-sections";
import { PageShell } from "@/components/content/page-shell";
import { getBlogPost, getBlogPosts } from "@/lib/data/content";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getBlogPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = await getBlogPost(slug);
  return p
    ? { title: p.title, description: p.excerpt, alternates: { canonical: `/blog/${slug}` }, openGraph: { type: "article", title: p.title, description: p.excerpt, publishedTime: p.date } }
    : { title: "Post not found" };
}

const fmt = new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeZone: "UTC" });

export default function BlogPostPage({ params }: Props) {
  return (
    <Suspense fallback={<div role="status" aria-label="Loading" className="mx-auto h-96 max-w-3xl animate-pulse px-4" />}>
      <BlogPostContent params={params} />
    </Suspense>
  );
}

async function BlogPostContent({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();
  return (
    <PageShell
      title={post.title}
      intro={post.excerpt}
      trail={[{ label: "Blog", href: "/blog" }]}
      meta={<p className="mt-3 text-sm text-muted-foreground"><time dateTime={post.date}>{fmt.format(new Date(post.date))}</time></p>}
    >
      <ContentSections sections={post.body} />
    </PageShell>
  );
}
