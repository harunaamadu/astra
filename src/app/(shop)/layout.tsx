import { Header } from "@/components/layout/header/header";
import { Footer } from "@/components/layout/footer/footer";
import { MobileBottomNav } from "@/components/layout/header/mobile-bottom-nav";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { CartSync } from "@/components/cart/cart-sync";
import { getNavigation } from "@/lib/data/navigation";

/**
 * Storefront chrome. Navigation and footer links come from Sanity (cached, tagged, revalidated
 * by webhook), falling back to built-in defaults. The footer reserves space for the mobile bottom nav.
 */
export default async function ShopLayout({ children }: { children: React.ReactNode }) {
  const navigation = await getNavigation();
  return (
    <>
      <Header navigation={navigation} />
      <main id="main" className="min-h-[60vh]">{children}</main>
      <Footer columns={navigation.footerColumns} legalLinks={navigation.legalLinks} />
      <MobileBottomNav />
      <CartDrawer />
      <CartSync />
    </>
  );
}
