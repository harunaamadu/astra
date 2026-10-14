import { z } from "zod";

export const addToCartSchema = z.object({
  productId: z.string().min(1),
  variantId: z.string().min(1),
  quantity: z.number().int().min(1, "Choose at least 1").max(99),
});

export const promoSchema = z.object({
  code: z
    .string()
    .trim()
    .toUpperCase()
    .min(3, "Enter a promo code")
    .max(24, "That code is too long")
    .regex(/^[A-Z0-9-]+$/, "Promo codes use letters, numbers and dashes"),
});

export type AddToCartInput = z.infer<typeof addToCartSchema>;
export type PromoInput = z.infer<typeof promoSchema>;