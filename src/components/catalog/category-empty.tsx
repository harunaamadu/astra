import Link from "next/link";
import { PackageSearch } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = { clearHref: string; filtered: boolean; title?: string; message?: string };

export function CategoryEmpty({ clearHref, filtered, title, message }: Props) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed px-6 py-16 text-center">
      <span className="grid size-14 place-items-center rounded-full bg-secondary">
        <PackageSearch className="size-6 text-muted-foreground" strokeWidth={1.5} aria-hidden />
      </span>
      <h2 className="mt-4 text-lg font-semibold">
        {filtered ? "No products match those filters" : (title ?? "Nothing here yet")}
      </h2>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">
        {filtered
          ? "Try removing a filter or widening the price range."
          : (message ?? "Sellers are still adding products here. Check back soon or browse another department.")}
      </p>
      <div className="mt-5 flex gap-3">
        {filtered && <Button asChild><Link href={clearHref}>Clear filters</Link></Button>}
        <Button asChild variant="outline"><Link href="/c">All departments</Link></Button>
      </div>
    </div>
  );
}