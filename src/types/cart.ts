export type ShippingMethodId = "standard" | "express";

export type ShippingMethod = {
  id: ShippingMethodId;
  label: string;
  description: string;
  /** minor units (cents) */
  price: number;
};

export type AppliedPromo = {
  code: string;
  type: "percent" | "fixed" | "free_shipping";
  /** percent (10 = 10%) or cents for "fixed"; unused for free_shipping */
  value: number;
  /** minor units (cents) */
  minSubtotal?: number;
  label: string;
};

export type CartTotals = {
  /** units across all lines */
  itemCount: number;
  /** units across selected lines */
  selectedCount: number;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  freeShippingEligible: boolean;
  amountToFreeShipping: number;
  promoBelowMinimum: boolean;
};
