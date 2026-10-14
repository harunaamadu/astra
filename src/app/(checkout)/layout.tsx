import Link from "next/link";
import { Lock } from "lucide-react";
import { Logo } from "@/components/layout/header/logo";
import { CartSync } from "@/components/cart/cart-sync";

/** Distraction-free chrome: no mega menu, search or footer links to wander off to. */
export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="border-b">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Logo />
          <p className="hidden items-center gap-1.5 text-sm text-muted-foreground sm:flex">
            <Lock className="size-4" aria-hidden /> Secure checkout
          </p>
          <Link href="/cart" className="text-sm underline-offset-4 hover:underline">Back to cart</Link>
        </div>
      </header>
      <main id="main" className="mx-auto max-w-6xl px-4 py-6 md:py-10">{children}</main>
      <footer className="border-t py-6 text-center text-xs text-muted-foreground">
        <Link href="/legal/terms" className="hover:underline">Conditions of use</Link>
        <span aria-hidden className="mx-2">·</span>
        <Link href="/legal/privacy" className="hover:underline">Privacy notice</Link>
        <span aria-hidden className="mx-2">·</span>
        <Link href="/help" className="hover:underline">Help</Link>
      </footer>
      <CartSync />
    </>
  );
}