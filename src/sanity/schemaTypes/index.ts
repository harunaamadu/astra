import type { SchemaTypeDefinition } from "sanity";
import { contentSection, ctaBlock, navLink } from "./objects";
import { blogPost } from "./documents/blog-post";
import { category } from "./documents/category";
import { heroSlide } from "./documents/hero-slide";
import { infoPage } from "./documents/info-page";
import { legalDoc } from "./documents/legal-doc";
import { product } from "./documents/product";
import { promoBanner } from "./documents/promo-banner";
import { shortcut } from "./documents/shortcut";
import { siteSettings } from "./documents/site-settings";

export const schemaTypes: SchemaTypeDefinition[] = [
  // objects
  navLink, contentSection, ctaBlock,
  // documents
  siteSettings, category, heroSlide, promoBanner, shortcut, infoPage, legalDoc, blogPost, product,
];
