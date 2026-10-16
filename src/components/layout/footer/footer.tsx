import Link from "next/link";
import type { NavGroup, NavLink } from "@/types";
import { Logo } from "@/components/layout/header/logo";
import { BackToTop } from "./back-to-top";
import { PaymentMethods } from "./payment-methods";
import { CopyrightYear } from "./copyright-year";

export function Footer({ columns, legalLinks }: { columns: NavGroup[]; legalLinks: NavLink[] }) {
  return (
    <footer className="mt-10 border-t bg-secondary/30 pb-[calc(4rem+env(safe-area-inset-bottom))] md:pb-0">
      <BackToTop />

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-[1.2fr_repeat(4,1fr)]">
        <div className="col-span-full space-y-4 md:col-span-1">
          <Logo />
          <p className="max-w-xs text-sm text-muted-foreground">
            A marketplace for everyday essentials and standout finds from trusted sellers.
          </p>
          <PaymentMethods />
        </div>

        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h2 className="mb-3 text-sm font-semibold">{col.title}</h2>
            <ul className="space-y-2">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-muted-foreground hover:text-foreground hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>&copy; <CopyrightYear /> Astra. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {legalLinks.map((l) => (
              <li key={l.href}><Link href={l.href} className="hover:text-foreground hover:underline">{l.label}</Link></li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
