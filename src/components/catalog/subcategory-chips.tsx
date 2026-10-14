import Link from "next/link";
import type { NavLink } from "@/types";

export function SubcategoryChips({ links }: { links: NavLink[] }) {
  if (links.length === 0) return null;
  return (
    <nav aria-label="Subcategories" className="mt-4">
      <ul className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {links.map((l) => (
          <li key={l.href} className="shrink-0">
            <Link href={l.href} className="block rounded-full border px-4 py-1.5 text-sm transition-colors hover:bg-accent">{l.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
