"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore, selectCount } from "@/store/cart-store";
import { useUIStore } from "@/store/ui-store";
import { useMounted } from "@/hooks/use-mounted";

export function CartButton() {
  const mounted = useMounted();
  const count = useCartStore(selectCount);
  const setCartOpen = useUIStore((s) => s.setCartOpen);
  const shown = mounted ? count : 0;

  return (
    <Button
      variant="ghost"
      className="relative h-11 px-2 sm:px-3"
      onClick={() => setCartOpen(true)}
      aria-label={`Cart, ${shown} ${shown === 1 ? "item" : "items"}`}
    >
      <ShoppingCart className="size-5" aria-hidden />
      <span className="hidden text-sm font-medium lg:inline">Cart</span>
      {shown > 0 && (
        <span className="absolute right-0.5 top-0.5 grid min-w-5 place-items-center rounded-full bg-primary px-1 text-[11px] font-bold leading-5 text-primary-foreground">
          {shown > 99 ? "99+" : shown}
        </span>
      )}
    </Button>
  );
}
