# Astra business model

**Model: curated multi-vendor marketplace with layered revenue.**
The Behance case study identifies the marketplace as the profit engine, with vendors as a first-class
customer. Astra serves two sides: shoppers (trust, speed, personalization) and sellers (reach, data, ad tools).

## Revenue streams (in build order)

| # | Stream | How it works | Phase |
|---|--------|--------------|-------|
| 1 | Referral commission | 6-15% of item price by category, taken at payout | MVP |
| 2 | Sponsored placements | Sellers pay per click for boosted results and homepage banners (the "ad banner" and "additional banners for subsidiary brands" slots in the concept) | v1.1 |
| 3 | Astra Plus membership | Annual fee: free shipping above a low threshold, early deal access, extended returns | v1.2 |
| 4 | Seller Pro subscription | Monthly fee: analytics dashboard, lower commission, ad credits, bulk upload | v1.3 |
| 5 | Fulfilment and delivery fees | Optional "Fulfilled by Astra" | later |

Commission is the base. Ads and subscriptions raise margin without raising shopper prices.
Newsletter capture (concept's "subscribe" block) feeds retention and ad targeting.

## Payments

Keep payments behind an adapter (`PaymentProvider`) so markets can differ:
- Stripe Connect for split payouts where supported.
- Paystack or Flutterwave for Ghana and wider Africa, where Stripe Connect support is limited.
Verify current availability before committing to a provider per market.

## Why this fits the case study problems

| Problem in the case study | Astra answer |
|---|---|
| Little value for vendors | Seller dashboard, ad tools, Seller Pro analytics |
| Old UX | Simplified nav, sticky header, mega menu |
| No personalization | "Last viewed", personal offers row (cookie then account) |
| No cold-sales content | Sponsored banners and newsletter capture |
| Filtering and navigation | Faceted filters with URL state, sortable grid |

## Metrics to watch
GMV, take rate, seller activation (first sale in 30 days), repeat purchase rate, cart-to-order conversion,
ad revenue per 1,000 sessions, Plus retention.
