import { Clock, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import type { ProductDetail } from "@/types/product";

export function DeliveryInfo({ shipping }: { shipping: ProductDetail["shipping"] }) {
  const rows = [
    { icon: Truck, text: `Free delivery on orders over ${formatPrice(shipping.freeOverCents)}` },
    { icon: Clock, text: `Arrives in ${shipping.estimate}` },
    { icon: RotateCcw, text: `${shipping.returnWindowDays}-day returns` },
    { icon: ShieldCheck, text: "Secure checkout" },
  ];
  return (
    <ul className="grid gap-2.5 rounded-xl bg-secondary/60 p-4 text-sm sm:grid-cols-2">
      {rows.map(({ icon: Icon, text }) => (
        <li key={text} className="flex items-center gap-2.5">
          <Icon className="size-4 shrink-0 text-muted-foreground" aria-hidden />
          {text}
        </li>
      ))}
    </ul>
  );
}