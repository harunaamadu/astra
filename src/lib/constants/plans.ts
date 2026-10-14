import type { Plan } from "@/types/content";

/** SAMPLE pricing and rates. Finalise with finance and legal before launch. */

export const plusPlans: Plan[] = [
  {
    id: "plus-monthly", name: "Monthly", price: 699, period: "month",
    description: "Flexible. Cancel any time.",
    features: ["Free standard delivery on orders over $10", "Early access to selected deals", "60-day returns", "Priority support"],
    cta: { label: "Start monthly plan", href: "/sign-up?next=/plus" },
  },
  {
    id: "plus-annual", name: "Annual", price: 5900, period: "year", badge: "Save 30%", highlighted: true,
    description: "Best value for regular shoppers.",
    features: ["Everything in Monthly", "Two months free compared with paying monthly", "Free express upgrade on one order each quarter"],
    cta: { label: "Start annual plan", href: "/sign-up?next=/plus" },
  },
];

export const plusBenefits = [
  { title: "Free standard delivery", text: "No more watching the basket total. Eligible orders over $10 ship free." },
  { title: "Early access to deals", text: "Shop selected markdowns before they open to everyone." },
  { title: "Longer returns", text: "60 days to change your mind instead of 30." },
  { title: "Priority support", text: "Questions about an order go to the front of the queue." },
];

export const sellerPlans: Plan[] = [
  {
    id: "starter", name: "Starter", price: 0, description: "Start selling with no monthly fee.",
    features: ["List unlimited products", "Referral fee of 6% to 15% by category", "Sales dashboard", "Pay-per-click sponsored placements"],
    cta: { label: "Start selling", href: "/sign-up?next=/sell" },
  },
  {
    id: "pro", name: "Seller Pro", price: 2900, period: "month", highlighted: true, badge: "Most popular",
    description: "For sellers who want to grow faster.",
    features: ["Everything in Starter", "Referral fees reduced by 3 points", "Advanced analytics and exports", "$20 monthly ad credit", "Bulk upload and priority seller support"],
    cta: { label: "Go Pro", href: "/sign-up?next=/sell/pro" },
  },
];

export const referralRates = [
  { category: "Electronics and computers", rate: "6%" },
  { category: "Toys and games", rate: "10%" },
  { category: "Home and kitchen", rate: "12%" },
  { category: "Beauty and care", rate: "12%" },
  { category: "Fashion", rate: "15%" },
];
