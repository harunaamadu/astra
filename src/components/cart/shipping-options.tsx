"use client";

import { shippingMethods } from "@/lib/cart/pricing";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils";
import type { ShippingMethodId } from "@/types/cart";

type Props = { value: ShippingMethodId; freeStandard: boolean };

export function ShippingOptions({ value, freeStandard }: Props) {
  const setMethod = useCartStore((s) => s.setShippingMethod);

  return (
    <fieldset>
      <legend className="mb-1.5 text-sm font-medium">Delivery</legend>
      <div className="space-y-2">
        {Object.values(shippingMethods).map((m) => {
          const free = m.id === "standard" && freeStandard;
          return (
            <label key={m.id} className="block cursor-pointer">
              <input type="radio" name="shipping" value={m.id} checked={value === m.id} onChange={() => setMethod(m.id)} className="peer sr-only" />
              <span className="flex items-center justify-between gap-3 rounded-lg border px-3 py-2.5 text-sm transition-colors hover:bg-accent peer-checked:border-foreground peer-checked:bg-accent peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2">
                <span>
                  <span className="block font-medium">{m.label}</span>
                  <span className="text-xs text-muted-foreground">{m.description}</span>
                </span>
                <span className="font-medium tabular-nums">{free ? "Free" : formatPrice(m.price)}</span>
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
