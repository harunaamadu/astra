import type { SchemaTypeDefinition } from "sanity";
import { categoryTile, contentSection, heroSlide, link, promoBanner, shortcut } from "./objects";
import {
  blogPost,
  department,
  helpArticle,
  helpCenter,
  homePage,
  infoPage,
  legalDoc,
  productContent,
} from "./documents";

export const schemaTypes: SchemaTypeDefinition[] = [
  // objects
  link,
  contentSection,
  heroSlide,
  categoryTile,
  shortcut,
  promoBanner,
  // documents
  department,
  homePage,
  blogPost,
  infoPage,
  helpArticle,
  helpCenter,
  legalDoc,
  productContent,
];

/** Documents with exactly one instance. Hidden from "create new" and opened directly from the sidebar. */
export const singletonTypes = ["homePage", "helpCenter"] as const;
