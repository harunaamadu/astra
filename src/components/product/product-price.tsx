import { formatPrice } from "@/lib/utils";

export function ProductPrice({ price, compareAtPrice }: { price: number; compareAtPrice?: number }) {
  const save = compareAtPrice && compareAtPrice > price ? Math.round((1 - price / compareAtPrice) * 100) : 0;
  return (
    <p className="flex flex-wrap items-baseline gap-x-2">
      <span className="text-lg font-semibold">{formatPrice(price)}</span>
      {save > 0 && (
        <>
          <span className="text-sm text-muted-foreground line-through">
            <span className="sr-only">Was </span>
            {formatPrice(compareAtPrice!)}
          </span>
          <span className="text-xs font-medium text-destructive">Save {save}%</span>
        </>
      )}
    </p>
  );
}
