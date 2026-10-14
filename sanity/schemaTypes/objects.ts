import { defineArrayMember, defineField, defineType } from "sanity";
import { ICON_KEYS } from "../../src/types";

export const iconField = (name = "icon") =>
  defineField({
    name,
    title: "Icon",
    type: "string",
    options: { list: ICON_KEYS.map((k) => ({ title: k, value: k })), layout: "dropdown" },
    validation: (r) => r.required(),
  });

const imageField = defineField({
  name: "image",
  title: "Image",
  type: "image",
  options: { hotspot: true },
  description: "Optional. When empty the storefront shows the icon instead.",
});

const toneField = (values: string[]) =>
  defineField({
    name: "tone",
    title: "Tone",
    type: "string",
    options: { list: values, layout: "radio" },
    initialValue: values[0],
    validation: (r) => r.required(),
  });

/** A path inside the store (/c/electronics) or a full https URL. */
export const link = defineType({
  name: "link",
  title: "Link",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "href",
      type: "string",
      description: "A path such as /c/electronics, or a full https:// URL.",
      validation: (r) =>
        r.required().custom((v) => !v || /^(\/|https?:\/\/)/.test(v) || "Start with / or https://"),
    }),
  ],
  preview: { select: { title: "label", subtitle: "href" } },
});

/** Heading plus paragraphs and/or titled items. Mirrors the Section type the pages already render. */
export const contentSection = defineType({
  name: "contentSection",
  title: "Section",
  type: "object",
  fields: [
    defineField({ name: "heading", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "paragraphs",
      type: "array",
      of: [defineArrayMember({ type: "text", rows: 4 })],
    }),
    defineField({
      name: "items",
      description: "Optional titled entries shown as a list or grid.",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "sectionItem",
          fields: [
            defineField({ name: "title", type: "string", validation: (r) => r.required() }),
            defineField({ name: "text", type: "text", rows: 3, validation: (r) => r.required() }),
          ],
          preview: { select: { title: "title", subtitle: "text" } },
        }),
      ],
    }),
  ],
  preview: { select: { title: "heading", subtitle: "paragraphs.0" } },
});

export const heroSlide = defineType({
  name: "heroSlide",
  title: "Hero slide",
  type: "object",
  fields: [
    defineField({ name: "headline", type: "string", validation: (r) => r.required() }),
    defineField({ name: "body", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({ name: "cta", title: "Button", type: "link", validation: (r) => r.required() }),
    toneField(["primary", "neutral", "dark"]),
    iconField(),
    imageField,
    defineField({ name: "badgeText", title: "Badge text", type: "string", description: "For example: 50% off" }),
    defineField({
      name: "productSlug",
      title: "Featured product slug",
      type: "string",
      description:
        "Optional. Must match a product slug in the catalog. Price and stock always come from the catalog, never from here.",
    }),
  ],
  preview: { select: { title: "headline", subtitle: "badgeText", media: "image" } },
});

export const categoryTile = defineType({
  name: "categoryTile",
  title: "Category tile",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "href",
      type: "string",
      validation: (r) => r.required().custom((v) => !v || v.startsWith("/") || "Start with /"),
    }),
    iconField(),
    imageField,
  ],
  preview: { select: { title: "label", subtitle: "href", media: "image" } },
});

export const shortcut = defineType({
  name: "shortcut",
  title: "Shortcut",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
    defineField({ name: "note", type: "string", description: "Short line under the label, for example: Big sale 30%" }),
    defineField({
      name: "href",
      type: "string",
      validation: (r) => r.required().custom((v) => !v || v.startsWith("/") || "Start with /"),
    }),
    iconField(),
    imageField,
  ],
  preview: { select: { title: "label", subtitle: "note", media: "image" } },
});

export const promoBanner = defineType({
  name: "promoBanner",
  title: "Promo banner",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "body", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({ name: "cta", title: "Button", type: "link", validation: (r) => r.required() }),
    iconField(),
    toneField(["neutral", "primary"]),
  ],
  preview: { select: { title: "title", subtitle: "body" } },
});
