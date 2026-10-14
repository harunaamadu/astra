"use client";

import { useState, useTransition } from "react";
import { Tag, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { applyPromoCode } from "@/features/cart/actions";
import { promoSchema } from "@/lib/validations/cart";
import { useCartStore } from "@/store/cart-store";
import type { AppliedPromo } from "@/types/cart";
import { Input } from "../ui/input";

type Props = { subtotal: number; promo: AppliedPromo | null };

export function PromoCodeForm({ subtotal, promo }: Props) {
  const apply = useCartStore((s) => s.applyPromo);
  const remove = useCartStore((s) => s.removePromo);
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();

  if (promo) {
    return (
      <div className="flex items-center justify-between gap-3 rounded-lg bg-primary/15 px-3 py-2 text-sm">
        <span className="flex items-center gap-2">
          <Tag className="size-4" aria-hidden />
          <span><span className="font-medium">{promo.code}</span> <span className="text-muted-foreground">{promo.label}</span></span>
        </span>
        <button type="button" onClick={() => { remove(); toast("Promo code removed"); }} aria-label={`Remove promo code ${promo.code}`}>
          <X className="size-4" aria-hidden />
        </button>
      </div>
    );
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = promoSchema.safeParse({ code });
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }
    setError(null);
    start(async () => {
      const res = await applyPromoCode(parsed.data, subtotal);
      if (res.ok) {
        apply(res.promo);
        setCode("");
        toast.success(`${res.promo.code} applied`);
      } else {
        setError(res.message);
      }
    });
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <label htmlFor="promo-code" className="mb-1.5 block text-sm font-medium">Promo code</label>
      <div className="flex gap-2">
        <Input
          id="promo-code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          autoComplete="off"
          autoCapitalize="characters"
          aria-invalid={!!error}
          aria-describedby={error ? "promo-error" : undefined}
          placeholder="Enter code"
          className="h-9 min-w-0 flex-1 rounded-lg border bg-background px-3 text-sm uppercase outline-none placeholder:normal-case placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary"
        />
        <Button type="submit" size="lg" variant="outline" disabled={pending}>{pending ? "Checking" : "Apply"}</Button>
      </div>
      {error && <p id="promo-error" role="alert" className="mt-1.5 text-sm text-destructive">{error}</p>}
    </form>
  );
}
