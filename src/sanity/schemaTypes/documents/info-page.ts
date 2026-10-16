import { defineArrayMember, defineField, defineType } from "sanity";

export const infoPage = defineType({
  name: "infoPage",
  title: "Info page",
  type: "document",
  description: "About, careers, press, sustainability, advertise, affiliates, registry. The slug becomes the URL (/about).",
  fields: [
    defineField({ name: "title", type: "string", description: "Used for the browser tab and search results.", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "description", type: "text", rows: 2, description: "Search result snippet (about 150 characters).", validation: (r) => r.required().max(200) }),
    defineField({ name: "headline", type: "string", validation: (r) => r.required() }),
    defineField({ name: "intro", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({ name: "sections", type: "array", of: [defineArrayMember({ type: "contentSection" })] }),
    defineField({ name: "cta", title: "Call to action", type: "ctaBlock" }),
  ],
  preview: { select: { title: "title", subtitle: "slug.current" } },
});
