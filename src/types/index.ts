// src/types/index.ts

export type NavLink = { label: string; href: string };

export type NavGroup = { title: string; links: NavLink[] };

export type Department = {
  id: string;
  label: string;
  href: string;
  groups: NavGroup[];
};

export type CartItem = {
  productId: string;
  variantId?: string;
  variantLabel?: string;
  vendorId: string;
  slug: string;
  title: string;
  image: string;
  icon?: IconKey;
  price: number;
  quantity: number;
  maxQuantity?: number;
  selected: boolean;
  gift?: boolean;
};

export type IconKey =
  | "headphones"
  | "laptop"
  | "home"
  | "shirt"
  | "gamepad"
  | "sparkles"
  | "monitor"
  | "footprints"
  | "cooking-pot"
  | "plug"
  | "wind"
  | "gift"
  | "truck"
  | "package"
  | "clock"
  | "speaker";

export type PaymentKey = "Visa" | "Mastercard" | "Mobile Money" | "PayPal";

export type PaymentProps = {
  label: PaymentKey;
  imgSrc: string;
  regionalAvailability?: boolean;
};

export type Product = {
  id: string;
  slug: string;
  title: string;
  brand?: string;
  /** minor units (cents) */
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviewCount: number;
  image?: string;
  icon?: IconKey;
  badge?: "Best seller" | "Sponsored" | "New";
  vendorId: string;
};

export type HeroSlide = {
  id: string;
  tone: "primary" | "neutral" | "dark";
  headline: string;
  body: string;
  cta: NavLink;
  icon: IconKey;
  image?: string;
  badgeText?: string;
  product?: Product;
};

export type CategoryTile = {
  id: string;
  label: string;
  href: string;
  icon: IconKey;
  image?: string;
};

export type Shortcut = {
  id: string;
  label: string;
  note: string;
  href: string;
  icon: IconKey;
  image?: string;
};

export type PromoBanner = {
  id: string;
  title: string;
  body: string;
  cta: NavLink;
  icon: IconKey;
  tone: "primary" | "neutral";
};
