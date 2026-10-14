"use client";

import { useMemo } from "react";
import { useCartStore } from "@/store/cart-store";
import { calculateTotals } from "@/lib/cart/pricing";
import { useMounted } from "@/hooks/use-mounted";
import type { CartItem } from "@/types";

const EMPTY: CartItem[] = [];

/**
 * Cart data safe to render on the server and the first client pass.
 * Until mounted (localStorage hydrated) it returns an empty cart, so markup matches.
 */
export function useCart() {
  const ready = useMounted();
  const storeItems = useCartStore((s) => s.items);
  const storeSaved = useCartStore((s) => s.saved);
  const storePromo = useCartStore((s) => s.promo);
  const shippingMethod = useCartStore((s) => s.shippingMethod);

  const items = ready ? storeItems : EMPTY;
  const saved = ready ? storeSaved : EMPTY;
  const promo = ready ? storePromo : null;

  const totals = useMemo(() => calculateTotals(items, promo, shippingMethod), [items, promo, shippingMethod]);
  const allSubtotal = useMemo(() => items.reduce((n, i) => n + i.price * i.quantity, 0), [items]);

  return { ready, items, saved, promo, shippingMethod, totals, allSubtotal };
}
