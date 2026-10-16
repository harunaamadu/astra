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
        <filter id="filter">
          <feSpecularLighting
            result="specOut"
            specularExponent={20}
            lightingColor="#bbbbbb"
          >
            <fePointLight x={50} y={75} z={200} />
          </feSpecularLighting>
          <feComposite
            in="SourceGraphic"
            in2="specOut"
            operator="arithmetic"
            k1={0}
            k2={1}
            k3={1}
            k4={0}
          />
        </filter>

        <rect
          width={32}
          height={32}
          rx={6}
          className="fill-primary"
          filter="url(#filter)"
        />

        <text
          x="81%"
          y="54%"
          systemLanguage="en-us"
          dominantBaseline="middle"
          textAnchor="middle"
          className="fill-primary-foreground font-bold font-heading text-3xl"
        >
          a
        </text>

        <text
          x="81%"
          y="54%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-primary-foreground font-bold font-heading text-3xl"
          systemLanguage="ar"
        >
          ا
        </text>
      </svg>

      <span className="font-heading text-2xl font-bold tracking-tight">
        astra
      </span>
    </Link>
  );
}
