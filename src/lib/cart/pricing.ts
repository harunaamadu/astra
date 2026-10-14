import type { CartItem } from "@/types";
import type { AppliedPromo, CartTotals, ShippingMethod, ShippingMethodId } from "@/types/cart";

/** All amounts are integer cents. The server recomputes everything at checkout; this is for display. */
export const FREE_SHIPPING_THRESHOLD = 35000;
export const MAX_LINE_QUANTITY = 10;

export const shippingMethods: Record<ShippingMethodId, ShippingMethod> = {
  standard: { id: "standard", label: "Standard", description: "2 to 4 business days", price: 499 },
  express: { id: "express", label: "Express", description: "1 to 2 business days", price: 1200 },
};

export const cartItemKey = (item: Pick<CartItem, "productId" | "variantId">) =>
  `${item.productId}:${item.variantId ?? "default"}`;

export const lineCap = (item: Pick<CartItem, "maxQuantity">) => Math.min(item.maxQuantity ?? MAX_LINE_QUANTITY, 99);

export function calculateTotals(
  items: CartItem[],
  promo: AppliedPromo | null,
  shippingMethod: ShippingMethodId,
): CartTotals {
  const selected = items.filter((i) => i.selected);
  const subtotal = selected.reduce((n, i) => n + i.price * i.quantity, 0);
  const itemCount = items.reduce((n, i) => n + i.quantity, 0);
  const selectedCount = selected.reduce((n, i) => n + i.quantity, 0);

  const promoBelowMinimum = !!promo?.minSubtotal && subtotal < promo.minSubtotal;
  const promoActive = !!promo && !promoBelowMinimum && selected.length > 0;

  let discount = 0;
  if (promoActive && promo.type === "percent") discount = Math.round((subtotal * promo.value) / 100);
  if (promoActive && promo.type === "fixed") discount = Math.min(promo.value, subtotal);

  const freeShippingEligible =
    subtotal >= FREE_SHIPPING_THRESHOLD || (promoActive && promo.type === "free_shipping");

  const method = shippingMethods[shippingMethod];
  const shipping =
    selected.length === 0 ? 0 : method.id === "standard" && freeShippingEligible ? 0 : method.price;

  return {
    itemCount,
    selectedCount,
    subtotal,
    discount,
    shipping,
    total: Math.max(0, subtotal - discount) + shipping,
    freeShippingEligible,
    amountToFreeShipping: Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal),
    promoBelowMinimum,
  };
}
