import type { IconKey, NavLink, Product } from "@/types";

export type ProductMedia = { src?: string; alt: string; icon?: IconKey };

export type ProductVariant = {
  id: string;
  label: string;
  /** CSS color. When set, the variant renders as a swatch instead of a text pill. */
  swatch?: string;
  sku: string;
  stock: number;
  /** minor units (cents); falls back to the product price */
  price?: number;
  images?: ProductMedia[];
};

export type ProductSpec = { label: string; value: string };

export type ProductReview = {
  id: string;
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  title: string;
  body: string;
  /** ISO date, for example 2026-03-14 */
  date: string;
  verified: boolean;
};

export type ReviewSummary = {
  average: number;
  count: number;
  /** percentage of reviews per star rating */
  breakdown: Record<1 | 2 | 3 | 4 | 5, number>;
};

export type ProductSeller = {
  id: string;
  name: string;
  rating: number;
  fulfilledByAstra: boolean;
};

export type ProductDetail = Product & {
  description: string;
  highlights: string[];
  specs: ProductSpec[];
  images: ProductMedia[];
  /** What the variants represent: "Color", "Size", and so on. */
  optionName: string;
  variants: ProductVariant[];
  category: NavLink[];
  seller: ProductSeller;
  shipping: { freeOverCents: number; estimate: string; returnWindowDays: number };
  faq: { question: string; answer: string }[];
  reviews: { summary: ReviewSummary; items: ProductReview[] };
};