import { fetchBlogPosts, fetchInfoPages, fetchLegalDocs } from "@/lib/cms/content";
import { blogPosts } from "@/lib/content/blog";
import { infoPages } from "@/lib/content/info";
import { legalDocs } from "@/lib/content/legal";
import type { BlogPost, InfoPage, LegalDoc } from "@/types/content";

/**
 * Page content: once the CMS has documents of a type, the CMS is the single source of truth
 * (deleting a page there removes it). Before that, the built-in samples are used.
 * Help articles stay in code on purpose: they quote live shipping and returns numbers.
 */
export async function getInfoPages(): Promise<InfoPage[]> {
  const cms = await fetchInfoPages();
  return cms && cms.length ? cms : infoPages;
}
export const getInfoPage = async (slug: string) => (await getInfoPages()).find((p) => p.slug === slug) ?? null;

export async function getLegalDocs(): Promise<LegalDoc[]> {
  const cms = await fetchLegalDocs();
  return cms && cms.length ? cms : legalDocs;
}
export const getLegalDoc = async (slug: string) => (await getLegalDocs()).find((d) => d.slug === slug) ?? null;

export async function getBlogPosts(): Promise<BlogPost[]> {
  const cms = await fetchBlogPosts();
  return cms && cms.length ? cms : blogPosts;
}
export const getBlogPost = async (slug: string) => (await getBlogPosts()).find((p) => p.slug === slug) ?? null;
