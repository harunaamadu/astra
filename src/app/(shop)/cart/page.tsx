import type { Metadata } from "next";
import Link from "next/link";
import { CartPageContent } from "@/components/cart/cart-page-content";
import { ProductRail } from "@/components/product/product-rail";
import { getBestSellers } from "@/lib/data/home";

export const metadata: Metadata = {
  title: "Your cart",
  robots: { index: false },
};

export default async function CartPage() {
  const suggestions = await getBestSellers();

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-6 md:py-8">
        <div className="mb-6 flex items-baseline justify-between gap-4">
          <h1 className="text-2xl font-semibold md:text-3xl">Shopping cart</h1>
          <Link href="/" className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
            Continue shopping
          </Link>
        </div>
        <CartPageContent />
      </div>
      <ProductRail id="cart-suggestions" title="You might also need" href="/best-sellers" products={suggestions} />
    </>
  );
}
