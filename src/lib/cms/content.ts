import { cacheLife, cacheTag } from "next/cache";
import { asIconKey } from "@/lib/constants/icon-keys";
import { isSanityConfigured } from "@/sanity/env";
import { imageUrl } from "@/sanity/image";
import { sanityFetch } from "@/sanity/client";
import {
  blogPostsQuery, categoryTilesQuery, heroSlidesQuery, infoPagesQuery, legalDocsQuery,
  navigationQuery, productContentQuery, promoBannersQuery, shortcutsQuery,
} from "@/sanity/queries";
import type { CategoryTile, NavGroup, NavLink, PromoBanner, Shortcut } from "@/types";
import type { CmsHeroSlide, Navigation } from "@/types/cms";
import type { BlogPost, InfoPage, LegalDoc, Section } from "@/types/content";
import type { ProductMedia, ProductSpec } from "@/types/product";

/**
 * Raw CMS access. Every function:
 *  - is cached ("use cache") and tagged, so the webhook can clear exactly what changed;
 *  - returns null when Sanity isn't configured, so lib/data can fall back to sample content;
 *  - never caches a failure: errors are thrown, and Next.js keeps serving the last good copy.
 * Nothing from the CMS is trusted: values are shaped and validated here.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

const str = (v: unknown): string | undefined => (typeof v === "string" && v.trim() ? v : undefined);
const list = <T>(v: unknown, map: (x: any) => T | undefined): T[] =>
  Array.isArray(v) ? v.map(map).filter((x): x is T => x !== undefined) : [];

const link = (x: any): NavLink | undefined => {
  const label = str(x?.label);
  const href = str(x?.href);
  return label && href && (href.startsWith("/") || href.startsWith("https://")) ? { label, href } : undefined;
};

function sections(raw: unknown): Section[] {
  return list(raw, (s: any) => {
    const heading = str(s?.heading);
    if (!heading) return undefined;
    return {
      heading,
      paragraphs: list(s.paragraphs, str),
      items: list(s.items, (i: any) => (str(i?.title) && str(i?.text) ? { title: i.title, text: i.text } : undefined)),
    };
  });
}

/* ------------------------------ navigation ------------------------------ */

export async function fetchNavigation(): Promise<Partial<Navigation> | null> {
  "use cache";
  cacheTag("sanity", "sanity:category", "sanity:siteSettings");
  cacheLife("hours");
  if (!isSanityConfigured) return null;

  const raw = await sanityFetch<any>(navigationQuery);

  const departments = list(raw?.departments, (d: any) => {
    const slug = str(d?.slug);
    const title = str(d?.title);
    if (!slug || !title) return undefined;
    const groups = new Map<string, NavLink[]>();
    for (const c of Array.isArray(d.children) ? d.children : []) {
      const cs = str(c?.slug);
      const ct = str(c?.title);
      if (!cs || !ct) continue;
      const key = str(c.menuGroup)?.trim() || "Browse";
      groups.set(key, [...(groups.get(key) ?? []), { label: ct, href: `/c/${slug}/${cs}` }]);
    }
    return {
      id: slug,
      label: title,
      href: `/c/${slug}`,
      groups: [...groups].map(([title, links]): NavGroup => ({ title, links })),
    };
  });

  const s = raw?.settings;
  return {
    departments,
    utilityLinks: list(s?.utilityLinks, link),
    subNavLinks: list(s?.subNavLinks, link),
    popularSearches: list(s?.popularSearches, str),
    legalLinks: list(s?.legalLinks, link),
    footerColumns: list(s?.footerColumns, (c: any) => {
      const title = str(c?.title);
      return title ? { title, links: list(c.links, link) } : undefined;
    }),
  };
}

/* ------------------------------- homepage ------------------------------- */

export async function fetchHeroSlides(): Promise<CmsHeroSlide[] | null> {
  "use cache";
  cacheTag("sanity", "sanity:heroSlide");
  cacheLife("minutes"); // slides can be scheduled, so keep this fresh
  if (!isSanityConfigured) return null;

  const raw = await sanityFetch<any[]>(heroSlidesQuery);
  return list(raw, (s: any) => {
    const headline = str(s?.headline);
    const href = str(s?.ctaHref);
    if (!headline || !href) return undefined;
    return {
      id: String(s._id),
      tone: (["primary", "neutral", "dark"] as const).find((t) => t === s.tone) ?? "neutral",
      headline,
      body: str(s.body) ?? "",
      cta: { label: str(s.ctaLabel) ?? "Shop now", href },
      icon: asIconKey(s.icon),
      image: imageUrl(s.image, 1000),
      badgeText: str(s.badgeText),
      productSlug: str(s.productSlug),
    };
  });
}

