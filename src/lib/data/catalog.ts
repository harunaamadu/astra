import type { IconKey } from "@/types";
import type { CatalogProduct, Category, CategoryListing, FilterQuery } from "@/types/catalog";
import { applyFilters, computeFacets, priceBounds, sortProducts } from "@/lib/catalog/filtering";
import { slugify } from "@/lib/catalog/slug";

/**
 * SAMPLE DATA, generated deterministically (seeded, no Math.random, so builds are stable).
 * Replace with Prisma queries (WHERE + ORDER BY + LIMIT/OFFSET, facets via GROUP BY) in step 6.
 * Public signatures stay the same.
 */

export const PAGE_SIZE = 12;

export const sellers = [
  { id: "astra", name: "Astra" },
  { id: "five-stars", name: "Five Stars" },
  { id: "the-middle-merchant", name: "The Middle Merchant" },
  { id: "joes-tech-shop", name: "Joe's Tech Shop" },
  { id: "melbourne-express", name: "Melbourne Express" },
  { id: "bella-blu", name: "Bella BLU" },
];
export const sellerNames = Object.fromEntries(sellers.map((s) => [s.id, s.name]));

type LeafSpec = {
  icon: IconKey;
  count: number;
  names: string[];
  brands: string[];
  /** cents */
  price: [number, number];
  colors: string[];
  attrs: Record<string, string[]>;
};

const specs: Record<string, LeafSpec> = {
  "computers/monitors": {
    icon: "monitor", count: 26, price: [8000, 45000],
    names: ['21.5" Full HD Monitor', '24" IPS Monitor', '27" Curved Monitor', '27" Gaming Monitor', '32" 4K Monitor'],
    brands: ["Acer", "Samsung", "BenQ", "LG", "Dell", "HP"],
    colors: ["black", "silver", "white"],
    attrs: { "Display size": ['21.5"', '24"', '27"', '32"'], "Refresh rate": ["60 Hz", "75 Hz", "144 Hz"], Resolution: ["1080p", "1440p", "4K"] },
  },
  "computers/laptops": {
    icon: "laptop", count: 14, price: [35000, 180000],
    names: ["14-inch Everyday Laptop", "15.6-inch Laptop", "13-inch Ultrabook"],
    brands: ["Acer", "Lenovo", "HP", "Dell", "ASUS"],
    colors: ["silver", "gray", "black"],
    attrs: { Memory: ["8 GB", "16 GB", "32 GB"], Storage: ["256 GB", "512 GB", "1 TB"] },
  },
  "electronics/headphones": {
    icon: "headphones", count: 16, price: [3000, 38000],
    names: ["Wireless Over-Ear Headphones", "Noise Cancelling Headphones", "Studio Headphones", "Gaming Headset"],
    brands: ["JBL", "Sony", "Sennheiser", "Razer", "Anker"],
    colors: ["black", "white", "blue", "red"],
    attrs: { Connectivity: ["Bluetooth", "Wired", "Bluetooth and wired"], Fit: ["Over-ear", "On-ear"] },
  },
  "electronics/earbuds": {
    icon: "headphones", count: 13, price: [1500, 25000],
    names: ["True Wireless Earbuds", "Sport Earbuds", "Noise Cancelling Earbuds"],
    brands: ["Xiaomi", "Sony", "JBL", "Anker", "Soundcore"],
    colors: ["black", "white", "blue"],
    attrs: { Connectivity: ["Bluetooth"], "Battery life": ["6 hours", "8 hours", "24 hours"] },
  },
  "electronics/speakers": {
    icon: "speaker", count: 13, price: [2000, 22000],
    names: ["Portable Bluetooth Speaker", "Waterproof Party Speaker", "Mini Speaker"],
    brands: ["JBL", "Sony", "Anker", "Ultimate Ears", "Tribit"],
    colors: ["black", "blue", "red", "green"],
    attrs: { Connectivity: ["Bluetooth", "Bluetooth and aux"], "Water resistance": ["IPX5", "IPX7"] },
  },
  "electronics/chargers": {
    icon: "plug", count: 13, price: [599, 6500],
    names: ["USB-C Fast Charger", "Lightning to USB Cable", "Wireless Charging Pad", "Power Bank"],
    brands: ["Anker", "Astra Essentials", "Belkin", "Baseus"],
    colors: ["black", "white"],
    attrs: { Connector: ["USB-C", "Lightning", "Micro-USB"], Length: ["1 m", "2 m"] },
  },
  "home-kitchen/cookware": {
    icon: "cooking-pot", count: 14, price: [2500, 18000],
    names: ['12" Frying Pan', "Stackable Cookware Set", "Non-stick Saucepan", "Cast Iron Skillet"],
    brands: ["GreenPan", "Tefal", "Lodge", "Cuisinart"],
    colors: ["black", "gray", "red"],
    attrs: { Material: ["Hard anodized", "Cast iron", "Stainless steel"], "Induction ready": ["Yes", "No"] },
  },
  "home-kitchen/appliances": {
    icon: "cooking-pot", count: 13, price: [3000, 25000],
    names: ["7-in-1 Electric Pressure Cooker", "Air Fryer", "Blender", "Electric Kettle"],
    brands: ["Instant Pot", "Philips", "Ninja", "Tefal"],
    colors: ["black", "silver", "red"],
    attrs: { Capacity: ["2 L", "4 L", "6 L"] },
  },
  "home-kitchen/vacuums": {
    icon: "home", count: 13, price: [7000, 60000],
    names: ["Cordless Vacuum Cleaner", "Robot Vacuum", "Handheld Vacuum"],
    brands: ["Xiaomi", "Dyson", "Shark", "Roborock"],
    colors: ["black", "white", "blue"],
    attrs: { Type: ["Cordless", "Robot", "Handheld"] },
  },
  "fashion/sneakers": {
    icon: "footprints", count: 18, price: [4500, 17500],
    names: ["Running Shoe", "Air Max Sneaker", "Winter Boot", "Training Shoe"],
    brands: ["Nike", "Adidas", "Puma", "New Balance"],
    colors: ["black", "white", "red", "blue", "gray"],
    attrs: { Fit: ["Regular", "Wide"], Use: ["Running", "Everyday", "Training"] },
  },
  "beauty/hair-dryers": {
    icon: "wind", count: 12, price: [1800, 15000],
    names: ["Ionic Hair Dryer", "Compact Travel Dryer", "Professional Hair Dryer"],
    brands: ["Philips", "Remington", "Babyliss", "Dyson"],
    colors: ["black", "purple", "white"],
    attrs: { Power: ["1600 W", "1875 W", "2200 W"] },
  },
};

