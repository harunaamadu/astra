import type { Department, HeroSlide, NavGroup, NavLink } from "@/types";

export type Navigation = {
  departments: Department[];
  subNavLinks: NavLink[];
  utilityLinks: NavLink[];
  popularSearches: string[];
  footerColumns: NavGroup[];
  legalLinks: NavLink[];
};

/** What the CMS stores for a hero slide. The featured product is resolved later, so price stays live. */
export type CmsHeroSlide = Omit<HeroSlide, "product"> & { productSlug?: string };
