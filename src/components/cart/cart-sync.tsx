"use client";

import { useEffect } from "react";
import { useCartStore } from "@/store/cart-store";

/** Keeps the cart in sync across browser tabs: a change in one tab rehydrates the others. */
export function CartSync() {
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === "astra-cart") void useCartStore.persist.rehydrate();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);
  return null;
}
