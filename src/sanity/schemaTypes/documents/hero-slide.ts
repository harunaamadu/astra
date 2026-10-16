import { defineField, defineType } from "sanity";
import { heroToneOptions, hrefValidation, iconOptions } from "../shared";

export const heroSlide = defineType({
  name: "heroSlide",
  title: "Hero slide",
  type: "document",
  fields: [
    defineField({ name: "headline", type: "string", validation: (r) => r.required().max(60) }),
    defineField({ name: "body", type: "text", rows: 3, validation: (r) => r.required().max(180) }),
    defineField({ name: "ctaLabel", title: "Button label", type: "string", validation: (r) => r.required().max(30) }),
    defineField({ name: "ctaHref", title: "Button link", type: "string", validation: hrefValidation }),
    defineField({ name: "tone", type: "string", options: { list: heroToneOptions, layout: "radio" }, initialValue: "neutral", validation: (r) => r.required() }),
    defineField({ name: "icon", type: "string", options: { list: iconOptions }, initialValue: "sparkles", description: "Shown when there is no image." }),
    defineField({ name: "image", type: "image", options: { hotspot: true } }),
    defineField({ name: "badgeText", type: "string", description: "Round badge, for example \"50% off\".", validation: (r) => r.max(20) }),
    defineField({
      name: "productSlug",
      title: "Featured product slug",
      description: "Optional. Shows that product's live price and rating on the slide. Use the slug from its product page URL (/p/<slug>).",
      type: "string",
    }),
    defineField({ name: "order", type: "number", initialValue: 100 }),
    defineField({ name: "active", type: "boolean", initialValue: true }),
    defineField({ name: "startsAt", title: "Show from", type: "datetime" }),
    defineField({
      name: "endsAt",
      title: "Show until",
      type: "datetime",
      validation: (r) =>
        r.custom((end, ctx) => {
          const start = (ctx.document as { startsAt?: string } | undefined)?.startsAt;
          return end && start && end <= start ? "End must be after the start" : true;
        }),
    }),
  ],
  orderings: [{ title: "Order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "headline", subtitle: "tone", media: "image" } },
});
