import Link from "next/link";
import { SearchX } from "lucide-react";
import { popularSearches } from "@/lib/constants/navigation";

export function SearchEmpty({ q }: { q?: string }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed px-6 py-16 text-center">
      <span className="grid size-14 place-items-center rounded-full bg-secondary">
        <SearchX className="size-6 text-muted-foreground" strokeWidth={1.5} aria-hidden />
      </span>
      <h2 className="mt-4 text-lg font-semibold">{q ? `No results for "${q}"` : "Search Astra"}</h2>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">
        {q ? "Check the spelling, try fewer words, or search for a more general term." : "Find products, brands and categories."}
      </p>
      <p className="mb-2 mt-6 text-sm font-medium">Popular searches</p>
      <ul className="flex flex-wrap justify-center gap-2">
        {popularSearches.map((s) => (
          <li key={s}>
            <Link href={`/search?q=${encodeURIComponent(s)}`} className="block rounded-full border px-3.5 py-1.5 text-sm transition-colors hover:bg-accent">{s}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
