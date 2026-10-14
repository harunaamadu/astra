import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Astra home"
      className={cn("group inline-flex items-center gap-1.25", className)}
    >
      <svg viewBox="0 0 32 32" className="size-8 relative" aria-hidden="true">
        <rect width="32" height="32" rx="9" className="fill-primary" />

        <text
          x="50%"
          y="54%"
          dominantBaseline="middle"
          textAnchor="middle"
          className="fill-primary-foreground font-bold font-heading text-lg"
        >
          A
        </text>
      </svg>

      <span className="font-heading text-2xl font-bold tracking-tight">
        astra
      </span>
    </Link>
  );
}
