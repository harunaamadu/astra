/** The documents `npm run sanity:seed` writes, built from the static sample content. */
import { departments } from "../src/lib/constants/navigation";
import { blogPosts } from "../src/lib/content/blog";
import { helpArticles, helpFaq } from "../src/lib/content/help";
import { infoPages } from "../src/lib/content/info";
import { legalDocs } from "../src/lib/content/legal";
import * as home from "../src/lib/data/home";

/** Sanity array members need a stable _key. Adds one to every object inside an array. */
function keyed<T>(value: T, prefix = "k"): T {
  if (Array.isArray(value)) {
    return value.map((item, i) =>
      item && typeof item === "object" && !Array.isArray(item)
        ? keyed({ _key: (item as { _key?: string })._key ?? `${prefix}-${i}`, ...item }, `${prefix}-${i}`)
        : item,
    ) as T;
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, keyed(v, `${prefix}-${k}`)])) as T;
  }
  return value;
}

/** Existing ids become the _key so slide, tile and banner order stays addressable. */
const withIdKeys = <T extends { id: string }>(items: T[]) =>
  items.map(({ id, ...rest }) => keyed({ _key: id, ...rest }));

export async function buildDocuments() {
  const [slides, tiles, offers, banners, sponsored] = await Promise.all([
    home.getHeroSlides(),
    home.getCategories(),
    home.getPersonalOffers(),
    home.getPromoBanners(),
    home.getSponsoredShortcuts(),
  ]);

  const docs: Record<string, unknown>[] = [];

  departments.forEach((d, i) => {
    const slug = d.href.replace(/^\/c\//, "");
    docs.push(
      keyed({
        _id: `department-${slug}`,
        _type: "department",
        label: d.label,
        slug: { _type: "slug", current: slug },
        deptId: d.id,
        order: i + 1,
        groups: d.groups,
      }),
    );
  });

  docs.push(
    keyed({
      _id: "homePage",
      _type: "homePage",
      heroSlides: withIdKeys(
        slides.map(({ product, ...s }) => ({ ...s, ...(product ? { productSlug: product.slug } : {}) })),
      ),
      categoryTiles: withIdKeys(tiles),
      personalOffers: withIdKeys(offers),
      promoBanners: withIdKeys(banners),
      sponsoredShortcuts: withIdKeys(sponsored),
    }),
  );

  for (const p of blogPosts) {
    docs.push(
      keyed({
        _id: `blogPost-${p.slug}`,
        _type: "blogPost",
        title: p.title,
        slug: { _type: "slug", current: p.slug },
        date: p.date,
        excerpt: p.excerpt,
        body: p.body,
      }),
    );
  }

  for (const p of infoPages) {
    const { slug, ...rest } = p;
    docs.push(keyed({ _id: `infoPage-${slug}`, _type: "infoPage", slug: { _type: "slug", current: slug }, ...rest }));
  }

  helpArticles.forEach((a, i) => {
    const { slug, ...rest } = a;
    docs.push(
      keyed({ _id: `helpArticle-${slug}`, _type: "helpArticle", slug: { _type: "slug", current: slug }, order: i + 1, ...rest }),
    );
  });
  docs.push(keyed({ _id: "helpCenter", _type: "helpCenter", faq: helpFaq }));

  legalDocs.forEach((d, i) => {
    const { slug, ...rest } = d;
    docs.push(
      keyed({ _id: `legalDoc-${slug}`, _type: "legalDoc", slug: { _type: "slug", current: slug }, order: i + 1, ...rest }),
    );
  });

  // The only catalog product with hand-written copy. Everything else shows generated placeholder text
  // until an editor creates a "Product content" document for it.
  docs.push(
    keyed({
      _id: "productContent-jbl-tune-750btnc",
      _type: "productContent",
      productSlug: "jbl-tune-750btnc",
      description:
        "Wireless over-ear headphones with active noise cancellation, a foldable design and a built-in microphone for calls. Pure Bass sound and long battery life make them a dependable pair for work, travel and everything between.",
      highlights: [
        "Active noise cancellation",
        "Up to 15 hours of battery life with Bluetooth and noise cancelling on",
        "Lightweight, foldable design",
        "Voice assistant and hands-free calling",
      ],
      specs: [
        { label: "Brand", value: "JBL" },
        { label: "Connectivity", value: "Bluetooth, wireless" },
        { label: "Form factor", value: "Over-ear" },
        { label: "Noise control", value: "Active noise cancellation" },
        { label: "Model", value: "Tune 750BTNC" },
      ],
    }),
  );

  return docs;
}

