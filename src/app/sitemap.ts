import type { MetadataRoute } from "next";
import { getAllCategoryPaths } from "@/lib/catalog/categories";
import { helpArticles } from "@/lib/content/help";
import { getBlogPosts, getInfoPages, getLegalDocs } from "@/lib/data/content";
import { sellers } from "@/lib/data/catalog";
import { getAllProductSlugs } from "@/lib/data/products";

/** No lastModified on purpose: reading the current time is not allowed during prerender. Add real dates from the database in step 6. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const url = (path: string) => `${site}${path}`;

  const fixed = ["/", "/c", "/deals", "/best-sellers", "/new", "/essentials", "/plus", "/sell", "/sell/pro", "/gift-cards", "/help", "/blog"];
  const [slugs, categoryPaths, infoPages, legalDocs, blogPosts] = await Promise.all([
    getAllProductSlugs(), getAllCategoryPaths(), getInfoPages(), getLegalDocs(), getBlogPosts(),
  ]);

  return [
    ...fixed.map((p) => ({ url: url(p), priority: p === "/" ? 1 : 0.7 })),
    ...categoryPaths.map((p) => ({ url: url(`/c/${p}`), priority: 0.8 })),
    ...slugs.map((s) => ({ url: url(`/p/${s}`), priority: 0.6 })),
    ...sellers.map((s) => ({ url: url(`/s/${s.id}`), priority: 0.5 })),
    ...infoPages.map((p) => ({ url: url(`/${p.slug}`), priority: 0.4 })),
    ...helpArticles.map((a) => ({ url: url(`/help/${a.slug}`), priority: 0.4 })),
    ...legalDocs.map((d) => ({ url: url(`/legal/${d.slug}`), priority: 0.2 })),
    ...blogPosts.map((p) => ({ url: url(`/blog/${p.slug}`), priority: 0.4 })),
  ];
}
