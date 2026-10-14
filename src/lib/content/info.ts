import type { InfoPage } from "@/types/content";

/** SAMPLE COPY. Replace with real company information (or Sanity documents in step 5). */
export const infoPages: InfoPage[] = [
  {
    slug: "about", title: "About Astra", description: "What Astra is and how the marketplace works.",
    headline: "A marketplace built around trust", intro: "Astra connects shoppers with sellers they can rely on, with clear prices, tracked delivery and easy returns.",
    sections: [
      { heading: "What we do", paragraphs: ["Astra is an online marketplace for everyday essentials and standout finds. Sellers list products, and shoppers get one place to compare, buy and track orders."] },
      { heading: "What we care about", items: [
        { title: "Clarity", text: "Prices, delivery costs and return terms are shown before you commit." },
        { title: "Fair sellers", text: "Sellers are verified, and the fees they pay are published." },
        { title: "Service", text: "If something goes wrong, we help sort it out." },
      ] },
    ],
    cta: { title: "Sell with us", text: "Reach shoppers and track your sales from one dashboard.", label: "Start selling", href: "/sell" },
  },
  {
    slug: "careers", title: "Careers", description: "Work at Astra.",
    headline: "Help us build a better marketplace", intro: "We're a small team focused on product quality and customer trust.",
    sections: [
      { heading: "Open roles", paragraphs: ["There are no open roles listed right now. We'd still like to hear from you if you work in engineering, design, operations or seller support."] },
      { heading: "How we work", items: [
        { title: "Ship small, learn fast", text: "We release often and measure what customers actually do." },
        { title: "Write things down", text: "Decisions are documented so anyone can understand the reasoning." },
      ] },
    ],
    cta: { title: "Introduce yourself", text: "Tell us what you'd like to work on.", label: "Get in touch", href: "/help" },
  },
  {
    slug: "press", title: "Press", description: "Press resources and contact.",
    headline: "Press and media", intro: "Resources for journalists covering Astra.",
    sections: [
      { heading: "Media inquiries", paragraphs: ["For interviews, statements or product information, contact press@astra.example. We aim to reply within two working days."] },
      { heading: "Brand assets", paragraphs: ["Logos and screenshots are available on request."] },
    ],
  },
  {
    slug: "sustainability", title: "Sustainability", description: "How Astra approaches its environmental impact.",
    headline: "Doing less harm", intro: "Shipping and packaging have a footprint. Here is where we are focusing.",
    sections: [
      { heading: "Our focus areas", items: [
        { title: "Packaging", text: "Right-sized boxes and recyclable materials wherever possible." },
        { title: "Consolidated delivery", text: "Grouping items from one order into fewer parcels." },
        { title: "Longer product life", text: "Clear specs and honest reviews mean fewer returns and less waste." },
      ] },
      { heading: "Reporting", paragraphs: ["We will publish measurable targets and progress here as they are set."] },
    ],
  },
  {
    slug: "advertise", title: "Advertise your products", description: "Promote listings with Astra sponsored placements.",
    headline: "Put your products in front of shoppers", intro: "Sponsored placements put your listings at the top of category and search results. You pay only when someone clicks.",
    sections: [
      { heading: "How it works", items: [
        { title: "Choose products", text: "Pick the listings you want to promote." },
        { title: "Set a budget", text: "Decide your daily spend and cost per click." },
        { title: "Track results", text: "See impressions, clicks and sales in your seller dashboard." },
      ] },
      { heading: "Transparency", paragraphs: ["Every sponsored result is labelled \"Sponsored\", so shoppers always know what is paid placement."] },
    ],
    cta: { title: "Ready to promote?", text: "Create a seller account to get started.", label: "Start selling", href: "/sell" },
  },
  {
    slug: "affiliates", title: "Become an affiliate", description: "Earn by recommending Astra products.",
    headline: "Earn when you recommend", intro: "Share products you like. When someone buys through your link, you earn a commission.",
    sections: [
      { heading: "Who it's for", paragraphs: ["Creators, bloggers, reviewers and community owners with an audience who trust their picks."] },
      { heading: "How it works", items: [
        { title: "Apply", text: "Tell us about your audience and how you will promote." },
        { title: "Share links", text: "Generate tracked links for any product or category." },
        { title: "Get paid", text: "Earnings are paid out monthly once you pass the minimum." },
      ] },
    ],
    cta: { title: "Interested?", text: "Create an account and we will be in touch about the program.", label: "Create account", href: "/sign-up" },
  },
  {
    slug: "registry", title: "Registry and gifting", description: "Create a wish list for weddings, birthdays and new homes.",
    headline: "Gifts people actually want", intro: "Build a registry, share one link, and let friends and family pick from it.",
    sections: [
      { heading: "How it works", items: [
        { title: "Build your list", text: "Add anything from Astra to your registry." },
        { title: "Share the link", text: "Guests see what is still needed, so nothing is doubled up." },
        { title: "Get it delivered", text: "Gifts ship to you, or to the address you choose." },
      ] },
      { heading: "Need a quick gift?", paragraphs: ["Astra gift cards are delivered by email and can be used on any order."] },
    ],
    cta: { title: "Start a registry", text: "Sign in to create your first list.", label: "Sign in", href: "/sign-in?next=/registry" },
  },
];

export const getInfoPage = (slug: string) => infoPages.find((p) => p.slug === slug) ?? null;
