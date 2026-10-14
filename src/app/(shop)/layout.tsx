import { Footer } from "@/components/layout/footer/footer";
import { Header } from "@/components/layout/header/header";
import { MobileBottomNav } from "@/components/layout/header/mobile-bottom-nav";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { CartSync } from "@/components/cart/cart-sync";
import { DepartmentsProvider } from "@/components/providers/departments-provider";
import { getDepartments } from "@/lib/cms/departments";

/**
 * Storefront chrome: header, main landmark, and (from step 2) footer.
 * Other route groups, such as (account), (auth) and (vendor), define their own layouts,
 * so shoppers and sellers never share navigation they don't need.
 *
 * Mount here as they are built:
 *  - <Footer />      step 2
 *  - <CartDrawer />  step 4 (opened by the header's CartButton via the UI store)
 */
export default async function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const departments = await getDepartments();
  return (
    <DepartmentsProvider departments={departments}>
      <Header />
      <main id="main" className="min-h-[60vh]">
        {children}
      </main>
      <MobileBottomNav />
      <Footer />

      <CartDrawer />
      <CartSync />
    </DepartmentsProvider>
  );
}
