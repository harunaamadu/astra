import { defineField, defineType } from "sanity";
import { bannerToneOptions, hrefValidation, iconOptions } from "../shared";

export const promoBanner = defineType({
  name: "promoBanner",
  title: "Promo banner",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required().max(50) }),
    defineField({ name: "body", type: "text", rows: 2, validation: (r) => r.required().max(140) }),
    defineField({ name: "ctaLabel", title: "Button label", type: "string", validation: (r) => r.required().max(30) }),
    defineField({ name: "ctaHref", title: "Button link", type: "string", validation: hrefValidation }),
    defineField({ name: "tone", type: "string", options: { list: bannerToneOptions, layout: "radio" }, initialValue: "neutral" }),
    defineField({ name: "icon", type: "string", options: { list: iconOptions }, initialValue: "sparkles" }),
    defineField({ name: "order", type: "number", initialValue: 100 }),
    defineField({ name: "active", type: "boolean", initialValue: true }),
  ],
  preview: { select: { title: "title", subtitle: "body" } },
});
