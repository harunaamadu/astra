import { defineArrayMember, defineField, defineType } from "sanity";

const slugField = (source = "title") =>
  defineField({
    name: "slug",
    type: "slug",
    options: { source, maxLength: 96 },
    validation: (r) => r.required(),
  });

const sectionsField = defineField({
  name: "sections",
  type: "array",
  of: [defineArrayMember({ type: "contentSection" })],
  validation: (r) => r.required().min(1),
});

/** Navigation tree. One document per department; its groups feed the mega menu, mobile menu and /c pages. */
export const department = defineType({
  name: "department",
  title: "Department",
  type: "document",
  fields: [
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
    slugField("label"),
    defineField({
      name: "deptId",
      title: "Search key",
      type: "string",
      description:
        "Stable id used by the search category filter (?category=...). Do not change it once published.",
      validation: (r) => r.required(),
    }),
    defineField({ name: "order", type: "number", description: "Lowest first.", validation: (r) => r.required() }),
    defineField({
      name: "groups",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "navGroup",
          fields: [
            defineField({ name: "title", type: "string", validation: (r) => r.required() }),
            defineField({
              name: "links",
              description: "Subcategory links. Use paths under /c/, for example /c/electronics/headphones.",
              type: "array",
              of: [defineArrayMember({ type: "link" })],
              validation: (r) => r.required().min(1),
            }),
          ],
          preview: { select: { title: "title" } },
        }),
      ],
      validation: (r) => r.required().min(1),
    }),
  ],
  orderings: [{ title: "Order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "label", subtitle: "slug.current" } },
});

/** Singleton: everything editors change on the homepage. */
export const homePage = defineType({
  name: "homePage",
  title: "Home page",
  type: "document",
  fields: [
    defineField({ name: "heroSlides", type: "array", of: [defineArrayMember({ type: "heroSlide" })] }),
    defineField({ name: "categoryTiles", title: "Shop by category", type: "array", of: [defineArrayMember({ type: "categoryTile" })] }),
    defineField({ name: "personalOffers", title: "Personal offers strip", type: "array", of: [defineArrayMember({ type: "shortcut" })] }),
    defineField({ name: "promoBanners", type: "array", of: [defineArrayMember({ type: "promoBanner" })] }),
    defineField({ name: "sponsoredShortcuts", title: "Sponsored strip", type: "array", of: [defineArrayMember({ type: "shortcut" })] }),
  ],
  preview: { prepare: () => ({ title: "Home page" }) },
});

export const blogPost = defineType({
  name: "blogPost",
  title: "Blog post",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    slugField(),
    defineField({ name: "date", type: "date", validation: (r) => r.required() }),
    defineField({ name: "excerpt", type: "text", rows: 2, validation: (r) => r.required() }),
    defineField({ name: "body", type: "array", of: [defineArrayMember({ type: "contentSection" })], validation: (r) => r.required().min(1) }),
  ],
  orderings: [{ title: "Newest first", name: "dateDesc", by: [{ field: "date", direction: "desc" }] }],
  preview: { select: { title: "title", subtitle: "date" } },
});

export const infoPage = defineType({
  name: "infoPage",
  title: "Info page",
  description: "About, careers, press, sustainability, advertise, affiliates and similar company pages.",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    slugField(),
    defineField({ name: "description", title: "SEO description", type: "text", rows: 2, validation: (r) => r.required() }),
    defineField({ name: "headline", type: "string", validation: (r) => r.required() }),
    defineField({ name: "intro", type: "text", rows: 3, validation: (r) => r.required() }),
    sectionsField,
    defineField({
      name: "cta",
      title: "Call to action",
      type: "object",
      fields: [
        defineField({ name: "title", type: "string", validation: (r) => r.required() }),
        defineField({ name: "text", type: "text", rows: 2, validation: (r) => r.required() }),
        defineField({ name: "label", type: "string", validation: (r) => r.required() }),
        defineField({ name: "href", type: "string", validation: (r) => r.required() }),
      ],
    }),
  ],
  preview: { select: { title: "title", subtitle: "slug.current" } },
});

const tokenHelp =
  "Live numbers: write {{returnWindowDays}}, {{plusReturnWindowDays}}, {{freeShippingThreshold}}, {{standardShippingPrice}}, {{standardShippingLabel}}, {{standardShippingDescription}}, {{expressShippingPrice}}, {{expressShippingLabel}} or {{expressShippingDescription}}. The storefront fills them from the same constants the cart and checkout use, so the text can never disagree with what customers are charged.";

export const helpArticle = defineType({
  name: "helpArticle",
  title: "Help article",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    slugField(),
    defineField({ name: "order", type: "number", description: "Lowest first." }),
    defineField({ name: "summary", type: "string", validation: (r) => r.required() }),
    { ...sectionsField, description: tokenHelp },
  ],
  orderings: [{ title: "Order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "summary" } },
});

/** Singleton: the FAQ shown on the help center landing page. */
export const helpCenter = defineType({
  name: "helpCenter",
  title: "Help center",
  type: "document",
  fields: [
    defineField({
      name: "faq",
      description: tokenHelp,
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "faqEntry",
          fields: [
            defineField({ name: "question", type: "string", validation: (r) => r.required() }),
            defineField({ name: "answer", type: "text", rows: 3, validation: (r) => r.required() }),
          ],
          preview: { select: { title: "question", subtitle: "answer" } },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Help center FAQ" }) },
});

export const legalDoc = defineType({
  name: "legalDoc",
  title: "Legal document",
  description: "Have a qualified lawyer review every document before launch.",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    slugField(),
    defineField({ name: "order", type: "number", description: "Lowest first." }),
    defineField({ name: "summary", type: "string", validation: (r) => r.required() }),
    defineField({ name: "updated", title: "Last updated", type: "date", validation: (r) => r.required() }),
    { ...sectionsField, description: tokenHelp },
  ],
  orderings: [{ title: "Order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "updated" } },
});

/**
 * Marketing copy for one catalog product, matched by slug. Price, stock, variants and reviews are
 * deliberately absent: they live in code now and in Prisma next, so checkout never trusts the CMS.
 */
export const productContent = defineType({
  name: "productContent",
  title: "Product content",
  type: "document",
  fields: [
    defineField({
      name: "productSlug",
      title: "Product slug",
      type: "string",
      description: "Must match the product's slug in the catalog, for example jbl-tune-750btnc.",
      validation: (r) => r.required(),
    }),
    defineField({ name: "description", type: "text", rows: 5 }),
    defineField({ name: "highlights", type: "array", of: [defineArrayMember({ type: "string" })] }),
    defineField({
      name: "specs",
      description: "Editorial specs. Sold by and variant options are added automatically from the catalog.",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "spec",
          fields: [
            defineField({ name: "label", type: "string", validation: (r) => r.required() }),
            defineField({ name: "value", type: "string", validation: (r) => r.required() }),
          ],
          preview: { select: { title: "label", subtitle: "value" } },
        }),
      ],
    }),
    defineField({
      name: "faq",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "faqEntry",
          fields: [
            defineField({ name: "question", type: "string", validation: (r) => r.required() }),
            defineField({ name: "answer", type: "text", rows: 3, validation: (r) => r.required() }),
          ],
          preview: { select: { title: "question", subtitle: "answer" } },
        }),
      ],
    }),
    defineField({
      name: "images",
      title: "Gallery",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [defineField({ name: "alt", type: "string", validation: (r) => r.required() })],
        }),
      ],
    }),
  ],
  preview: { select: { title: "productSlug", subtitle: "description" } },
});
