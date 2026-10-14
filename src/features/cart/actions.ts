"use server";

import { findPromo } from "@/lib/cart/promos";
import { promoSchema } from "@/lib/validations/cart";
import { formatPrice } from "@/lib/utils";
import type { AppliedPromo } from "@/types/cart";

type Result = { ok: true; promo: AppliedPromo } | { ok: false; message: string };

/** Validates a code. The client sends its subtotal only for a friendlier message; checkout re-validates. */
export async function applyPromoCode(input: unknown, subtotal: number): Promise<Result> {
  const parsed = promoSchema.safeParse(input);
  if (!parsed.success) return { ok: false, message: parsed.error.issues[0].message };
  if (!Number.isFinite(subtotal) || subtotal < 0) return { ok: false, message: "Something went wrong. Try again." };

  const promo = findPromo(parsed.data.code);
  if (!promo) return { ok: false, message: "That code isn't valid or has expired" };
  if (promo.minSubtotal && subtotal < promo.minSubtotal) {
    return { ok: false, message: `Spend ${formatPrice(promo.minSubtotal)} or more to use ${promo.code}` };
  }
  return { ok: true, promo };
}
