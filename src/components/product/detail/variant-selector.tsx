"use client";

import { cn } from "@/lib/utils";
import type { ProductVariant } from "@/types/product";

type Props = {
  label: string;
  variants: ProductVariant[];
  value: string;
  onChange: (id: string) => void;
};

/** Native radio inputs under the hood, so arrow-key navigation and screen readers work. */
export function VariantSelector({ label, variants, value, onChange }: Props) {
  const selected = variants.find((v) => v.id === value);

  return (
    <fieldset>
      <legend className="mb-2 text-sm">
        <span className="font-medium">{label}:</span>{" "}
        <span className="text-muted-foreground">{selected?.label}</span>
      </legend>
      <div className="flex flex-wrap gap-2">
        {variants.map((v) => {
          const out = v.stock <= 0;
          return (
            <label key={v.id} className="cursor-pointer">
              <input
                type="radio"
                name="variant"
                value={v.id}
                checked={v.id === value}
                onChange={() => onChange(v.id)}
                className="peer sr-only"
              />
              {v.swatch ? (
                <span className="grid size-10 place-items-center rounded-full border-2 border-transparent peer-checked:border-foreground peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2">
                  <span className={cn("size-7 rounded-full border border-border", out && "opacity-40")} style={{ backgroundColor: v.swatch }} />
                  <span className="sr-only">{v.label}{out ? ", out of stock" : ""}</span>
                </span>
              ) : (
                <span
                  className={cn(
                    "flex min-w-14 items-center justify-center rounded-lg border px-3 py-2 text-sm transition-colors",
                    "hover:bg-accent peer-checked:border-foreground peer-checked:bg-accent peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2",
                    out && "text-muted-foreground line-through",
                  )}
                >
                  {v.label}
                  {out && <span className="sr-only">, out of stock</span>}
                </span>
              )}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
