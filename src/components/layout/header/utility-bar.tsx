import Link from "next/link";
import { ChevronDown, MapPin } from "lucide-react";
import { utilityLinks } from "@/lib/constants/navigation";

export function UtilityBar() {
  return (
    <div className="hidden border-b bg-secondary/60 text-xs text-muted-foreground md:block">
      <div className="mx-auto flex h-8 max-w-7xl items-center justify-between px-4">
        <button type="button" className="inline-flex items-center gap-1 hover:text-foreground">
          <MapPin className="size-3.5" aria-hidden />
          Choose your location
          <ChevronDown className="size-3" aria-hidden />
        </button>
        <nav aria-label="Utility" className="flex items-center gap-5">
          <button type="button" className="inline-flex items-center gap-1 hover:text-foreground">
            EN / USD <ChevronDown className="size-3" aria-hidden />
          </button>
          {utilityLinks.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-foreground">
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
