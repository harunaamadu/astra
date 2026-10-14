import type { PaymentMethod } from "@/types/order";

export type ChargeInput = {
  /** minor units (cents) */
  amount: number;
  currency: string;
  method: PaymentMethod;
  email: string;
  reference: string;
};

export type ChargeResult = { status: "succeeded" | "failed"; reference: string; message?: string };

export interface PaymentProvider {
  name: string;
  charge(input: ChargeInput): Promise<ChargeResult>;
}

/**
 * MOCK provider: approves everything so the checkout flow can be exercised.
 *
 * Step 7: implement this interface for Paystack (Ghana, Nigeria, Kenya, South Africa; cards and mobile
 * money) and Stripe (elsewhere), and pick one in getPaymentProvider() by country and method.
 * Real providers confirm asynchronously: create a pending order, redirect or collect payment with the
 * provider's hosted fields (so card numbers never touch Astra servers), and mark the order paid in a
 * signed webhook handler.
 */
const mock: PaymentProvider = {
  name: "mock",
  async charge({ reference }) {
    return { status: "succeeded", reference };
  },
};

export function getPaymentProvider(_country?: string): PaymentProvider {
  return mock;
}