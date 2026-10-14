import Link from "next/link";
import { subNavLinks } from "@/lib/constants/navigation";
import { MegaMenu } from "./mega-menu";

export function SubNav() {
  return (
    <div className="hidden border-t lg:block">
      <nav aria-label="Browse" className="mx-auto flex h-11 max-w-7xl items-center gap-1 px-4">
        <MegaMenu />
        {subNavLinks.map((l) => (
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
