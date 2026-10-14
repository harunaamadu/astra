import Link from "next/link";
import { AppIcon } from "@/lib/constants/icons";
import type { Shortcut } from "@/types";

/** Paid placement slot for sellers (business model stream 2). Always disclosed. */
export function SponsoredStrip({ items }: { items: Shortcut[] }) {
  return (
    <section aria-label="Sponsored deals" className="mx-auto max-w-7xl px-4 py-6">
      <div className="rounded-xl bg-secondary/70 p-3">
        <p className="mb-2 px-2 text-xs text-muted-foreground">Sponsored</p>
        <ul className="flex gap-2 overflow-x-auto snap-x [scrollbar-width:none] md:grid md:grid-cols-4 md:overflow-visible">
          {items.map((item) => (
            <li key={item.id} className="min-w-52 snap-start md:min-w-0">
              <Link href={item.href} className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-background">
                <AppIcon name={item.icon} className="size-8 text-muted-foreground" strokeWidth={1.25} aria-hidden />
                <span className="text-sm leading-tight">
                  <span className="block font-medium">{item.label}</span>
                  <span className="text-xs text-muted-foreground">{item.note}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
