import Link from "next/link";
import type { Department, NavLink } from "@/types";
import { MegaMenu } from "./mega-menu";

export function SubNav({ departments, links }: { departments: Department[]; links: NavLink[] }) {
  return (
    <div className="hidden border-t lg:block">
      <nav aria-label="Browse" className="mx-auto flex h-11 max-w-7xl items-center gap-1 px-4">
        <MegaMenu departments={departments} />
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
