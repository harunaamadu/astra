import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * EDITORIAL content for a product. Price, stock and variants are NOT here: they come from
 * Prisma (step 6) so checkout never trusts the CMS. Anything filled in here overrides the
 * default description, highlights, specs, images and FAQ on the product page.
 */
export const product = defineType({
  name: "product",
  title: "Product content",
  type: "document",
  fields: [
    defineField({
      name: "catalogSlug",
      title: "Product slug",
      description: "Exactly the slug in the product URL (/p/<slug>).",
      type: "string",
      validation: (r) => r.required().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, { name: "slug", invert: false }),
    }),
    defineField({ name: "description", type: "text", rows: 5 }),
    defineField({ name: "highlights", type: "array", of: [defineArrayMember({ type: "string" })] }),
    defineField({
      name: "specs",
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
      name: "gallery",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [defineField({ name: "alt", type: "string", description: "Describe the image for screen readers.", validation: (r) => r.required() })],
        }),
      ],
    }),
    defineField({
      name: "faq",
      title: "FAQ",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "faqItem",
          fields: [
            defineField({ name: "question", type: "string", validation: (r) => r.required() }),
            defineField({ name: "answer", type: "text", rows: 3, validation: (r) => r.required() }),
          ],
          preview: { select: { title: "question" } },
        }),
      ],
    }),
  ],
  preview: { select: { title: "catalogSlug", media: "gallery.0" } },
});
