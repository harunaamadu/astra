import type { Metadata } from "next";
import { HeroCarousel } from "@/components/home/hero-carousel";
import { PersonalOffers } from "@/components/home/personal-offers";
import { CategoryGrid } from "@/components/home/category-grid";
import { PromoBanners } from "@/components/home/promo-banners";
import { DeliveryBanner } from "@/components/home/delivery-banner";
import { SponsoredStrip } from "@/components/home/sponsored-strip";
import { SellerCta } from "@/components/home/seller-cta";
import { NewsletterSection } from "@/components/home/newsletter-section";
import { ProductRail } from "@/components/product/product-rail";
import {
  getBestSellers, getCategories, getHeroSlides, getPersonalOffers,
  getPicksForYou, getPromoBanners, getSponsoredShortcuts,
} from "@/lib/data/home";

export const metadata: Metadata = {
  title: { absolute: "Astra: everyday essentials and standout finds" },
};

export default async function HomePage() {
  const [slides, categories, offers, banners, picks, bestSellers, sponsored] = await Promise.all([
    getHeroSlides(), getCategories(), getPersonalOffers(), getPromoBanners(),
    getPicksForYou(), getBestSellers(), getSponsoredShortcuts(),
  ]);

  return (
    <>
      <HeroCarousel slides={slides} />
      {/* userName comes from the session in step 7 */}
      <PersonalOffers items={offers} userName={null} />
      <CategoryGrid categories={categories} />
      <PromoBanners banners={banners} />
      <ProductRail id="picked" title="Picked for you" href="/for-you" products={picks} />
      <DeliveryBanner />
      <ProductRail id="best-sellers" title="Astra top sellers" href="/best-sellers" products={bestSellers} />
      <SponsoredStrip items={sponsored} />
      <SellerCta />
      <NewsletterSection />
    </>
  );
}
