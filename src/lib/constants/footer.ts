import type { NavGroup, NavLink, PaymentKey, PaymentProps } from "@/types";

export const footerColumns: NavGroup[] = [
  {
    title: "Get to know us",
    links: [
      { label: "About Astra", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Blog", href: "/blog" },
      { label: "Press", href: "/press" },
      { label: "Sustainability", href: "/sustainability" },
    ],
  },
  {
    title: "Make money with us",
    links: [
      { label: "Sell on Astra", href: "/sell" },
      { label: "Seller Pro", href: "/sell/pro" },
      { label: "Advertise your products", href: "/advertise" },
      { label: "Become an affiliate", href: "/affiliates" },
    ],
  },
  {
    title: "Let us help you",
    links: [
      { label: "Your account", href: "/account" },
      { label: "Your orders", href: "/account/orders" },
      { label: "Shipping rates and policies", href: "/help/shipping" },
      { label: "Returns and replacements", href: "/help/returns" },
      { label: "Help center", href: "/help" },
    ],
  },
  {
    title: "Astra payments",
    links: [
      { label: "Payment methods", href: "/help/payments" },
      { label: "Gift cards", href: "/gift-cards" },
      { label: "Astra Plus", href: "/plus" },
      { label: "Currency converter", href: "/help/currency" },
    ],
  },
];

export const legalLinks: NavLink[] = [
  { label: "Conditions of use", href: "/legal/terms" },
  { label: "Privacy notice", href: "/legal/privacy" },
  { label: "Cookie preferences", href: "/legal/cookies" },
  { label: "Interest-based ads", href: "/legal/ads" },
];

// export const paymentMethods = ["Visa", "Mastercard", "Mobile Money", "PayPal"];

const imageHttps =
  "https://res.cloudinary.com/dqylma6u3/image/upload/v1791896021";

export const paymentMethods: PaymentProps[] = [
  {
    label: "Visa",
    imgSrc: `${imageHttps}/Visa_krk6d6.svg`,
  },
  {
    label: "Mastercard",
    imgSrc: `${imageHttps}/mastercard_nzeznl.svg`,
  },
  {
    label: "Mobile Money",
    imgSrc: `${imageHttps}/momo_vvmfii.png`,
  },
  {
    label: "PayPal",
    imgSrc: `${imageHttps}/Paypal_shkc10.svg`,
    regionalAvailability: false,
  },
];

