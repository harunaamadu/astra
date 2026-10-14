import Link from "next/link";
import { BadgeCheck, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ProductReview, ReviewSummary } from "@/types/product";

function Stars({ value, className }: { value: number; className?: string }) {
  return (
    <span className={cn("flex", className)} aria-hidden>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className={i < Math.round(value) ? "size-4 fill-primary text-primary" : "size-4 text-border"} />
      ))}
    </span>
  );
}

const fmt = new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeZone: "UTC" });

type Props = { summary: ReviewSummary; items: ProductReview[]; slug: string };

export function ProductReviews({ summary, items, slug }: Props) {
  return (
    <div className="grid gap-10 md:grid-cols-[18rem_1fr]">
      <div>
        <p className="font-display text-5xl font-bold">{summary.average.toFixed(1)}</p>
        <Stars value={summary.average} className="mt-2" />
        <p className="sr-only">{summary.average.toFixed(1)} out of 5 stars</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Based on {new Intl.NumberFormat("en-US").format(summary.count)} reviews
        </p>

        <ul className="mt-5 space-y-2" aria-label="Rating breakdown">
          {([5, 4, 3, 2, 1] as const).map((star) => (
            <li key={star} className="flex items-center gap-3 text-sm">
              <span className="w-12 shrink-0 text-muted-foreground">{star} star{star > 1 ? "s" : ""}</span>
              <span className="h-2 flex-1 overflow-hidden rounded-full bg-muted" aria-hidden>
                <span className="block h-full rounded-full bg-primary" style={{ width: `${summary.breakdown[star]}%` }} />
              </span>
              <span className="w-9 shrink-0 text-right tabular-nums text-muted-foreground">{summary.breakdown[star]}%</span>
            </li>
          ))}
        </ul>

        <Button asChild variant="outline" className="mt-6 w-full">
          <Link href={`/sign-in?next=/p/${slug}`}>Write a review</Link>
        </Button>
      </div>

      <ul className="divide-y">
        {items.map((r) => (
          <li key={r.id} className="py-5 first:pt-0">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <Stars value={r.rating} />
              <span className="sr-only">{r.rating} out of 5 stars</span>
              <h3 className="font-medium">{r.title}</h3>
            </div>
            <p className="mt-1 flex flex-wrap items-center gap-x-2 text-xs text-muted-foreground">
              <span>{r.author}</span>
              <span aria-hidden>·</span>
              <time dateTime={r.date}>{fmt.format(new Date(r.date))}</time>
              {r.verified && (
                <span className="flex items-center gap-1"><BadgeCheck className="size-3.5" aria-hidden /> Verified purchase</span>
              )}
            </p>
            <p className="mt-3 text-sm">{r.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
