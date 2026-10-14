import { blogPosts as sampleBlog } from "@/lib/content/blog";
import { helpArticles as sampleHelp, helpFaq as sampleFaq } from "@/lib/content/help";
import { infoPages as sampleInfo } from "@/lib/content/info";
import { legalDocs as sampleLegal } from "@/lib/content/legal";
import { sanityFetch } from "@/lib/sanity/fetch";
import {
  blogPostsQuery,
  helpArticlesQuery,
  helpFaqQuery,
  infoPagesQuery,
  legalDocsQuery,
} from "@/lib/sanity/queries";
import type { BlogPost, HelpArticle, InfoPage, LegalDoc } from "@/types/content";
import { fillTokens } from "./tokens";

/** Documents from Sanity when there are any, otherwise the static samples. Dates sort newest first for blog. */
const orSample = <T>(cms: T[] | null, sample: T[]) => (cms?.length ? cms : sample);

export async function getBlogPosts(): Promise<BlogPost[]> {
  const cms = await sanityFetch<BlogPost[]>(blogPostsQuery, ["sanity:blog"]);
  return cms?.length ? cms : [...sampleBlog].sort((a, b) => b.date.localeCompare(a.date));
}
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  return (await getBlogPosts()).find((p) => p.slug === slug) ?? null;
}

export async function getInfoPages(): Promise<InfoPage[]> {
  return orSample(await sanityFetch<InfoPage[]>(infoPagesQuery, ["sanity:info"]), sampleInfo);
}
export async function getInfoPage(slug: string): Promise<InfoPage | null> {
  return (await getInfoPages()).find((p) => p.slug === slug) ?? null;
}

export async function getHelpArticles(): Promise<HelpArticle[]> {
  const cms = await sanityFetch<HelpArticle[]>(helpArticlesQuery, ["sanity:help"]);
  return fillTokens(orSample(cms, sampleHelp));
}
export async function getHelpArticle(slug: string): Promise<HelpArticle | null> {
  return (await getHelpArticles()).find((a) => a.slug === slug) ?? null;
}
export async function getHelpFaq(): Promise<{ question: string; answer: string }[]> {
  const cms = await sanityFetch<{ question: string; answer: string }[]>(helpFaqQuery, ["sanity:help"]);
  return fillTokens(orSample(cms, sampleFaq));
}

export async function getLegalDocs(): Promise<LegalDoc[]> {
  return fillTokens(orSample(await sanityFetch<LegalDoc[]>(legalDocsQuery, ["sanity:legal"]), sampleLegal));
}
export async function getLegalDoc(slug: string): Promise<LegalDoc | null> {
  return (await getLegalDocs()).find((d) => d.slug === slug) ?? null;
}
