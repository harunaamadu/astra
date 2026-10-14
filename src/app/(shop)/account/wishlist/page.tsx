import type { Metadata } from "next";
import { WishlistGrid } from "@/components/account/wishlist-grid";

export const metadata: Metadata = { title: "Your wishlist", robots: { index: false } };

export default function WishlistPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold md:text-3xl">Your wishlist</h1>
      <WishlistGrid />
    </div>
  );
}