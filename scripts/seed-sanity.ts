/**
 * Loads the built-in sample content into Sanity so the CMS starts out matching the live site.
 *
 *   npm run seed:cms           write everything
 *   npm run seed:cms -- --dry  print what would be written
 *
 * Needs NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET and SANITY_API_WRITE_TOKEN
 * (an Editor token from sanity.io/manage). Safe to re-run: documents use fixed ids and are replaced,
 * so any edits made to these exact documents in the Studio will be overwritten.
 * Product prices and stock are not seeded: they are not CMS content.
 */
import { createClient } from "@sanity/client";
import { departments, popularSearches, subNavLinks, utilityLinks } from "../src/lib/constants/navigation";
import { footerColumns, legalLinks } from "../src/lib/constants/footer";
import { blogPosts } from "../src/lib/content/blog";
import { infoPages } from "../src/lib/content/info";
import { legalDocs } from "../src/lib/content/legal";
import {
  getCategories, getHeroSlides, getPersonalOffers, getPromoBanners, getSponsoredShortcuts,
} from "../src/lib/data/home-samples";

type Doc = { _id: string; _type: string; [key: string]: unknown };

const keyed = <T extends object>(items: T[]) => items.map((v, i) => ({ _key: `k${i}`, ...v }));
const links = (ls: { label: string; href: string }[]) => keyed(ls.map((l) => ({ _type: "navLink", ...l })));
const slug = (current: string) => ({ _type: "slug", current });
const sectionsOf = (sections: { heading: string; paragraphs?: string[]; items?: { title: string; text: string }[] }[]) =>
  keyed(
    sections.map((s) => ({
      _type: "contentSection",
      heading: s.heading,
      paragraphs: s.paragraphs ?? [],
      items: keyed((s.items ?? []).map((i) => ({ _type: "card", ...i }))),
    })),
  );

async function build(): Promise<Doc[]> {
  const docs: Doc[] = [];

  docs.push({
    _id: "siteSettings", _type: "siteSettings",
    utilityLinks: links(utilityLinks),
    subNavLinks: links(subNavLinks),
    popularSearches,
    footerColumns: keyed(footerColumns.map((c) => ({ _type: "footerColumn", title: c.title, links: links(c.links) }))),
    legalLinks: links(legalLinks),
  });

  // categories: departments, then their subcategories (with the mega-menu group they sit under)
  const tiles = new Map((await getCategories()).map((t) => [t.href.replace("/c/", ""), t]));
  departments.forEach((d, di) => {
    const dSlug = d.href.replace("/c/", "");
    const tile = tiles.get(dSlug);
    docs.push({
      _id: `category-${dSlug}`, _type: "category", title: d.label, slug: slug(dSlug), order: di * 10,
      icon: tile?.icon,
      ...(tile && tile.label !== d.label ? { tileTitle: tile.label } : {}),
    });
    let order = 0;
    for (const g of d.groups) {
      for (const l of g.links) {
        docs.push({
          _id: `category-${dSlug}-${l.href.split("/").pop()}`, _type: "category", title: l.label,
          slug: slug(l.href.split("/").pop() as string),
          parent: { _type: "reference", _ref: `category-${dSlug}` },
          menuGroup: g.title, order: (order += 10),
        });
      }
    }
  });

  (await getHeroSlides()).forEach((s, i) =>
    docs.push({
      _id: `heroSlide-${s.id}`, _type: "heroSlide", headline: s.headline, body: s.body,
      ctaLabel: s.cta.label, ctaHref: s.cta.href, tone: s.tone, icon: s.icon,
      badgeText: s.badgeText, productSlug: s.product?.slug, order: i * 10, active: true,
    }),
  );

  (await getPromoBanners()).forEach((b, i) =>
    docs.push({
      _id: `promoBanner-${b.id}`, _type: "promoBanner", title: b.title, body: b.body,
      ctaLabel: b.cta.label, ctaHref: b.cta.href, tone: b.tone, icon: b.icon, order: i * 10, active: true,
    }),
  );

  for (const [placement, items] of [["personal", await getPersonalOffers()], ["sponsored", await getSponsoredShortcuts()]] as const) {
    items.forEach((s, i) =>
      docs.push({
        _id: `shortcut-${placement}-${s.id}`, _type: "shortcut", placement, label: s.label, note: s.note,
        href: s.href, icon: s.icon, order: i * 10, active: true,
        ...(placement === "sponsored" ? { advertiser: "Sample advertiser" } : {}),
      }),
    );
  }

  for (const p of infoPages) {
    docs.push({
      _id: `infoPage-${p.slug}`, _type: "infoPage", title: p.title, slug: slug(p.slug), description: p.description,
      headline: p.headline, intro: p.intro, sections: sectionsOf(p.sections),
      ...(p.cta ? { cta: { _type: "ctaBlock", ...p.cta } } : {}),
    });
  }
  for (const d of legalDocs) {
    docs.push({
      _id: `legalDoc-${d.slug}`, _type: "legalDoc", title: d.title, slug: slug(d.slug), summary: d.summary,
      updated: d.updated, sections: sectionsOf(d.sections),
    });
  }
  for (const p of blogPosts) {
    docs.push({
      _id: `blogPost-${p.slug}`, _type: "blogPost", title: p.title, slug: slug(p.slug), publishedAt: p.date,
      excerpt: p.excerpt, sections: sectionsOf(p.body),
    });
  }
  return docs;
}

async function main() {
  const docs = await build();
  const counts = docs.reduce<Record<string, number>>((m, d) => ((m[d._type] = (m[d._type] ?? 0) + 1), m), {});

  if (process.argv.includes("--dry")) {
    console.log("Dry run. Would write:", counts);
    return;
  }

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (!projectId || !token) {
    console.error("Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN in .env.local first.");
    process.exit(1);
  }

  const client = createClient({
    projectId, dataset, token, apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2025-10-01", useCdn: false,
  });

  const tx = client.transaction();
  for (const d of docs) tx.createOrReplace(d);
  await tx.commit();
  console.log(`Seeded ${docs.length} documents into ${projectId}/${dataset}:`, counts);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
