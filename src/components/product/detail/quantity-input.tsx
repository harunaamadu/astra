"use client";

import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = { value: number; onChange: (value: number) => void; max: number; disabled?: boolean };

export function QuantityInput({ value, onChange, max, disabled }: Props) {
  return (
    <div role="group" aria-label="Quantity" className="inline-flex items-center rounded-lg border">
      <Button type="button" variant="ghost" size="icon" aria-label="Decrease quantity" disabled={disabled || value <= 1} onClick={() => onChange(value - 1)}>
        <Minus className="size-4" aria-hidden />
      </Button>
      <output aria-live="polite" className="w-10 text-center text-sm font-medium tabular-nums">{value}</output>
      <Button type="button" variant="ghost" size="icon" aria-label="Increase quantity" disabled={disabled || value >= max} onClick={() => onChange(value + 1)}>
        <Plus className="size-4" aria-hidden />
      </Button>
    </div>
  );
}
