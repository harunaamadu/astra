import Link from "next/link";
import { AppIcon } from "@/lib/constants/icons";
import type { Shortcut } from "@/types";

type Props = { items: Shortcut[]; userName?: string | null };

/** Greeting plus shortcuts. Guests get a sign-in prompt; signed-in users (step 7) get their name. */
export function PersonalOffers({ items, userName }: Props) {
  return (
    <section aria-label="Quick links" className="mx-auto max-w-7xl px-4 pt-6">
      <div className="flex items-center gap-4 overflow-x-auto rounded-xl bg-secondary/70 p-3 [scrollbar-width:none] md:gap-6 md:p-4">
        <div className="flex shrink-0 items-center gap-3 pr-2 md:pr-6">
          <span aria-hidden className="grid size-11 place-items-center rounded-full bg-primary font-display text-lg font-bold text-primary-foreground">
            {userName ? userName[0].toUpperCase() : "A"}
          </span>
          <p className="text-sm leading-tight">
            {userName ? (
              <>Hi, {userName}<br /><span className="text-muted-foreground">Picked for you</span></>
            ) : (
              <>Welcome to Astra<br />
                <Link href="/sign-in" className="text-muted-foreground underline-offset-4 hover:underline">Sign in for personal offers</Link>
              </>
            )}
          </p>
        </div>
        <ul className="flex flex-1 gap-2">
          {items.map((item) => (
            <li key={item.id} className="shrink-0">
              <Link href={item.href} className="flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-background">
                <AppIcon name={item.icon} className="size-6 text-muted-foreground" strokeWidth={1.5} aria-hidden />
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
