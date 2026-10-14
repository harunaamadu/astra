import { CreditCard, Smartphone, Wallet } from "lucide-react";
import type { PaymentMethod } from "@/types/order";

const options: {
  id: PaymentMethod;
  label: string;
  text: string;
  icon: typeof CreditCard;
}[] = [
  {
    id: "card",
    label: "Credit or debit card",
    text: "You'll enter card details securely with our payment provider.",
    icon: CreditCard,
  },
  {
    id: "mobile-money",
    label: "Mobile money",
    text: "Approve the payment on your phone.",
    icon: Smartphone,
  },
  {
    id: "paypal",
    label: "PayPal",
    text: "You'll be redirected to PayPal to approve the payment.",
    icon: Wallet,
  },
];

export function PaymentMethodPicker({
  value,
  onChange,
}: {
  value: PaymentMethod;
  onChange: (m: PaymentMethod) => void;
}) {
  return (
    <fieldset>
      <legend className="sr-only">Payment method</legend>
      <div className="space-y-2">
        {options.map(({ id, label, text, icon: Icon }) => (
          <label key={id} className="block cursor-pointer">
            <input
              type="radio"
              name="payment"
              value={id}
              checked={value === id}
              onChange={() => onChange(id)}
              className="peer sr-only"
            />
            <label className="flex items-start gap-3 rounded-lg border p-3 text-sm transition-colors hover:bg-accent peer-checked:border-foreground peer-checked:bg-accent peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2">
              <Icon
                className="mt-0.5 size-5 shrink-0 text-muted-foreground"
                aria-hidden
              />
              <span>
                <span className="block font-medium">{label}</span>
                <span className="text-xs text-muted-foreground">{text}</span>
              </span>
            </label>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
