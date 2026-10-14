"use server";

import { calculateTotals } from "@/lib/cart/pricing";
import { findPromo } from "@/lib/cart/promos";
import { getSession } from "@/lib/auth/session";
import { getProductBySlug } from "@/lib/data/products";
import { createOrder } from "@/lib/data/orders";
import { getPaymentProvider } from "@/lib/payments";
import { checkoutSchema } from "@/lib/validations/checkout";
import type { CartItem } from "@/types";
import type { OrderItem } from "@/types/order";

type Result =
  | { ok: true; orderId: string }
  | { ok: false; message: string; fieldErrors?: Record<string, string> };

export async function placeOrder(input: unknown): Promise<Result> {
  const parsed = checkoutSchema.safeParse(input);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path.filter((p) => typeof p !== "number").join(".");
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { ok: false, message: "Please check the highlighted fields.", fieldErrors };
  }
  const data = parsed.data;

  // Rebuild every line from trusted data. The browser's cart can be edited by anyone.
  const lines: CartItem[] = [];
  for (const item of data.items) {
    const product = await getProductBySlug(item.slug);
    if (!product) return { ok: false, message: "An item in your cart is no longer available." };
    const variant = product.variants.find((v) => v.id === (item.variantId ?? product.variants[0].id));
    if (!variant) return { ok: false, message: `${product.title} is no longer available in that option.` };
    if (variant.stock < item.quantity) {
      return { ok: false, message: `Only ${Math.max(variant.stock, 0)} of ${product.title} left in stock.` };
    }
    lines.push({
      productId: product.id,
      variantId: variant.id,
      variantLabel: product.variants.length > 1 ? variant.label : undefined,
      vendorId: product.vendorId,
      slug: product.slug,
      title: product.title,
      image: product.image ?? "",
      icon: product.icon,
      price: variant.price ?? product.price,
      quantity: item.quantity,
      selected: true,
      gift: item.gift,
    });
  }

  const promo = data.promoCode ? findPromo(data.promoCode) : null;
  const totals = calculateTotals(lines, promo, data.shippingMethod);

  const session = await getSession();
  const reference = `pay_${crypto.randomUUID()}`;
  const payment = await getPaymentProvider(data.address.country).charge({
    amount: totals.total,
    currency: "USD",
    method: data.paymentMethod,
    email: data.email,
    reference,
  });
  if (payment.status !== "succeeded") {
    return { ok: false, message: payment.message ?? "Your payment could not be completed. Try another method." };
  }

  const items: OrderItem[] = lines.map(({ selected: _s, maxQuantity: _m, ...rest }) => rest);
  const order = await createOrder({
    userId: session?.userId ?? "guest",
    email: data.email,
    items,
    address: data.address,
    shippingMethod: data.shippingMethod,
    paymentMethod: data.paymentMethod,
    promoCode: promo && !totals.promoBelowMinimum ? promo.code : undefined,
    totals: { subtotal: totals.subtotal, discount: totals.discount, shipping: totals.shipping, total: totals.total },
  });

  return { ok: true, orderId: order.id };
}