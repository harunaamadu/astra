import { z } from "zod";

export const addressSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name").max(80),
  phone: z.string().trim().regex(/^\+?[\d\s().-]{7,20}$/, "Enter a valid phone number"),
  line1: z.string().trim().min(3, "Enter your street address").max(120),
  line2: z.string().trim().max(120).optional(),
  city: z.string().trim().min(2, "Enter your city").max(60),
  region: z.string().trim().min(2, "Enter your region or state").max(60),
  postalCode: z.string().trim().max(12).optional(),
  country: z.string().trim().length(2, "Choose a country"),
});

export const checkoutSchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email address").max(254),
  address: addressSchema,
  shippingMethod: z.enum(["standard", "express"]),
  paymentMethod: z.enum(["card", "mobile-money", "paypal"]),
  promoCode: z.string().trim().toUpperCase().max(24).optional(),
  // Only identifiers and quantities. Prices are never accepted from the client.
  items: z
    .array(
      z.object({
        slug: z.string().min(1).max(200),
        variantId: z.string().max(60).optional(),
        quantity: z.number().int().min(1).max(99),
        gift: z.boolean().optional(),
      }),
    )
    .min(1, "Your cart is empty")
    .max(50),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;