function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const hash = (s: string) => [...s].reduce((h, c) => (Math.imul(h, 31) + c.charCodeAt(0)) >>> 0, 7);
const pick = <T,>(r: () => number, list: T[]) => list[Math.floor(r() * list.length)];

function generate(path: string, spec: LeafSpec): CatalogProduct[] {
  const r = rng(hash(path));
  const leaf = path.split("/")[1];
  return Array.from({ length: spec.count }, (_, i) => {
    const brand = pick(r, spec.brands);
    const name = pick(r, spec.names);
    const model = `${String.fromCharCode(65 + Math.floor(r() * 26))}${String.fromCharCode(65 + Math.floor(r() * 26))}${100 + Math.floor(r() * 900)}`;
    const title = `${brand} ${model} ${name}`;
    const base = spec.price[0] + r() * (spec.price[1] - spec.price[0]);
    const price = Math.max(99, Math.round(base / 100) * 100 - 1);
    const rating = Math.round((3.6 + r() * 1.3) * 10) / 10;
    const reviewCount = Math.round(20 + Math.pow(r(), 3) * 15000);
    const sellerId = i % 3 === 0 ? "astra" : pick(r, sellers).id;
    const badge = i % 9 === 0 ? "Best seller" : i % 7 === 3 ? "Sponsored" : i % 11 === 5 ? "New" : undefined;

    return {
      id: `c-${leaf}-${i}`,
      slug: `${slugify(title)}-${leaf}-${i}`,
      title,
      brand,
      price,
      compareAtPrice: i % 4 === 0 ? Math.round((price * 1.2) / 100) * 100 - 1 : undefined,
      rating,
      reviewCount,
      icon: spec.icon,
      badge,
      vendorId: sellerId,
      categoryPath: path,
      sellerId,
      color: pick(r, spec.colors),
      attrs: Object.fromEntries(Object.entries(spec.attrs).map(([k, v]) => [k, pick(r, v)])),
      rank: i,
    } satisfies CatalogProduct;
  });
}

const all: CatalogProduct[] = Object.entries(specs).flatMap(([path, spec]) => generate(path, spec));

/** Every sample catalog product, used by the product pages too. */
export async function getAllCatalogProducts(): Promise<CatalogProduct[]> {
  return all;
}

export async function getCategoryListing(category: Category, query: FilterQuery): Promise<CategoryListing> {
  const inCategory = all.filter(
    (p) => p.categoryPath === category.path || p.categoryPath.startsWith(`${category.path}/`),
  );
  const sorted = sortProducts(applyFilters(inCategory, query), query.sort);

  const total = sorted.length;
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const page = Math.min(query.page, pageCount);

  return {
    products: sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    total,
    page,
    pageCount,
    pageSize: PAGE_SIZE,
    facets: computeFacets(inCategory, query, { sellerNames, includeAttrs: category.isLeaf }),
    priceBounds: priceBounds(inCategory),
  };
}
