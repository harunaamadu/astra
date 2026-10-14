import type { BlogPost } from "@/types/content";

/** SAMPLE POSTS: static fallback and seed source. Pages read through src/lib/cms/pages.ts (Sanity first). */
export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-choose-a-monitor", title: "How to choose a monitor", date: "2026-09-15",
    excerpt: "Size, resolution and refresh rate explained, with a simple way to decide.",
    body: [
      { heading: "Start with how you'll use it", paragraphs: ["For office work and browsing, a 24-inch 1080p screen is plenty. For photo editing, look for an IPS panel with good color accuracy. For gaming, refresh rate matters more than sharpness."] },
      { heading: "Resolution and size", paragraphs: ["Resolution should match size. 1080p looks sharp at 24 inches, 1440p suits 27 inches, and 4K shines from 27 inches up, as long as your computer can drive it."] },
      { heading: "Refresh rate", paragraphs: ["60 Hz is fine for most people. 144 Hz makes motion feel noticeably smoother in fast games, and it also makes scrolling feel nicer."] },
    ],
  },
  {
    slug: "buying-headphones-guide", title: "Headphones: wired, wireless or noise cancelling?", date: "2026-08-30",
    excerpt: "What really changes between headphone types, and who each one suits.",
    body: [
      { heading: "Wireless", paragraphs: ["Bluetooth headphones are convenient for commuting and calls. Battery life and microphone quality vary a lot, so check both."] },
      { heading: "Noise cancelling", paragraphs: ["Active noise cancelling reduces constant sounds like engines and fans. It helps most on planes, trains and in open offices."] },
      { heading: "Wired", paragraphs: ["Wired headphones skip charging and usually give the best sound for the price, which is why many studios still use them."] },
    ],
  },
  {
    slug: "returns-without-the-hassle", title: "Returns without the hassle", date: "2026-08-12",
    excerpt: "How to return an item quickly and get your money back sooner.",
    body: [
      { heading: "Check the window", paragraphs: ["Most items can be returned within 30 days of delivery. Astra Plus members get 60."] },
      { heading: "Keep the packaging", paragraphs: ["Returns go smoothly when the item is unused and in its original packaging. Take a photo before you send it."] },
      { heading: "Track your refund", paragraphs: ["Your refund is issued after the item is received. You can follow progress from the order page."] },
    ],
  },
];

