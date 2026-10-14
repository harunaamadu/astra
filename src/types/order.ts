import type { IconKey } from "@/types";
import type { ShippingMethodId } from "@/types/cart";

export type OrderStatus = "processing" | "shipped" | "delivered" | "cancelled";
export type PaymentMethod = "card" | "mobile-money" | "paypal";

export type Address = {
  fullName: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  region: string;
  postalCode?: string;
  /** ISO 3166-1 alpha-2 */
  country: string;
};

export type OrderItem = {
  productId: string;
  variantId?: string;
  variantLabel?: string;
  vendorId: string;
  slug: string;
  title: string;
  image: string;
  icon?: IconKey;
  /** minor units (cents), as charged */
  price: number;
  quantity: number;
  gift?: boolean;
};

export type Order = {
  id: string;
  userId: string;
  /** ISO timestamp */
  createdAt: string;
  status: OrderStatus;
  email: string;
  items: OrderItem[];
  address: Address;
  shippingMethod: ShippingMethodId;
  paymentMethod: PaymentMethod;
  promoCode?: string;
  totals: { subtotal: number; discount: number; shipping: number; total: number };
};