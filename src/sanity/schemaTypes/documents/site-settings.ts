import { defineArrayMember, defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({ name: "utilityLinks", title: "Top bar links", type: "array", of: [defineArrayMember({ type: "navLink" })] }),
    defineField({ name: "subNavLinks", title: "Header sub-navigation", type: "array", of: [defineArrayMember({ type: "navLink" })] }),
    defineField({ name: "popularSearches", title: "Popular searches", type: "array", of: [defineArrayMember({ type: "string" })] }),
    defineField({
      name: "footerColumns",
      title: "Footer columns",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "footerColumn",
          fields: [
            defineField({ name: "title", type: "string", validation: (r) => r.required() }),
            defineField({ name: "links", type: "array", of: [defineArrayMember({ type: "navLink" })] }),
          ],
          preview: { select: { title: "title" } },
        }),
      ],
    }),
    defineField({ name: "legalLinks", title: "Footer legal links", type: "array", of: [defineArrayMember({ type: "navLink" })] }),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
});
