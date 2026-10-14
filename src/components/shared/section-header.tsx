import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = { id: string; title: string; href?: string; linkLabel?: string; className?: string };

export function SectionHeader({ id, title, href, linkLabel = "See more", className }: Props) {
  return (
    <div className={cn("mb-4 flex items-baseline justify-between gap-4", className)}>
      <h2 id={id} className="text-xl font-semibold md:text-2xl">{title}</h2>
      {href && (
        <Link href={href} className="shrink-0 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
          {linkLabel}
        </Link>
      )}
    </div>
  );
}
