import { defineArrayMember, defineField, defineType } from "sanity";

export const legalDoc = defineType({
  name: "legalDoc",
  title: "Legal document",
  type: "document",
  description: "Slugs in use: terms, privacy, cookies, ads. The URL is /legal/<slug>.",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "summary", type: "text", rows: 2, validation: (r) => r.required() }),
    defineField({ name: "updated", title: "Last updated", type: "date", validation: (r) => r.required() }),
    defineField({ name: "sections", type: "array", of: [defineArrayMember({ type: "contentSection" })] }),
  ],
  preview: { select: { title: "title", subtitle: "updated" } },
});
