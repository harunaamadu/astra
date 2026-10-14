import type { NavLink, Product } from "@/types";
import type {
  ProductDetail,
  ProductMedia,
  ProductReview,
  ProductSeller,
  ProductVariant,
  ReviewSummary,
} from "@/types/product";
import { getCatalogProducts } from "./home";
import { getAllCatalogProducts } from "./catalog";

/**
 * SAMPLE DATA. Replace with Sanity (descriptions, media, FAQ) + Prisma (price, stock,
 * variants, reviews) in steps 5-6. The exported async functions keep their signatures.
 */

const trails: Record<string, NavLink[]> = {
  headphones: [
    { label: "Electronics", href: "/c/electronics" },
    { label: "Headphones", href: "/c/electronics/headphones" },
  ],
  footprints: [
    { label: "Fashion", href: "/c/fashion" },
    { label: "Sneakers", href: "/c/fashion/sneakers" },
  ],
  "cooking-pot": [
    { label: "Home and kitchen", href: "/c/home-kitchen" },
    { label: "Cookware", href: "/c/home-kitchen/cookware" },
  ],
  plug: [
    { label: "Electronics", href: "/c/electronics" },
    { label: "Chargers and cables", href: "/c/electronics/chargers" },
  ],
  monitor: [
    { label: "Computers", href: "/c/computers" },
    { label: "Monitors", href: "/c/computers/monitors" },
  ],
  wind: [
    { label: "Beauty and care", href: "/c/beauty" },
    { label: "Hair dryers", href: "/c/beauty/hair-dryers" },
  ],
};

const seller: ProductSeller = {
  id: "astra",
  name: "Astra",
  rating: 4.8,
  fulfilledByAstra: true,
};

function media(p: Product, count = 4): ProductMedia[] {
  const views = ["front view", "side view", "in use", "detail"];
  return Array.from({ length: count }, (_, i) => ({
    src: i === 0 ? p.image : undefined,
    icon: p.icon,
    alt: `${p.title}, ${views[i] ?? `view ${i + 1}`}`,
  }));
}

function variantsFor(p: Product): {
  optionName: string;
  variants: ProductVariant[];
} {
  if (p.icon === "headphones") {
    const colors: [string, string, number][] = [
      ["Red", "#c8372d", 8],
      ["Navy", "#1f2a5a", 14],
      ["White", "#f4f4f2", 0],
      ["Black", "#1a1a1a", 23],
    ];
    return {
      optionName: "Color",
      variants: colors.map(([label, swatch, stock]) => ({
        id: label.toLowerCase(),
        label,
        swatch,
        stock,
        sku: `${p.id}-${label.slice(0, 3).toUpperCase()}`,
      })),
    };
  }
  if (p.icon === "footprints") {
    const sizes: [string, number][] = [
      ["US 7", 4],
      ["US 8", 12],
      ["US 9", 9],
      ["US 10", 3],
      ["US 11", 0],
    ];
    return {
      optionName: "Size",
      variants: sizes.map(([label, stock]) => ({
        id: label.toLowerCase().replace(" ", "-"),
        label,
        stock,
        sku: `${p.id}-${label.replace(" ", "")}`,
      })),
    };
  }
  return {
    optionName: "Option",
    variants: [
      { id: "default", label: "Standard", stock: 25, sku: `${p.id}-STD` },
    ],
  };
}

function summaryFor(p: Product): ReviewSummary {
  const five = Math.min(90, Math.max(20, Math.round((p.rating - 3) * 45 + 15)));
  const four = Math.round((100 - five) * 0.5);
  const three = Math.round((100 - five - four) * 0.5);
  const two = Math.round((100 - five - four - three) * 0.5);
  const one = 100 - five - four - three - two;
  return {
    average: p.rating,
    count: p.reviewCount,
    breakdown: { 5: five, 4: four, 3: three, 2: two, 1: one },
  };
}

