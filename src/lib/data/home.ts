import type {
  CategoryTile,
  HeroSlide,
  Product,
  PromoBanner,
  Shortcut,
} from "@/types";

/**
 * SAMPLE DATA. Every function is async so call sites don't change when these
 * move to Sanity (editorial) and Prisma (price, stock) in steps 5-6.
 * Prices are cents. Drop real images into public/images and set `image`.
 */

const p = (x: Omit<Product, "vendorId"> & { vendorId?: string }): Product => ({
  vendorId: "astra",
  ...x,
});

const jbl = p({
  id: "p-jbl750",
  slug: "jbl-tune-750btnc",
  title:
    "JBL Tune 750BTNC Wireless Over-Ear Headphones with Noise Cancellation",
  brand: "JBL",
  price: 12500,
  compareAtPrice: 25000,
  rating: 4.5,
  reviewCount: 1245,
  icon: "headphones",
  badge: "Best seller",
});
const cooker = p({
  id: "p-instantpot",
  slug: "instant-pot-duo-7-in-1",
  title: "Instant Pot Duo 7-in-1 Electric Pressure Cooker",
  brand: "Instant Pot",
  price: 7900,
  compareAtPrice: 9995,
  rating: 4.7,
  reviewCount: 408,
  icon: "cooking-pot",
});

const picks: Product[] = [
  p({
    id: "p-puma",
    slug: "puma-axis-tr-boot-wtr",
    title: "Puma AXIS TR BOOT WTR Black Man",
    brand: "Puma",
    price: 15099,
    rating: 4.5,
    reviewCount: 342,
    icon: "footprints",
  }),
  p({
    id: "p-nike-aml",
    slug: "nike-air-max-light",
    title: "Nike Air Max Light Red Series",
    brand: "Nike",
    price: 8600,
    rating: 4.4,
    reviewCount: 230,
    icon: "footprints",
  }),
  p({
    id: "p-adidas-fs",
    slug: "adidas-fusion-storm-winter",
    title: "Adidas Fusion Storm Winter",
    brand: "Adidas",
    price: 7997,
    rating: 4.5,
    reviewCount: 192,
    icon: "footprints",
  }),
  p({
    id: "p-nike-cf",
    slug: "nike-cloudfoam-pure",
    title: "Nike Cloudfoam Pure Running Shoe",
    brand: "Nike",
    price: 6899,
    rating: 4.6,
    reviewCount: 4971,
    icon: "footprints",
    badge: "Best seller",
  }),
  p({
    id: "p-adidas-ab",
    slug: "adidas-alpha-bounce",
    title: "Adidas Alpha Bounce Running Shoe",
    brand: "Adidas",
    price: 5994,
    compareAtPrice: 7093,
    rating: 4.3,
    reviewCount: 488,
    icon: "footprints",
  }),
];

const bestSellers: Product[] = [
  p({
    id: "p-cable",
    slug: "astra-essentials-lightning-usb",
    title: "Astra Essentials Lightning to USB Cable",
    brand: "Astra Essentials",
    price: 599,
    rating: 4.7,
    reviewCount: 13547,
    icon: "plug",
    badge: "Best seller",
  }),
  p({
    id: "p-tv",
    slug: "skyworth-d-series-24-smart-tv",
    title: 'Skyworth D-Series 24" 1080P Smart TV',
    brand: "Skyworth",
    price: 12997,
    rating: 4.4,
    reviewCount: 192,
    icon: "monitor",
    badge: "Best seller",
  }),
  { ...cooker, badge: "Best seller" },
  p({
    id: "p-dryer",
    slug: "philips-1875w-hair-dryer",
    title: "Philips 1875W Dry Care Essential Ionic Hair Dryer",
    brand: "Philips",
    price: 2499,
    rating: 4.6,
    reviewCount: 608,
    icon: "wind",
    badge: "Best seller",
  }),
  p({
    id: "p-pan",
    slug: "greenpan-stackable-frying-pan",
    title: 'GreenPan Stackable Hard Anodized Frying Pan, 12"',
    brand: "GreenPan",
    price: 5994,
    compareAtPrice: 7189,
    rating: 4.5,
    reviewCount: 480,
    icon: "cooking-pot",
    badge: "Best seller",
  }),
];

