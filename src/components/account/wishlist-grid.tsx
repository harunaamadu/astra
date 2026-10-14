"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/product-card";
import { useWishlistStore } from "@/store/wishlist-store";
import { useMounted } from "@/hooks/use-mounted";
import { getProductsByIds } from "@/features/account/actions";
import type { Product } from "@/types";

/** The wishlist lives in this browser (Zustand). Signed-in sync arrives with the database in step 6. */
export function WishlistGrid() {
  const mounted = useMounted();
  const ids = useWishlistStore((s) => s.ids);
  const [products, setProducts] = useState<Product[] | null>(null);

  useEffect(() => {
    if (!mounted) return;
    let cancelled = false;
    if (ids.length === 0) {
      setProducts([]);
      return;
    }
    getProductsByIds(ids).then((p) => !cancelled && setProducts(p));
    return () => {
      cancelled = true;
    };
  }, [mounted, ids]);

  if (!mounted || products === null) {
    return (
      <div role="status" aria-label="Loading wishlist" className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {Array.from({ length: 3 }, (_, i) => <div key={i} className="aspect-3/4 animate-pulse rounded-xl bg-muted" />)}
      </div>
    );
  }

  if (ids.length === 0 || products.length === 0) {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-dashed px-6 py-16 text-center">
        <Heart className="size-10 text-muted-foreground" strokeWidth={1.5} aria-hidden />
        <h2 className="mt-4 text-lg font-semibold">Your wishlist is empty</h2>
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">Tap the heart on any product to save it here for later.</p>
        <Button asChild className="mt-5"><Link href="/">Start browsing</Link></Button>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:gap-4">
      {products.map((p) => <li key={p.id} className="min-w-0"><ProductCard product={p} /></li>)}
    </ul>
  );
}
