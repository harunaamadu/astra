"use client";

/**
 * Mobile chrome for Astra. Place at: src/components/layout/mobile-bottom-nav.tsx
 *
 * Exports:
 *  - MobileBottomNav    fixed tab bar (Home, Categories, Search, Cart, Account), hidden from md up
 *  - MobileSearchToggle header icon button that opens/closes the search panel
 *  - MobileSearchPanel  search bar that drops down from the header, focused on open
 *
 * Search open state lives in the UI store (searchOpen) so the toggle, the bottom
 * nav and the header can all control the same panel.
 */

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Home, LayoutGrid, Search, ShoppingCart, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/layout/header/search-bar";
import { useUIStore } from "@/store/ui-store";
import { useCartStore, selectCount } from "@/store/cart-store";
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";
import type { Department } from "@/types";

const SEARCH_PANEL_ID = "mobile-search";

/* ---------------------------------- Search --------------------------------- */

export function MobileSearchToggle() {
  const open = useUIStore((s) => s.searchOpen);
  const setOpen = useUIStore((s) => s.setSearchOpen);

  return (
    <Button
      variant="ghost"
      size="icon"
      className="size-11 md:hidden"
      aria-expanded={open}
      aria-controls={SEARCH_PANEL_ID}
      aria-label={open ? "Close search" : "Open search"}
      onClick={() => setOpen(!open)}
    >
      {open ? <X className="size-5" aria-hidden /> : <Search className="size-5" aria-hidden />}
    </Button>
  );
}

export function MobileSearchPanel({ departments, popularSearches }: { departments: Department[]; popularSearches: string[] }) {
  const open = useUIStore((s) => s.searchOpen);
  const setOpen = useUIStore((s) => s.setSearchOpen);
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);

  // Close after navigating (for example after submitting a search).
  useEffect(() => {
    setOpen(false);
  }, [pathname, setOpen]);

  // Focus the input on open; close on Escape.
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => ref.current?.querySelector("input")?.focus(), 60);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, setOpen]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id={SEARCH_PANEL_ID}
          ref={ref}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.15 }}
          className="absolute inset-x-0 top-full border-b bg-background px-4 py-3 shadow-md md:hidden"
        >
          <SearchBar departments={departments} popularSearches={popularSearches} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* -------------------------------- Bottom nav ------------------------------- */

const itemClass =
  "relative flex flex-1 flex-col items-center justify-center gap-0.5 py-2 text-[11px] font-medium transition-colors";

function Pill() {
  return (
    <motion.span
      layoutId="bottom-nav-pill"
      className="absolute inset-x-4 top-0 h-0.5 rounded-full bg-primary"
      transition={{ type: "spring", stiffness: 500, damping: 40 }}
    />
  );
}

export function MobileBottomNav() {
  const pathname = usePathname();
  const mounted = useMounted();
  const cartCount = useCartStore(selectCount);
  const searchOpen = useUIStore((s) => s.searchOpen);
  const setSearchOpen = useUIStore((s) => s.setSearchOpen);
  const setMobileNavOpen = useUIStore((s) => s.setMobileNavOpen);
  const setCartOpen = useUIStore((s) => s.setCartOpen);
  const shownCount = mounted ? cartCount : 0;

  const onHome = pathname === "/";
  const onAccount = pathname.startsWith("/account") || pathname.startsWith("/sign-in");
  // Only one tab is highlighted: an open search panel takes priority over the route.
  const active = searchOpen ? "search" : onHome ? "home" : onAccount ? "account" : null;

  const tone = (key: string) => (active === key ? "text-foreground" : "text-muted-foreground");

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 border-t bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur supports-[backdrop-filter]:bg-background/85 md:hidden"
    >
      <div className="mx-auto flex max-w-md">
        <Link href="/" aria-current={onHome ? "page" : undefined} className={cn(itemClass, tone("home"))}>
          {active === "home" && <Pill />}
          <Home className="size-5" aria-hidden />
          Home
        </Link>

        <button
          type="button"
          onClick={() => {
            setSearchOpen(false);
            setMobileNavOpen(true);
          }}
          className={cn(itemClass, tone("categories"))}
        >
          <LayoutGrid className="size-5" aria-hidden />
          Categories
        </button>

        <button
          type="button"
          aria-expanded={searchOpen}
          aria-controls={SEARCH_PANEL_ID}
          onClick={() => setSearchOpen(!searchOpen)}
          className={cn(itemClass, tone("search"))}
        >
          {active === "search" && <Pill />}
          <Search className="size-5" aria-hidden />
          Search
        </button>

        <button
          type="button"
          onClick={() => {
            setSearchOpen(false);
            setCartOpen(true);
          }}
          aria-label={`Cart, ${shownCount} ${shownCount === 1 ? "item" : "items"}`}
          className={cn(itemClass, tone("cart"))}
        >
          <span className="relative">
            <ShoppingCart className="size-5" aria-hidden />
            {shownCount > 0 && (
              <span className="absolute -right-2.5 -top-1.5 grid min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold leading-4 text-primary-foreground">
                {shownCount > 99 ? "99+" : shownCount}
              </span>
            )}
          </span>
          Cart
        </button>

        <Link
          href="/account"
          aria-current={onAccount ? "page" : undefined}
          className={cn(itemClass, tone("account"))}
        >
          {active === "account" && <Pill />}
          <User className="size-5" aria-hidden />
          Account
        </Link>
      </div>
    </nav>
  );
}
