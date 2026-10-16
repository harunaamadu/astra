import { defineField, defineType } from "sanity";
import { hrefValidation, iconOptions } from "../shared";

/** Small linked tiles: the homepage quick-links strip ("personal") and the paid "Sponsored" strip. */
export const shortcut = defineType({
  name: "shortcut",
  title: "Shortcut tile",
  type: "document",
  fields: [
    defineField({
      name: "placement",
      type: "string",
      options: { list: [{ title: "Quick links (homepage strip)", value: "personal" }, { title: "Sponsored strip", value: "sponsored" }], layout: "radio" },
      initialValue: "personal",
      validation: (r) => r.required(),
    }),
    defineField({ name: "label", type: "string", validation: (r) => r.required().max(40) }),
    defineField({ name: "note", type: "string", description: "For example \"Big sale 30%\".", validation: (r) => r.max(40) }),
    defineField({ name: "href", type: "string", validation: hrefValidation }),
    defineField({ name: "icon", type: "string", options: { list: iconOptions }, initialValue: "sparkles" }),
    defineField({ name: "image", type: "image" }),
    defineField({ name: "advertiser", type: "string", description: "Who paid for this placement (internal).", hidden: ({ document }) => document?.placement !== "sponsored" }),
    defineField({ name: "order", type: "number", initialValue: 100 }),
    defineField({ name: "active", type: "boolean", initialValue: true }),
    defineField({ name: "startsAt", type: "datetime" }),
    defineField({ name: "endsAt", type: "datetime" }),
  ],
  preview: { select: { title: "label", subtitle: "placement" } },
});
