import Link from "next/link";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn, formatPrice } from "@/lib/utils";
import type { Plan } from "@/types/content";

export function PricingCards({ plans }: { plans: Plan[] }) {
  return (
    <ul className="grid gap-5 md:grid-cols-2">
      {plans.map((p) => (
        <li key={p.id} className={cn("flex flex-col rounded-2xl border p-6", p.highlighted && "border-primary ring-2 ring-primary/40")}>
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-lg font-semibold">{p.name}</h3>
            {p.badge && <Badge>{p.badge}</Badge>}
          </div>
          <p className="mt-3 flex items-baseline gap-1">
            <span className="font-display text-4xl font-bold">{p.price === 0 ? "Free" : formatPrice(p.price).replace(".00", "")}</span>
            {p.period && <span className="text-muted-foreground">/ {p.period}</span>}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{p.description}</p>
          <ul className="mt-5 flex-1 space-y-2.5">
            {p.features.map((f) => (
              <li key={f} className="flex gap-2.5 text-sm">
                <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                {f}
              </li>
            ))}
          </ul>
          <Button asChild size="lg" variant={p.highlighted ? "default" : "outline"} className="mt-6">
            <Link href={p.cta.href}>{p.cta.label}</Link>
          </Button>
        </li>
      ))}
    </ul>
  );
}
