import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { cartItemKey, lineCap } from "@/lib/cart/pricing";
import type { CartItem } from "@/types";
import type { AppliedPromo, ShippingMethodId } from "@/types/cart";

type NewItem = Omit<CartItem, "quantity" | "selected" | "gift">;

type CartState = {
  items: CartItem[];
  saved: CartItem[];
  promo: AppliedPromo | null;
  shippingMethod: ShippingMethodId;

  add: (item: NewItem, quantity?: number) => { added: number; capped: boolean };
  remove: (key: string) => { item: CartItem; index: number } | null;
  restore: (item: CartItem, index?: number) => void;
  setQuantity: (key: string, quantity: number) => void;
  toggleSelected: (key: string) => void;
  setAllSelected: (selected: boolean) => void;
  setGift: (key: string, gift: boolean) => void;

  saveForLater: (key: string) => void;
  moveToCart: (key: string) => void;
  removeSaved: (key: string) => CartItem | null;
  restoreSaved: (item: CartItem) => void;

  applyPromo: (promo: AppliedPromo) => void;
  removePromo: () => void;
  setShippingMethod: (id: ShippingMethodId) => void;

  clear: () => CartItem[];
  restoreAll: (items: CartItem[]) => void;
};

const isKey = (key: string) => (i: CartItem) => cartItemKey(i) === key;

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      saved: [],
      promo: null,
      shippingMethod: "standard",

      add: (item, quantity = 1) => {
        const key = cartItemKey(item);
        const existing = get().items.find(isKey(key));
        const cap = lineCap(item);
        const current = existing?.quantity ?? 0;
        const next = Math.min(current + quantity, cap);

        set((s) => ({
          items: existing
            ? s.items.map((i) => (cartItemKey(i) === key ? { ...i, quantity: next, maxQuantity: item.maxQuantity ?? i.maxQuantity } : i))
            : [...s.items, { ...item, quantity: next, selected: true }],
        }));
        return { added: next - current, capped: current + quantity > cap };
      },

      remove: (key) => {
        const { items } = get();
        const index = items.findIndex(isKey(key));
        if (index < 0) return null;
        const item = items[index];
        set({ items: items.filter((_, i) => i !== index) });
        return { item, index };
      },

      restore: (item, index) =>
        set((s) => {
          if (s.items.some(isKey(cartItemKey(item)))) return s;
          const next = [...s.items];
          next.splice(Math.min(index ?? next.length, next.length), 0, item);
          return { items: next };
        }),

      setQuantity: (key, quantity) =>
        set((s) => ({
          items: s.items.map((i) =>
            cartItemKey(i) === key ? { ...i, quantity: Math.max(1, Math.min(Math.floor(quantity), lineCap(i))) } : i,
          ),
        })),

      toggleSelected: (key) =>
        set((s) => ({ items: s.items.map((i) => (cartItemKey(i) === key ? { ...i, selected: !i.selected } : i)) })),

      setAllSelected: (selected) => set((s) => ({ items: s.items.map((i) => ({ ...i, selected })) })),

      setGift: (key, gift) =>
        set((s) => ({ items: s.items.map((i) => (cartItemKey(i) === key ? { ...i, gift } : i)) })),

      saveForLater: (key) =>
        set((s) => {
          const item = s.items.find(isKey(key));
          if (!item) return s;
          return {
            items: s.items.filter((i) => cartItemKey(i) !== key),
            saved: [...s.saved.filter((i) => cartItemKey(i) !== key), item],
          };
        }),

      moveToCart: (key) =>
        set((s) => {
          const item = s.saved.find(isKey(key));
          if (!item) return s;
          const saved = s.saved.filter((i) => cartItemKey(i) !== key);
          const existing = s.items.find(isKey(key));
          if (existing) {
            return {
              saved,
              items: s.items.map((i) =>
                cartItemKey(i) === key ? { ...i, quantity: Math.min(i.quantity + item.quantity, lineCap(i)) } : i,
              ),
            };
          }
          return { saved, items: [...s.items, { ...item, selected: true }] };
        }),

      removeSaved: (key) => {
        const item = get().saved.find(isKey(key)) ?? null;
        if (item) set((s) => ({ saved: s.saved.filter((i) => cartItemKey(i) !== key) }));
        return item;
      },

      restoreSaved: (item) =>
        set((s) => (s.saved.some(isKey(cartItemKey(item))) ? s : { saved: [...s.saved, item] })),

      applyPromo: (promo) => set({ promo }),
      removePromo: () => set({ promo: null }),
      setShippingMethod: (shippingMethod) => set({ shippingMethod }),

      clear: () => {
        const previous = get().items;
        set({ items: [], promo: null });
        return previous;
      },
      restoreAll: (items) => set({ items }),
    }),
    {
      name: "astra-cart",
      version: 2,
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ items: s.items, saved: s.saved, promo: s.promo, shippingMethod: s.shippingMethod }),
      migrate: (persisted, version) => {
        const old = (persisted ?? {}) as Partial<CartState>;
        if (version < 2) {
          return {
            items: (old.items ?? []).map((i) => ({ ...i, selected: true })),
            saved: [],
            promo: null,
            shippingMethod: "standard",
          } as unknown as CartState;
        }
        return old as CartState;
      },
    },
  ),
);

/** Kept for the header badge and bottom nav: units across every line. */
export const selectCount = (s: CartState) => s.items.reduce((n, i) => n + i.quantity, 0);
export const selectSubtotal = (s: CartState) => s.items.reduce((n, i) => n + i.price * i.quantity, 0);