const reviewsFor = (p: Product): ProductReview[] => [
  {
    id: `${p.id}-r1`,
    author: "Kwame A.",
    rating: 5,
    title: "Exactly as described",
    body: "Arrived on time and matched the listing. I would order from this seller again.",
    date: "2026-08-21",
    verified: true,
  },
  {
    id: `${p.id}-r2`,
    author: "Elena R.",
    rating: 4,
    title: "Good value",
    body: "Does what I needed for the price. Packaging could be better, but the product itself is solid.",
    date: "2026-07-02",
    verified: true,
  },
  {
    id: `${p.id}-r3`,
    author: "Sam O.",
    rating: 4,
    title: "Happy with it so far",
    body: "Used it daily for a month with no problems. Delivery tracking was clear throughout.",
    date: "2026-05-18",
    verified: false,
  },
];

const faq = [
  {
    question: "How long does delivery take?",
    answer:
      "Most orders arrive in 2 to 4 business days. You will see an exact estimate at checkout, and you can track the order from your account.",
  },
  {
    question: "Can I return this item?",
    answer:
      "Yes. You can return eligible items within 30 days of delivery. Start a return from your orders page.",
  },
  {
    question: "Is the seller verified?",
    answer:
      "Every seller on Astra is verified before listing. Items marked Fulfilled by Astra are stored, packed and shipped by us.",
  },
  {
    question: "Which payment methods can I use?",
    answer:
      "Cards, PayPal and mobile money, depending on your region. Payment details are handled by our payment provider and never stored on Astra servers.",
  },
];

function build(p: Product): ProductDetail {
  const { optionName, variants } = variantsFor(p);
  const isJbl = p.id === "p-jbl750";
  return {
    ...p,
    description: isJbl
      ? "Wireless over-ear headphones with active noise cancellation, a foldable design and a built-in microphone for calls. Pure Bass sound and long battery life make them a dependable pair for work, travel and everything between."
      : `${p.title}. Sold and shipped by Astra. Full details for this listing are provided in the specifications below.`,
    highlights: isJbl
      ? [
          "Active noise cancellation",
          "Up to 15 hours of battery life with Bluetooth and noise cancelling on",
          "Lightweight, foldable design",
          "Voice assistant and hands-free calling",
        ]
      : [
          "Backed by Astra's 30-day returns",
          "Tracked delivery",
          "Secure checkout",
        ],
    specs: [
      ...(p.brand ? [{ label: "Brand", value: p.brand }] : []),
      ...(isJbl
        ? [
            { label: "Connectivity", value: "Bluetooth, wireless" },
            { label: "Form factor", value: "Over-ear" },
            { label: "Noise control", value: "Active noise cancellation" },
            { label: "Model", value: "Tune 750BTNC" },
          ]
        : []),
      {
        label: optionName === "Option" ? "Edition" : `${optionName} options`,
        value: variants.map((v) => v.label).join(", "),
      },
      { label: "Sold by", value: seller.name },
    ],
    images: media(p),
    optionName,
    variants,
    category: trails[p.icon ?? ""] ?? [
      { label: "All departments", href: "/c" },
    ],
    seller,
    shipping: {
      freeOverCents: 3500,
      estimate: "2 to 4 business days",
      returnWindowDays: 30,
    },
    faq,
    reviews: { summary: summaryFor(p), items: reviewsFor(p) },
  };
}

async function catalog(): Promise<Product[]> {
  const all = [
    ...(await getCatalogProducts()),
    ...(await getAllCatalogProducts()),
  ];
  return [...new Map(all.map((p) => [p.id, p])).values()];
}

export async function getAllProductSlugs(): Promise<string[]> {
  return (await catalog()).map((p) => p.slug);
}

export async function getProductBySlug(
  slug: string,
): Promise<ProductDetail | null> {
  const found = (await catalog()).find((p) => p.slug === slug);
  return found ? build(found) : null;
}

export async function getRelatedProducts(
  product: Product,
  limit = 5,
): Promise<Product[]> {
  const others = (await catalog()).filter((p) => p.id !== product.id);
  const same = others.filter((p) => p.icon === product.icon);
  const rest = others.filter((p) => p.icon !== product.icon);
  return [...same, ...rest].slice(0, limit);
}

export async function getProductsByIds(ids: string[]): Promise<Product[]> {
  const all = await catalog();
  return ids
    .map((id) => all.find((p) => p.id === id))
    .filter((p): p is Product => !!p);
}