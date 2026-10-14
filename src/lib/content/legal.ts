import type { LegalDoc } from "@/types/content";

/**
 * TEMPLATE TEXT ONLY. It describes how the app behaves today, but it is not legal advice.
 * Have a qualified lawyer review and complete every document before launch.
 */
export const legalDocs: LegalDoc[] = [
  {
    slug: "terms", title: "Conditions of use", summary: "The rules for using Astra.", updated: "2026-10-01",
    sections: [
      { heading: "Using Astra", paragraphs: ["By using Astra you agree to these conditions. You must be old enough to form a binding contract where you live."] },
      { heading: "Orders and prices", paragraphs: ["Prices and availability can change. An order is confirmed when we send you an order confirmation. If a product is mispriced or unavailable we may cancel the order and refund you in full."] },
      { heading: "Sellers", paragraphs: ["Some products are sold by third-party sellers. Sellers are responsible for their listings, and Astra provides the marketplace and checkout."] },
      { heading: "Your account", paragraphs: ["Keep your password private. You are responsible for activity on your account."] },
      { heading: "Changes", paragraphs: ["We may update these conditions. The date above shows when they last changed."] },
    ],
  },
  {
    slug: "privacy", title: "Privacy notice", summary: "What data we collect and why.", updated: "2026-10-01",
    sections: [
      { heading: "What we collect", paragraphs: ["Account details, order and delivery information, and basic usage data such as pages viewed and items added to your cart."] },
      { heading: "Why we collect it", paragraphs: ["To process orders, provide support, prevent fraud and improve the service. With your consent we also use data for personalised offers and advertising."] },
      { heading: "Payments", paragraphs: ["Card details are handled by our payment provider. We store only a reference to the payment, not the card number."] },
      { heading: "Your choices", paragraphs: ["You can view and update your details in your account, change cookie preferences at any time, and ask us to delete your data."] },
    ],
  },
  {
    slug: "cookies", title: "Cookie preferences", summary: "Choose which cookies Astra may use.", updated: "2026-10-01",
    sections: [
      { heading: "Types of cookies", items: [
        { title: "Essential", text: "Needed for the cart, checkout and security. Always on." },
        { title: "Analytics", text: "Help us understand how the site is used so we can improve it." },
        { title: "Advertising", text: "Used to show more relevant promotions and measure sponsored placements." },
      ] },
    ],
  },
  {
    slug: "ads", title: "Interest-based ads", summary: "How sponsored placements and ad personalisation work.", updated: "2026-10-01",
    sections: [
      { heading: "Sponsored products", paragraphs: ["Sellers can pay to promote listings. Promoted results are always labelled \"Sponsored\"."] },
      { heading: "Personalisation", paragraphs: ["If you allow advertising cookies, we may use your browsing activity to choose which promotions to show. You can turn this off in Cookie preferences."] },
    ],
  },
];

export const getLegalDoc = (slug: string) => legalDocs.find((d) => d.slug === slug) ?? null;