export async function fetchCategoryTiles(): Promise<CategoryTile[] | null> {
  "use cache";
  cacheTag("sanity", "sanity:category");
  cacheLife("hours");
  if (!isSanityConfigured) return null;

  const raw = await sanityFetch<any[]>(categoryTilesQuery);
  return list(raw, (c: any) => {
    const slug = str(c?.slug);
    const label = str(c?.label);
    return slug && label
      ? { id: slug, label, href: `/c/${slug}`, icon: asIconKey(c.icon), image: imageUrl(c.image, 600) }
      : undefined;
  });
}

export async function fetchPromoBanners(): Promise<PromoBanner[] | null> {
  "use cache";
  cacheTag("sanity", "sanity:promoBanner");
  cacheLife("minutes");
  if (!isSanityConfigured) return null;

  const raw = await sanityFetch<any[]>(promoBannersQuery);
  return list(raw, (b: any) => {
    const title = str(b?.title);
    const href = str(b?.ctaHref);
    return title && href
      ? {
          id: String(b._id), title, body: str(b.body) ?? "", cta: { label: str(b.ctaLabel) ?? "Learn more", href },
          icon: asIconKey(b.icon), tone: b.tone === "primary" ? "primary" : "neutral",
        }
      : undefined;
  });
}

export async function fetchShortcuts(placement: "personal" | "sponsored"): Promise<Shortcut[] | null> {
  "use cache";
  cacheTag("sanity", "sanity:shortcut");
  cacheLife("minutes");
  if (!isSanityConfigured) return null;

  const raw = await sanityFetch<any[]>(shortcutsQuery, { placement });
  return list(raw, (x: any) => {
    const label = str(x?.label);
    const href = str(x?.href);
    return label && href && (href.startsWith("/") || href.startsWith("https://"))
      ? { id: String(x._id), label, note: str(x.note) ?? "", href, icon: asIconKey(x.icon), image: imageUrl(x.image, 200) }
      : undefined;
  });
}

/* ------------------------------ page content ----------------------------- */

export async function fetchInfoPages(): Promise<InfoPage[] | null> {
  "use cache";
  cacheTag("sanity", "sanity:infoPage");
  cacheLife("hours");
  if (!isSanityConfigured) return null;

  const raw = await sanityFetch<any[]>(infoPagesQuery);
  return list(raw, (p: any) => {
    const slug = str(p?.slug);
    const title = str(p?.title);
    if (!slug || !title) return undefined;
    const cta = p.cta;
    return {
      slug, title,
      description: str(p.description) ?? "",
      headline: str(p.headline) ?? title,
      intro: str(p.intro) ?? "",
      sections: sections(p.sections),
      cta: str(cta?.title) && str(cta?.label) && str(cta?.href)
        ? { title: cta.title, text: str(cta.text) ?? "", label: cta.label, href: cta.href }
        : undefined,
    };
  });
}

export async function fetchLegalDocs(): Promise<LegalDoc[] | null> {
  "use cache";
  cacheTag("sanity", "sanity:legalDoc");
  cacheLife("hours");
  if (!isSanityConfigured) return null;

  const raw = await sanityFetch<any[]>(legalDocsQuery);
  return list(raw, (d: any) => {
    const slug = str(d?.slug);
    const title = str(d?.title);
    return slug && title
      ? { slug, title, summary: str(d.summary) ?? "", updated: str(d.updated) ?? "", sections: sections(d.sections) }
      : undefined;
  });
}

export async function fetchBlogPosts(): Promise<BlogPost[] | null> {
  "use cache";
  cacheTag("sanity", "sanity:blogPost");
  cacheLife("hours");
  if (!isSanityConfigured) return null;

  const raw = await sanityFetch<any[]>(blogPostsQuery);
  return list(raw, (p: any) => {
    const slug = str(p?.slug);
    const title = str(p?.title);
    return slug && title
      ? { slug, title, date: str(p.date) ?? "", excerpt: str(p.excerpt) ?? "", body: sections(p.body) }
      : undefined;
  });
}

/* --------------------------- product editorial --------------------------- */

export type ProductContent = {
  description?: string;
  highlights: string[];
  specs: ProductSpec[];
  images: Pick<ProductMedia, "src" | "alt">[];
  faq: { question: string; answer: string }[];
};

export async function fetchProductContent(slug: string): Promise<ProductContent | null> {
  "use cache";
  cacheTag("sanity", "sanity:product", `sanity:product:${slug}`);
  cacheLife("hours");
  if (!isSanityConfigured) return null;

  const raw = await sanityFetch<any>(productContentQuery, { slug });
  if (!raw) return null;
  return {
    description: str(raw.description),
    highlights: list(raw.highlights, str),
    specs: list(raw.specs, (s: any) => (str(s?.label) && str(s?.value) ? { label: s.label, value: s.value } : undefined)),
    images: list(raw.gallery, (g: any) => {
      const src = imageUrl(g, 1200);
      return src ? { src, alt: str(g.alt) ?? "" } : undefined;
    }),
    faq: list(raw.faq, (f: any) => (str(f?.question) && str(f?.answer) ? { question: f.question, answer: f.answer } : undefined)),
  };
}
