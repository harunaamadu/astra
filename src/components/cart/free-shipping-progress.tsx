import { FREE_SHIPPING_THRESHOLD } from "@/lib/cart/pricing";
import { formatPrice } from "@/lib/utils";

type Props = { subtotal: number; promoFreeShipping?: boolean };

export function FreeShippingProgress({ subtotal, promoFreeShipping }: Props) {
  const unlocked = promoFreeShipping || subtotal >= FREE_SHIPPING_THRESHOLD;
  const pct = unlocked ? 100 : Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const remaining = FREE_SHIPPING_THRESHOLD - subtotal;

  return (
    <div>
      <p className="text-sm">
        {unlocked ? (
          <span className="font-medium">You&apos;ve unlocked free standard delivery</span>
        ) : (
          <>Add <span className="font-medium">{formatPrice(remaining)}</span> more for free standard delivery</>
        )}
      </p>
      <div
        role="progressbar"
        aria-label="Progress toward free delivery"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct}
        className="mt-2 h-2 overflow-hidden rounded-full bg-muted"
      >
        <div className="h-full rounded-full bg-primary transition-[width] duration-300" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
