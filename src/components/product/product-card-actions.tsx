"use client";

import { Heart } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { useUIStore } from "@/store/ui-store";
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

export function WishlistToggle({ product, className }: { product: Product; className?: string }) {
  const mounted = useMounted();
  const saved = useWishlistStore((s) => s.ids.includes(product.id));
  const toggle = useWishlistStore((s) => s.toggle);
  const active = mounted && saved;

  return (
    <Button
      type="button"
      variant="secondary"
      size="icon"
      aria-pressed={active}
      aria-label={active ? `Remove ${product.title} from wishlist` : `Save ${product.title} to wishlist`}
      onClick={() => {
        toggle(product.id);
        toast(active ? "Removed from wishlist" : "Saved to wishlist");
      }}
      className={cn("size-8 rounded-full bg-background/90 shadow-sm", className)}
    >
      <Heart className={cn("size-4", active && "fill-destructive text-destructive")} aria-hidden />
    </Button>
  );
}

export function QuickAddButton({ product }: { product: Product }) {
  const add = useCartStore((s) => s.add);
  const setCartOpen = useUIStore((s) => s.setCartOpen);

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className="w-full"
      onClick={() => {
        add({
          productId: product.id,
          vendorId: product.vendorId,
          slug: product.slug,
          title: product.title,
          image: product.image ?? "",
          price: product.price,
        });
        toast.success("Added to cart", { action: { label: "View cart", onClick: () => setCartOpen(true) } });
      }}
    >
      Add to cart
    </Button>
  );
}
