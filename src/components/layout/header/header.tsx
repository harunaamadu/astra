"use client";

import { motion } from "framer-motion";
import { useScrollDirection } from "@/hooks/use-scroll-direction";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { UtilityBar } from "./utility-bar";
import { Logo } from "./logo";
import { SearchBar } from "./search-bar";
import { AccountMenu } from "./account-menu";
import { WishlistButton } from "./wishlist-button";
import { CartButton } from "./cart-button";
import { MobileNav } from "./mobile-nav";
import { SubNav } from "./sub-nav";
import { useUIStore } from "@/store/ui-store";
import { MobileSearchPanel, MobileSearchToggle } from "./mobile-bottom-nav";

export function Header() {
  const { direction, y } = useScrollDirection();

  const searchOpen = useUIStore((s) => s.searchOpen);
  const hidden = direction === "down" && y > 160 && !searchOpen;

  return (
    <motion.header
      animate={{ y: hidden ? "-100%" : 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur supports-backdrop-filter:bg-background/75"
    >
      <UtilityBar />

      <div className="mx-auto flex h-16 max-w-7xl items-center gap-2 px-4 sm:gap-4">
        <MobileNav />
        <Logo className="shrink-0" />
        <div className="mx-1 hidden min-w-0 flex-1 md:block">
          <SearchBar />
        </div>
        <div className="ml-auto flex items-center md:ml-0">
          {/* <MobileSearchToggle /> */}
          <WishlistButton />
          <div className="hidden md:flex">
            <AccountMenu />
            <WishlistButton className="block md:hidden" />
          </div>
          <ThemeToggle />
          <div className="hidden md:block">
            <CartButton />
          </div>
        </div>
      </div>

      <MobileSearchPanel />
      <SubNav />
    </motion.header>
  );
}
