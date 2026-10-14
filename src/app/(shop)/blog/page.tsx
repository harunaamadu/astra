import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/content/page-shell";
import { getBlogPosts } from "@/lib/cms/pages";

export const metadata: Metadata = {
  title: "Blog",
  description: "Buying guides and tips from Astra.",
  alternates: { canonical: "/blog" },
};

const fmt = new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeZone: "UTC" });

export default async function BlogPage() {
  const blogPosts = await getBlogPosts();
  return (
    <PageShell title="Blog" intro="Buying guides and tips to help you choose well." width="wide">
      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((p) => (
          <li key={p.slug}>
            <Link href={`/blog/${p.slug}`} className="block h-full rounded-2xl border p-5 transition-colors hover:bg-accent">
              <time dateTime={p.date} className="text-xs text-muted-foreground">{fmt.format(new Date(p.date))}</time>
              <h2 className="mt-2 text-lg font-semibold">{p.title}</h2>
              <p className="mt-1.5 text-sm text-muted-foreground">{p.excerpt}</p>
            </Link>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
