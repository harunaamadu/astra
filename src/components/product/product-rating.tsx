import { Star } from "lucide-react";

export function ProductRating({ rating, reviewCount }: { rating: number; reviewCount: number }) {
  const filled = Math.round(rating);
  return (
    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
      <span className="flex" aria-hidden>
        {Array.from({ length: 5 }, (_, i) => (
          <Star key={i} className={i < filled ? "size-3.5 fill-primary text-primary" : "size-3.5 text-border"} />
        ))}
      </span>
      <span className="sr-only">{rating.toFixed(1)} out of 5 stars, </span>
      <span>{new Intl.NumberFormat("en-US").format(reviewCount)} reviews</span>
    </div>
  );
}
