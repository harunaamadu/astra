"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Field, SelectField } from "@/components/shared/form-field";
import { ShippingOptions } from "@/components/cart/shipping-options";
import { useCart } from "@/hooks/use-cart";
import { useCartStore } from "@/store/cart-store";
import { placeOrder } from "@/features/checkout/actions";
import { checkoutSchema } from "@/lib/validations/checkout";
import { cartItemKey } from "@/lib/cart/pricing";
import { countries } from "@/lib/constants/countries";
import type { PaymentMethod } from "@/types/order";
import { CheckoutSummary } from "./checkout-summary";
import { PaymentMethodPicker } from "./payment-method-picker";

type Values = {
  email: string; fullName: string; phone: string; line1: string; line2: string;
  city: string; region: string; postalCode: string; country: string;
};

const errKey = (name: keyof Values) => (name === "email" ? "email" : `address.${name}`);
const fieldId = (name: keyof Values) => `f-${errKey(name).replace(".", "-")}`;

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={`step-${n}`} className="rounded-2xl border p-5 md:p-6">
      <h2 id={`step-${n}`} className="mb-4 flex items-center gap-3 text-lg font-semibold">
        <span aria-hidden className="grid size-7 place-items-center rounded-full bg-primary text-sm text-primary-foreground">{n}</span>
        {title}
      </h2>
      {children}
    </section>
  );
}

export function CheckoutForm({ defaults }: { defaults: { email: string; fullName: string } }) {
  const router = useRouter();
  const { ready, items, promo, shippingMethod, totals } = useCart();
  const removeItem = useCartStore((s) => s.remove);
  const removePromo = useCartStore((s) => s.removePromo);
  const [pending, start] = useTransition();
  const [placed, setPlaced] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [payment, setPayment] = useState<PaymentMethod>("card");
  const [values, setValues] = useState<Values>({
    email: defaults.email, fullName: defaults.fullName, phone: "", line1: "", line2: "",
    city: "", region: "", postalCode: "", country: "US",
  });

  const selected = items.filter((i) => i.selected);

  if (!ready) return <div role="status" aria-label="Loading checkout" className="h-96 animate-pulse rounded-2xl bg-muted" />;
  if (placed) return <p role="status" className="py-24 text-center text-muted-foreground">Placing your order...</p>;
  if (selected.length === 0) {
    return (
      <div className="mx-auto max-w-md py-16 text-center">
        <h2 className="text-xl font-semibold">Nothing to check out</h2>
        <p className="mt-1.5 text-sm text-muted-foreground">Select at least one item in your cart first.</p>
        <Button asChild className="mt-5"><Link href="/cart">Back to cart</Link></Button>
      </div>
    );
  }

  const bind = (name: keyof Values) => ({
    id: fieldId(name),
    name,
    value: values[name],
    error: errors[errKey(name)],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setValues((v) => ({ ...v, [name]: e.target.value }));
      setErrors((er) => ({ ...er, [errKey(name)]: "" }));
    },
  });

  function focusFirst(errs: Record<string, string>) {
    const first = (Object.keys(values) as (keyof Values)[]).find((n) => errs[errKey(n)]);
    if (first) requestAnimationFrame(() => document.getElementById(fieldId(first))?.focus());
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);

    const payload = {
      email: values.email,
      address: {
        fullName: values.fullName, phone: values.phone, line1: values.line1,
        line2: values.line2 || undefined, city: values.city, region: values.region,
        postalCode: values.postalCode || undefined, country: values.country,
      },
      shippingMethod,
      paymentMethod: payment,
      promoCode: promo?.code,
      items: selected.map((i) => ({ slug: i.slug, variantId: i.variantId, quantity: i.quantity, gift: i.gift })),
    };

    const parsed = checkoutSchema.safeParse(payload);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path.filter((p) => typeof p !== "number").join(".");
        if (key && !errs[key]) errs[key] = issue.message;
      }
      setErrors(errs);
      setFormError("Please check the highlighted fields.");
      focusFirst(errs);
      return;
    }

    start(async () => {
      const res = await placeOrder(parsed.data);
      if (!res.ok) {
        setFormError(res.message);
        if (res.fieldErrors) {
          setErrors(res.fieldErrors);
          focusFirst(res.fieldErrors);
        }
        return;
      }
      setPlaced(true);
      selected.forEach((i) => removeItem(cartItemKey(i)));
      removePromo();
      router.push(`/checkout/success?order=${res.orderId}`);
    });
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_24rem] lg:gap-10">
      <form id="checkout-form" onSubmit={onSubmit} noValidate className="space-y-6">
        {formError && (
          <div role="alert" className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {formError}
          </div>
        )}

        <Step n={1} title="Contact">
          <Field {...bind("email")} label="Email" type="email" autoComplete="email" hint="We'll send your order confirmation here." />
        </Step>

        <Step n={2} title="Shipping address">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field {...bind("fullName")} label="Full name" autoComplete="name" className="sm:col-span-2" />
            <Field {...bind("phone")} label="Phone" type="tel" autoComplete="tel" className="sm:col-span-2" hint="For delivery updates." />
            <Field {...bind("line1")} label="Street address" autoComplete="address-line1" className="sm:col-span-2" />
            <Field {...bind("line2")} label="Apartment, suite, etc. (optional)" autoComplete="address-line2" className="sm:col-span-2" />
            <Field {...bind("city")} label="City" autoComplete="address-level2" />
            <Field {...bind("region")} label="Region or state" autoComplete="address-level1" />
            <Field {...bind("postalCode")} label="Postal code (optional)" autoComplete="postal-code" />
            <SelectField {...bind("country")} label="Country" autoComplete="country">
              {countries.map((c) => <option key={c.code} value={c.code}>{c.name}</option>)}
            </SelectField>
          </div>
        </Step>

        <Step n={3} title="Delivery">
          <ShippingOptions value={shippingMethod} freeStandard={totals.freeShippingEligible} />
        </Step>

        <Step n={4} title="Payment">
          <PaymentMethodPicker value={payment} onChange={setPayment} />
        </Step>
      </form>

      <CheckoutSummary items={selected} totals={totals} promo={promo} pending={pending} />
    </div>
  );
}