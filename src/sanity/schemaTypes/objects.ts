import { defineArrayMember, defineField, defineType } from "sanity";
import { hrefValidation } from "./shared";

export const navLink = defineType({
  name: "navLink",
  title: "Link",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", validation: (r) => r.required().max(40) }),
    defineField({ name: "href", type: "string", description: "Internal path like /deals, or a full https:// URL.", validation: hrefValidation }),
  ],
  preview: { select: { title: "label", subtitle: "href" } },
});

export const contentSection = defineType({
  name: "contentSection",
  title: "Section",
  type: "object",
  fields: [
    defineField({ name: "heading", type: "string", validation: (r) => r.required().max(120) }),
    defineField({ name: "paragraphs", type: "array", of: [defineArrayMember({ type: "text", rows: 3 })] }),
    defineField({
      name: "items",
      title: "Cards",
      description: "Optional grid of short title + text cards.",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "card",
          fields: [
            defineField({ name: "title", type: "string", validation: (r) => r.required() }),
            defineField({ name: "text", type: "text", rows: 2, validation: (r) => r.required() }),
          ],
          preview: { select: { title: "title", subtitle: "text" } },
        }),
      ],
    }),
  ],
  preview: { select: { title: "heading" } },
});

export const ctaBlock = defineType({
  name: "ctaBlock",
  title: "Call to action",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string" }),
    defineField({ name: "text", type: "text", rows: 2 }),
    defineField({ name: "label", type: "string" }),
    defineField({ name: "href", type: "string", validation: (r) => r.custom((v) => (v == null || (typeof v === "string" && (v.startsWith("/") || v.startsWith("https://")))) ? true : "Use a path starting with / or an https:// URL") }),
  ],
});
