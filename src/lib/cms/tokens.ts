import { FREE_SHIPPING_THRESHOLD, shippingMethods } from "@/lib/cart/pricing";
import { PLUS_RETURN_WINDOW_DAYS, RETURN_WINDOW_DAYS } from "@/lib/constants/policies";
import { formatPrice } from "@/lib/utils";

const std = shippingMethods.standard;
const exp = shippingMethods.express;

/**
 * Editors write {{token}} in Sanity text wherever a number or rate appears. The values come from
 * the same constants the cart and checkout use, so help and legal copy can never disagree with
 * what a customer is actually charged, and editors never type a price.
 */
export const contentTokens: Record<string, string> = {
  returnWindowDays: String(RETURN_WINDOW_DAYS),
  plusReturnWindowDays: String(PLUS_RETURN_WINDOW_DAYS),
  freeShippingThreshold: formatPrice(FREE_SHIPPING_THRESHOLD),
  standardShippingLabel: std.label,
  standardShippingDescription: std.description,
  standardShippingPrice: formatPrice(std.price),
  expressShippingLabel: exp.label,
  expressShippingDescription: exp.description,
  expressShippingPrice: formatPrice(exp.price),
};

/** Replaces known tokens everywhere in a value (strings, arrays, nested objects). Unknown tokens stay visible. */
export function fillTokens<T>(value: T): T {
  if (typeof value === "string") {
    return value.replace(/\{\{\s*(\w+)\s*\}\}/g, (match, key: string) => contentTokens[key] ?? match) as T;
  }
  if (Array.isArray(value)) return value.map(fillTokens) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, fillTokens(v)])) as T;
  }
  return value;
}
