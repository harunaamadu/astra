"use client";

import { motion } from "framer-motion";
import { useScrollDirection } from "@/hooks/use-scroll-direction";
import { useUIStore } from "@/store/ui-store";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { MobileSearchPanel, MobileSearchToggle } from "@/components/layout/header/mobile-bottom-nav";
import type { Navigation } from "@/types/cms";
import { UtilityBar } from "./utility-bar";
import { Logo } from "./logo";
import { SearchBar } from "./search-bar";
import { AccountMenu } from "./account-menu";
import { WishlistButton } from "./wishlist-button";
import { CartButton } from "./cart-button";
import { MobileNav } from "./mobile-nav";
import { SubNav } from "./sub-nav";

/** Navigation comes from the server layout (Sanity or defaults) as plain data. */
export function Header({ navigation }: { navigation: Navigation }) {
  const { departments, subNavLinks, utilityLinks, popularSearches } = navigation;
  const { direction, y } = useScrollDirection();
  const searchOpen = useUIStore((s) => s.searchOpen);
  // Hide on scroll down, reveal on scroll up. Stay visible while searching.
  const hidden = direction === "down" && y > 160 && !searchOpen;

  return (
    <motion.header
      animate={{ y: hidden ? "-100%" : 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur supports-backdrop-filter:bg-background/75"
    >
      <UtilityBar links={utilityLinks} />

      <div className="mx-auto flex h-16 max-w-7xl items-center gap-2 px-4 sm:gap-4">
        <MobileNav departments={departments} subNavLinks={subNavLinks} utilityLinks={utilityLinks} />
        <Logo className="shrink-0" />
        <div className="mx-1 hidden min-w-0 flex-1 md:block">
          <SearchBar departments={departments} popularSearches={popularSearches} />
        </div>
        <div className="ml-auto flex items-center md:ml-0">
          <MobileSearchToggle />
          <div className="hidden md:flex">
            <AccountMenu />
            <WishlistButton />
          </div>
          <ThemeToggle />
          <div className="hidden md:block">
            <CartButton />
          </div>
        </div>
      </div>

      <MobileSearchPanel departments={departments} popularSearches={popularSearches} />
      <SubNav departments={departments} links={subNavLinks} />
    </motion.header>
  );
}
