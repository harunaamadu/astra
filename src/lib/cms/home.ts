import * as sample from "@/lib/data/home";
import { sanityFetch } from "@/lib/sanity/fetch";
import { homeQuery } from "@/lib/sanity/queries";
import type { CategoryTile, HeroSlide, PromoBanner, Shortcut } from "@/types";

type CmsHeroSlide = Omit<HeroSlide, "product"> & { productSlug?: string };

type HomeContent = {
  heroSlides?: CmsHeroSlide[];
  categoryTiles?: CategoryTile[];
  personalOffers?: Shortcut[];
  promoBanners?: PromoBanner[];
  sponsoredShortcuts?: Shortcut[];
};

const home = () => sanityFetch<HomeContent>(homeQuery, ["sanity:home"]);

/** Hero copy comes from Sanity. A featured product is looked up by slug so its price always comes from the catalog. */
export async function getHeroSlides(): Promise<HeroSlide[]> {
  const content = await home();
  if (!content?.heroSlides?.length) return sample.getHeroSlides();

  const catalog = await sample.getCatalogProducts();
  return content.heroSlides.map(({ productSlug, ...slide }) => {
    const product = productSlug ? catalog.find((p) => p.slug === productSlug) : undefined;
    return product ? { ...slide, product } : slide;
  });
}

/** The Sanity list when editors have filled it in, otherwise the sample list. */
async function pick<K extends Exclude<keyof HomeContent, "heroSlides">>(
  key: K,
  fallback: () => Promise<NonNullable<HomeContent[K]>>,
): Promise<NonNullable<HomeContent[K]>> {
  const list = (await home())?.[key] as NonNullable<HomeContent[K]> | undefined;
  return list?.length ? list : fallback();
}

export const getCategories = () => pick("categoryTiles", sample.getCategories);
export const getPersonalOffers = () => pick("personalOffers", sample.getPersonalOffers);
export const getPromoBanners = () => pick("promoBanners", sample.getPromoBanners);
export const getSponsoredShortcuts = () => pick("sponsoredShortcuts", sample.getSponsoredShortcuts);
