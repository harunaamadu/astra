import type { AppliedPromo } from "@/types/cart";

/** SAMPLE codes. Move to a Prisma `PromoCode` table (usage limits, expiry) in step 6. */
const promos: Record<string, AppliedPromo> = {
  ASTRA10: { code: "ASTRA10", type: "percent", value: 10, label: "10% off" },
  WELCOME5: { code: "WELCOME5", type: "fixed", value: 500, minSubtotal: 2500, label: "$5 off" },
  FREESHIP: { code: "FREESHIP", type: "free_shipping", value: 0, label: "Free standard shipping" },
};

export function findPromo(code: string): AppliedPromo | null {
  return promos[code] ?? null;
}