export async function getHeroSlides(): Promise<HeroSlide[]> {
  return [
    {
      id: "desk",
      tone: "primary",
      headline: "Upgrade your desk setup",
      body: "Laptops, monitors, storage and the accessories that make long days easier.",
      cta: { label: "Shop computers", href: "/c/computers" },
      icon: "headphones",
      badgeText: "50% off",
      product: jbl,
    },
    {
      id: "kitchen",
      tone: "neutral",
      headline: "Home and kitchen essentials",
      body: "Cookware, small appliances and decor from trusted sellers, with limited-time prices.",
      cta: { label: "Shop home and kitchen", href: "/c/home-kitchen" },
      icon: "cooking-pot",
      badgeText: "Up to 30% off",
      product: cooker,
    },
    {
      id: "plus",
      tone: "dark",
      headline: "Free delivery with Astra Plus",
      body: "Join for free shipping on eligible orders, early access to deals and extended returns.",
      cta: { label: "Explore Astra Plus", href: "/plus" },
      icon: "truck",
    },
  ];
}

export async function getCategories(): Promise<CategoryTile[]> {
  return [
    {
      id: "electronics",
      label: "Electronics",
      href: "/c/electronics",
      icon: "headphones",
    },
    {
      id: "computers",
      label: "Computers",
      href: "/c/computers",
      icon: "laptop",
    },
    {
      id: "home",
      label: "Home and kitchen",
      href: "/c/home-kitchen",
      icon: "home",
    },
    { id: "fashion", label: "Fashion", href: "/c/fashion", icon: "shirt" },
    {
      id: "beauty",
      label: "Beauty and care",
      href: "/c/beauty",
      icon: "sparkles",
    },
    {
      id: "toys",
      label: "Toys and games",
      href: "/c/toys-games",
      icon: "gamepad",
    },
  ];
}

export async function getCatalogProducts(): Promise<Product[]> {
  return [jbl, ...picks, ...bestSellers];
}

export async function getPersonalOffers(): Promise<Shortcut[]> {
  return [
    {
      id: "orders",
      label: "Your orders",
      note: "Track and manage",
      href: "/account/orders",
      icon: "package",
    },
    {
      id: "electronics",
      label: "Electronics",
      note: "Big sale 30%",
      href: "/c/electronics",
      icon: "headphones",
    },
    {
      id: "kitchen",
      label: "Home and kitchen",
      note: "Big sale 30%",
      href: "/c/home-kitchen",
      icon: "cooking-pot",
    },
    {
      id: "fashion",
      label: "Fashion",
      note: "New arrivals",
      href: "/c/fashion",
      icon: "shirt",
    },
  ];
}

export async function getPromoBanners(): Promise<PromoBanner[]> {
  return [
    {
      id: "essentials",
      title: "Astra Essentials",
      body: "Everyday basics with lightning deals and limited-time discounts.",
      cta: { label: "Shop essentials", href: "/essentials" },
      icon: "gamepad",
      tone: "neutral",
    },
    {
      id: "deals",
      title: "Deals and promotions",
      body: "New markdowns every day. Grab them before the timer runs out.",
      cta: { label: "See today's deals", href: "/deals" },
      icon: "clock",
      tone: "primary",
    },
  ];
}

export async function getPicksForYou() {
  return picks;
}
export async function getBestSellers() {
  return bestSellers;
}

export async function getSponsoredShortcuts(): Promise<Shortcut[]> {
  return [
    {
      id: "vac",
      label: "Vacuum cleaners",
      note: "Big sale 20%",
      href: "/c/home-kitchen/vacuums",
      icon: "home",
    },
    {
      id: "xbox",
      label: "Xbox and consoles",
      note: "Big sale 30%",
      href: "/c/toys-games/consoles",
      icon: "gamepad",
    },
    {
      id: "speakers",
      label: "Portable speakers",
      note: "Big sale 30%",
      href: "/c/electronics/speakers",
      icon: "speaker",
    },
    {
      id: "proj",
      label: "Projectors",
      note: "Big sale 20%",
      href: "/c/computers/projectors",
      icon: "monitor",
    },
  ];
}
