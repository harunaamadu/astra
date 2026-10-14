import { FREE_SHIPPING_THRESHOLD, shippingMethods } from "@/lib/cart/pricing";
import { PLUS_RETURN_WINDOW_DAYS, RETURN_WINDOW_DAYS } from "@/lib/constants/policies";
import { formatPrice } from "@/lib/utils";
import type { HelpArticle } from "@/types/content";

const std = shippingMethods.standard;
const exp = shippingMethods.express;

/** Numbers come from the same constants the cart and checkout use, so the help text can never drift. */
export const helpArticles: HelpArticle[] = [
  {
    slug: "shipping", title: "Shipping rates and policies", summary: "Delivery options, costs and timing.",
    sections: [
      { heading: "Delivery options", items: [
        { title: `${std.label}: ${std.description}`, text: `${formatPrice(std.price)}, or free on orders of ${formatPrice(FREE_SHIPPING_THRESHOLD)} or more.` },
        { title: `${exp.label}: ${exp.description}`, text: `${formatPrice(exp.price)}. Express is not discounted by free-delivery offers.` },
      ] },
      { heading: "Tracking", paragraphs: ["Once your order ships you can follow it from Your orders in your account."] },
      { heading: "Delivery times", paragraphs: ["Times start when your order ships, not when you place it. Some items from marketplace sellers may ship separately."] },
    ],
  },
  {
    slug: "returns", title: "Returns and replacements", summary: "How to return an item or get a replacement.",
    sections: [
      { heading: "Return window", paragraphs: [`Most items can be returned within ${RETURN_WINDOW_DAYS} days of delivery. Astra Plus members get ${PLUS_RETURN_WINDOW_DAYS} days.`] },
      { heading: "How to return", items: [
        { title: "1. Open your order", text: "Go to Your orders and choose the order." },
        { title: "2. Pick the item", text: "Select the item and tell us why you are returning it." },
        { title: "3. Send it back", text: "Print the label or follow the drop-off instructions. Your refund is issued after we receive it." },
      ] },
      { heading: "Items that cannot be returned", paragraphs: ["Digital gift cards and items marked as final sale cannot be returned."] },
    ],
  },
  {
    slug: "payments", title: "Payment methods", summary: "What you can pay with and how payments are protected.",
    sections: [
      { heading: "Accepted methods", paragraphs: ["Credit and debit cards, PayPal and mobile money, depending on your region."] },
      { heading: "Security", paragraphs: ["Card details are entered with our payment provider and are never stored on Astra servers."] },
      { heading: "Promo codes and gift cards", paragraphs: ["Enter a promo code in your cart or at checkout. Gift cards are applied at checkout."] },
    ],
  },
  {
    slug: "currency", title: "Currency", summary: "Which currency prices are shown in.",
    sections: [
      { heading: "Prices", paragraphs: ["Prices are shown in US dollars (USD). If your card or mobile money account uses another currency, your provider converts the amount at its own rate and may charge a fee."] },
    ],
  },
  {
    slug: "tracking", title: "Tracking an order", summary: "Find out where your order is.",
    sections: [
      { heading: "Where to look", paragraphs: ["Open Your orders from your account menu and choose an order. The progress bar shows whether it is processing, shipped or delivered."] },
      { heading: "Order stuck?", paragraphs: ["If an order has not moved for several days, contact support with your order number."] },
    ],
  },
];

export const getHelpArticle = (slug: string) => helpArticles.find((a) => a.slug === slug) ?? null;

export const helpFaq = [
  { question: "Where is my order?", answer: "Open Your orders in your account. Each order shows its current status." },
  { question: "How do I return something?", answer: `Start from the order page. Most items can be returned within ${RETURN_WINDOW_DAYS} days.` },
  { question: "How do I change my delivery address?", answer: "Addresses can be changed until an order ships. After that, contact support." },
  { question: "How do I use a promo code?", answer: "Enter it in the Promo code field in your cart or at checkout." },
];
