import { defineField, defineType } from "sanity";
import { iconOptions } from "../shared";

/**
 * Two levels: departments (no parent) and subcategories (parent = a department).
 * URLs are /c/<department-slug> and /c/<department-slug>/<subcategory-slug>.
 * Slugs must be unique across all categories.
 */
export const category = defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required().max(60) }),
    defineField({ name: "slug", type: "slug", options: { source: "title", maxLength: 60 }, validation: (r) => r.required() }),
    defineField({
      name: "parent",
      title: "Department",
      description: "Leave empty for a top-level department.",
      type: "reference",
      to: [{ type: "category" }],
      options: { filter: "!defined(parent)" },
    }),
    defineField({
      name: "menuGroup",
      title: "Menu group",
      description: "Heading this subcategory appears under in the mega menu, such as \"Audio\".",
      type: "string",
      hidden: ({ document }) => !document?.parent,
    }),
    defineField({ name: "tileTitle", title: "Homepage tile title", description: "Optional shorter title for the homepage category grid.", type: "string", hidden: ({ document }) => !!document?.parent }),
    defineField({ name: "icon", type: "string", options: { list: iconOptions }, hidden: ({ document }) => !!document?.parent }),
    defineField({ name: "image", type: "image", options: { hotspot: true }, hidden: ({ document }) => !!document?.parent }),
    defineField({ name: "order", type: "number", initialValue: 100, description: "Lower numbers come first." }),
  ],
  orderings: [{ title: "Menu order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "parent.title" } },
});
