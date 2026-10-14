import type { Department, NavLink } from "@/types";

/**
 * Temporary static data. In step 5 this moves to Sanity (category documents)
 * and is fetched with GROQ + cached via Next.js tags.
 */
export const departments: Department[] = [
  {
    id: "electronics",
    label: "Electronics",
    href: "/c/electronics",
    groups: [
      { title: "Audio", links: [
        { label: "Headphones", href: "/c/electronics/headphones" },
        { label: "Earbuds", href: "/c/electronics/earbuds" },
        { label: "Portable speakers", href: "/c/electronics/speakers" },
      ]},
      { title: "Phones & tablets", links: [
        { label: "Smartphones", href: "/c/electronics/smartphones" },
        { label: "Tablets", href: "/c/electronics/tablets" },
        { label: "Chargers & cables", href: "/c/electronics/chargers" },
      ]},
      { title: "Cameras", links: [
        { label: "Mirrorless", href: "/c/electronics/mirrorless" },
        { label: "Action cameras", href: "/c/electronics/action-cameras" },
      ]},
    ],
  },
  {
    id: "computers",
    label: "Computers",
    href: "/c/computers",
    groups: [
      { title: "Laptops", links: [
        { label: "Everyday laptops", href: "/c/computers/laptops" },
        { label: "Gaming laptops", href: "/c/computers/gaming-laptops" },
      ]},
      { title: "Displays", links: [
        { label: "Monitors", href: "/c/computers/monitors" },
        { label: "Projectors", href: "/c/computers/projectors" },
      ]},
      { title: "Accessories", links: [
        { label: "Keyboards & mice", href: "/c/computers/peripherals" },
        { label: "Storage", href: "/c/computers/storage" },
      ]},
    ],
  },
  {
    id: "home",
    label: "Home & Kitchen",
    href: "/c/home-kitchen",
    groups: [
      { title: "Kitchen", links: [
        { label: "Cookware", href: "/c/home-kitchen/cookware" },
        { label: "Small appliances", href: "/c/home-kitchen/appliances" },
      ]},
      { title: "Living", links: [
        { label: "Decor", href: "/c/home-kitchen/decor" },
        { label: "Pillows & throws", href: "/c/home-kitchen/pillows" },
        { label: "Vacuum cleaners", href: "/c/home-kitchen/vacuums" },
      ]},
    ],
  },
  {
    id: "fashion",
    label: "Fashion",
    href: "/c/fashion",
    groups: [
      { title: "Women", links: [
        { label: "Clothing", href: "/c/fashion/women-clothing" },
        { label: "Shoes", href: "/c/fashion/women-shoes" },
      ]},
      { title: "Men", links: [
        { label: "Clothing", href: "/c/fashion/men-clothing" },
        { label: "Sneakers", href: "/c/fashion/sneakers" },
      ]},
      { title: "Kids", links: [{ label: "Clothing", href: "/c/fashion/kids" }] },
    ],
  },
  {
    id: "beauty",
    label: "Beauty & Care",
    href: "/c/beauty",
    groups: [
      { title: "Skin", links: [
        { label: "Cleansers", href: "/c/beauty/cleansers" },
        { label: "Moisturizers", href: "/c/beauty/moisturizers" },
      ]},
      { title: "Hair", links: [
        { label: "Hair dryers", href: "/c/beauty/hair-dryers" },
        { label: "Styling", href: "/c/beauty/styling" },
      ]},
    ],
  },
  {
    id: "gaming",
    label: "Toys & Games",
    href: "/c/toys-games",
    groups: [
      { title: "Gaming", links: [
        { label: "Consoles", href: "/c/toys-games/consoles" },
        { label: "Controllers", href: "/c/toys-games/controllers" },
        { label: "VR", href: "/c/toys-games/vr" },
      ]},
      { title: "Toys", links: [
        { label: "Plush", href: "/c/toys-games/plush" },
        { label: "Puzzles", href: "/c/toys-games/puzzles" },
      ]},
    ],
  },
];

export const subNavLinks: NavLink[] = [
  { label: "Today's deals", href: "/deals" },
  { label: "Gift cards", href: "/gift-cards" },
  { label: "Registry & gifting", href: "/registry" },
  { label: "Best sellers", href: "/best-sellers" },
  { label: "New arrivals", href: "/new" },
];

export const utilityLinks: NavLink[] = [
  { label: "Help", href: "/help" },
  { label: "Sell on Astra", href: "/sell" },
  { label: "Astra Plus", href: "/plus" },
];

export const popularSearches = [
  "wireless headphones", "gaming monitor", "running shoes", "pressure cooker",
  "phone charger", "hair dryer", "bluetooth speaker", "laptop stand",
];
