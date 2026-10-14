import { create } from "zustand";

type UIState = {
  cartOpen: boolean;
  mobileNavOpen: boolean;

  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;

  setCartOpen: (open: boolean) => void;
  setMobileNavOpen: (open: boolean) => void;
};

export const useUIStore = create<UIState>((set) => ({
  cartOpen: false,
  mobileNavOpen: false,

  searchOpen: false,
  setSearchOpen: (searchOpen) => set({ searchOpen }),

  setCartOpen: (cartOpen) => set({ cartOpen }),
  setMobileNavOpen: (mobileNavOpen) => set({ mobileNavOpen }),
}));
