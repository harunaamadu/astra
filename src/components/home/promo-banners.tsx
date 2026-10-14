import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AppIcon } from "@/lib/constants/icons";
import { cn } from "@/lib/utils";
import type { PromoBanner } from "@/types";

export function PromoBanners({ banners }: { banners: PromoBanner[] }) {
  return (
    <section aria-label="Promotions" className="mx-auto grid max-w-7xl gap-4 px-4 py-6 md:grid-cols-2 md:py-8">
      {banners.map((b) => (
        <div
          key={b.id}
          className={cn(
            "relative flex min-h-44 items-center overflow-hidden rounded-2xl p-6 md:p-8",
            b.tone === "primary" ? "bg-primary/20" : "bg-secondary",
          )}
        >
          <div className="relative z-10 max-w-[70%]">
            <h2 className="text-xl font-semibold md:text-2xl">{b.title}</h2>
            <p className="mt-1.5 text-sm text-muted-foreground">{b.body}</p>
            <Button asChild variant="outline" size="sm" className="mt-4 bg-background">
              <Link href={b.cta.href}>{b.cta.label}</Link>
            </Button>
          </div>
          <AppIcon
            name={b.icon}
            aria-hidden
            strokeWidth={1}
            className="absolute -right-4 top-1/2 size-40 -translate-y-1/2 text-foreground/10 md:right-6 md:size-48"
          />
        </div>
      ))}
    </section>
  );
}
