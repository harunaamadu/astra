import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { buildQueryString } from "@/lib/catalog/query";
import { cn } from "@/lib/utils";
import type { FilterQuery } from "@/types/catalog";

type Props = { basePath: string; query: FilterQuery; page: number; pageCount: number; fixed?: Record<string, string> };

function pageList(page: number, last: number): (number | "gap")[] {
  const wanted = [...new Set([1, page - 1, page, page + 1, last])].filter((n) => n >= 1 && n <= last).sort((a, b) => a - b);
  const out: (number | "gap")[] = [];
  wanted.forEach((n, i) => {
    if (i > 0 && n - wanted[i - 1] > 1) out.push("gap");
    out.push(n);
  });
  return out;
}

const cell = "grid h-9 min-w-9 place-items-center rounded-md px-2 text-sm transition-colors";

/** Plain links, so pages are crawlable, shareable and work without JavaScript. */
export function Pagination({ basePath, query, page, pageCount, fixed }: Props) {
  if (pageCount <= 1) return null;
  const href = (n: number) => `${basePath}${buildQueryString(query, { page: n }, fixed)}`;

  return (
    <nav aria-label="Pagination" className="mt-10 flex flex-wrap items-center justify-center gap-1">
      {page > 1 ? (
        <Link href={href(page - 1)} rel="prev" className={cn(cell, "gap-1 hover:bg-accent")}>
          <ChevronLeft className="size-4" aria-hidden /><span className="sr-only sm:not-sr-only">Previous</span>
        </Link>
      ) : (
        <span aria-hidden className={cn(cell, "gap-1 text-muted-foreground/50")}><ChevronLeft className="size-4" /></span>
      )}

      {pageList(page, pageCount).map((n, i) =>
        n === "gap" ? (
          <span key={`gap-${i}`} aria-hidden className={cn(cell, "text-muted-foreground")}>&hellip;</span>
        ) : (
          <Link
            key={n}
            href={href(n)}
            aria-label={`Page ${n}`}
            aria-current={n === page ? "page" : undefined}
            className={cn(cell, n === page ? "bg-primary font-medium text-primary-foreground" : "hover:bg-accent")}
          >
            {n}
          </Link>
        ),
      )}

      {page < pageCount ? (
        <Link href={href(page + 1)} rel="next" className={cn(cell, "flex items-center gap-1 hover:bg-accent")}>
          <span className="sr-only sm:not-sr-only">Next</span><ChevronRight className="size-4" aria-hidden />
        </Link>
      ) : (
        <span aria-hidden className={cn(cell, "gap-1 text-muted-foreground/50")}><ChevronRight className="size-4" /></span>
      )}
    </nav>
  );
}