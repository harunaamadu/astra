"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import { useUIStore } from "@/store/ui-store";
import type { OrderItem } from "@/types/order";

export function BuyAgainButton({ items }: { items: OrderItem[] }) {
  const add = useCartStore((s) => s.add);
  const setCartOpen = useUIStore((s) => s.setCartOpen);

  return (
    <Button
      variant="outline"
      onClick={() => {
        for (const i of items) {
          add({
            productId: i.productId, variantId: i.variantId, variantLabel: i.variantLabel, vendorId: i.vendorId,
            slug: i.slug, title: i.title, image: i.image, icon: i.icon, price: i.price,
          }, i.quantity);
        }
        toast.success("Items added to your cart", { action: { label: "View cart", onClick: () => setCartOpen(true) } });
      }}
    >
      Buy again
    </Button>
  );
}