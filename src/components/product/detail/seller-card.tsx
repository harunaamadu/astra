import Link from "next/link";
import { BadgeCheck, Star } from "lucide-react";
import type { ProductSeller } from "@/types/product";

export function SellerCard({ seller }: { seller: ProductSeller }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border p-4">
      <div className="flex items-center gap-3">
        <span aria-hidden className="grid size-10 place-items-center rounded-full bg-primary font-display font-bold text-primary-foreground">
          {seller.name[0]}
        </span>
        <div className="text-sm">
          <p className="text-muted-foreground">Sold by</p>
          <Link href={`/s/${seller.id}`} className="font-medium hover:underline">{seller.name}</Link>
        </div>
      </div>
      <div className="text-right text-xs text-muted-foreground">
        <p className="flex items-center justify-end gap-1">
          <Star className="size-3.5 fill-primary text-primary" aria-hidden />
          <span>{seller.rating.toFixed(1)} seller rating</span>
        </p>
        {seller.fulfilledByAstra && (
          <p className="mt-1 flex items-center justify-end gap-1">
            <BadgeCheck className="size-3.5" aria-hidden /> Fulfilled by Astra
          </p>
        )}
      </div>
    </div>
  );
}
