# Astra architecture

## Stack and responsibilities

| Concern | Tool |
|---|---|
| Framework | Next.js (App Router), TypeScript |
| Styling | Tailwind CSS v4, shadcn/ui, framer-motion |
| Client state | Zustand (cart, wishlist, UI), persisted where useful |
| Validation | Zod, shared by forms, route handlers and server actions |
| Content | Sanity: categories, banners, editorial, product marketing copy and images |
| Transactional data | Prisma + PostgreSQL: users, vendors, orders, inventory, payments, reviews |

Rule of thumb: **Sanity owns what editors change, Prisma owns what money touches.**
Products carry a `sanityId` link; price and stock live in Prisma so checkout never trusts the CMS.

## Folder structure

```
astra/
├── docs/
│   ├── ARCHITECTURE.md
│   └── BUSINESS_MODEL.md
├── prisma/
│   └── .gitkeep
├── public/
│   └── images/
│       └── .gitkeep
├── sanity/
│   └── schemas/
│       └── .gitkeep
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── forgot-password/page.tsx
│   │   │   ├── sign-in/page.tsx
│   │   │   ├── sign-up/page.tsx
│   │   │   └── layout.tsx
│   │   ├── (checkout)/
│   │   │   ├── checkout/
│   │   │   │   ├── success/page.tsx
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── (shop)/
│   │   │   ├── [slug]/page.tsx                  about, careers, press, sustainability, advertise, affiliates, registry
│   │   │   ├── account/
│   │   │   │   ├── orders/
│   │   │   │   │   ├── [id]/page.tsx
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── settings/page.tsx
│   │   │   │   ├── subscriptions/page.tsx
│   │   │   │   ├── wishlist/page.tsx
│   │   │   │   ├── layout.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── best-sellers/page.tsx
│   │   │   ├── blog/
│   │   │   │   ├── [slug]/page.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── c/[[...slug]]/
│   │   │   │   ├── not-found.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── cart/page.tsx
│   │   │   ├── deals/page.tsx
│   │   │   ├── essentials/page.tsx
│   │   │   ├── for-you/page.tsx
│   │   │   ├── gift-cards/page.tsx
│   │   │   ├── help/
│   │   │   │   ├── [topic]/page.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── legal/[doc]/page.tsx
│   │   │   ├── new/page.tsx
│   │   │   ├── p/[slug]/
│   │   │   │   ├── not-found.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── plus/page.tsx
│   │   │   ├── s/[id]/page.tsx
│   │   │   ├── search/page.tsx
│   │   │   ├── sell/
│   │   │   │   ├── pro/page.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx                         homepage
│   │   ├── error.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── not-found.tsx
│   │   ├── robots.ts
│   │   └── sitemap.ts
│   ├── components/
│   │   ├── account/
│   │   │   ├── account-nav.tsx
│   │   │   ├── buy-again-button.tsx
│   │   │   ├── email-preferences.tsx
│   │   │   ├── order-card.tsx
│   │   │   ├── order-status-badge.tsx
│   │   │   ├── order-summary-card.tsx
│   │   │   ├── order-timeline.tsx
│   │   │   ├── profile-form.tsx
│   │   │   └── wishlist-grid.tsx
│   │   ├── auth/
│   │   │   ├── forgot-password-form.tsx
│   │   │   ├── password-field.tsx
│   │   │   ├── sign-in-form.tsx
│   │   │   └── sign-up-form.tsx
│   │   ├── cart/
│   │   │   ├── cart-drawer.tsx
│   │   │   ├── cart-empty.tsx
│   │   │   ├── cart-item-row.tsx
│   │   │   ├── cart-page-content.tsx
│   │   │   ├── cart-sync.tsx
│   │   │   ├── free-shipping-progress.tsx
│   │   │   ├── order-summary.tsx
│   │   │   ├── promo-code-form.tsx
│   │   │   ├── saved-for-later.tsx
│   │   │   ├── shipping-options.tsx
│   │   │   └── sticky-checkout-bar.tsx
│   │   ├── catalog/
│   │   │   ├── active-filters.tsx
│   │   │   ├── catalog-nav-provider.tsx
│   │   │   ├── category-empty.tsx
│   │   │   ├── category-skeleton.tsx
│   │   │   ├── collection-content.tsx
│   │   │   ├── departments-index.tsx
│   │   │   ├── filter-panel.tsx
│   │   │   ├── filter-sheet.tsx
│   │   │   ├── filter-sidebar.tsx
│   │   │   ├── listing-view.tsx
│   │   │   ├── pagination.tsx
│   │   │   ├── product-grid.tsx
│   │   │   ├── product-list-item.tsx
│   │   │   ├── results-region.tsx
│   │   │   ├── search-empty.tsx
│   │   │   ├── sort-select.tsx
│   │   │   ├── subcategory-chips.tsx
│   │   │   └── view-toggle.tsx
│   │   ├── checkout/
│   │   │   ├── checkout-form.tsx
│   │   │   ├── checkout-summary.tsx
│   │   │   └── payment-method-picker.tsx
│   │   ├── content/
│   │   │   ├── content-sections.tsx
│   │   │   ├── cookie-preferences.tsx
│   │   │   ├── cta-banner.tsx
│   │   │   ├── faq-accordion.tsx
│   │   │   ├── gift-card-form.tsx
│   │   │   ├── info-page-view.tsx
│   │   │   ├── page-shell.tsx
│   │   │   └── pricing-cards.tsx
│   │   ├── home/
│   │   │   ├── category-grid.tsx
│   │   │   ├── delivery-banner.tsx
│   │   │   ├── hero-carousel.tsx
│   │   │   ├── hero-slide.tsx
│   │   │   ├── newsletter-section.tsx
│   │   │   ├── personal-offers.tsx
│   │   │   ├── promo-banners.tsx
│   │   │   ├── seller-cta.tsx
│   │   │   └── sponsored-strip.tsx
│   │   ├── layout/
│   │   │   ├── footer/
│   │   │   │   ├── back-to-top.tsx
│   │   │   │   ├── copyright-year.tsx
│   │   │   │   ├── footer.tsx
│   │   │   │   └── payment-methods.tsx
│   │   │   ├── header/
│   │   │   │   ├── account-menu.tsx
│   │   │   │   ├── cart-button.tsx
│   │   │   │   ├── header.tsx
│   │   │   │   ├── logo.tsx
│   │   │   │   ├── mega-menu.tsx
│   │   │   │   ├── mobile-nav.tsx
│   │   │   │   ├── search-bar.tsx
│   │   │   │   ├── sub-nav.tsx
│   │   │   │   ├── utility-bar.tsx
│   │   │   │   └── wishlist-button.tsx
│   │   │   └── mobile-bottom-nav.tsx
│   │   ├── product/
│   │   │   ├── detail/
│   │   │   │   ├── delivery-info.tsx
│   │   │   │   ├── product-breadcrumbs.tsx
│   │   │   │   ├── product-faq.tsx
│   │   │   │   ├── product-gallery.tsx
│   │   │   │   ├── product-json-ld.tsx
│   │   │   │   ├── product-page-skeleton.tsx
│   │   │   │   ├── product-reviews.tsx
│   │   │   │   ├── product-specs.tsx
│   │   │   │   ├── product-tabs.tsx
│   │   │   │   ├── product-view.tsx
│   │   │   │   ├── quantity-input.tsx
│   │   │   │   ├── seller-card.tsx
│   │   │   │   ├── sticky-add-to-cart.tsx
│   │   │   │   └── variant-selector.tsx
│   │   │   ├── product-card-actions.tsx
│   │   │   ├── product-card.tsx
│   │   │   ├── product-image.tsx
│   │   │   ├── product-price.tsx
│   │   │   ├── product-rail.tsx
│   │   │   └── product-rating.tsx
│   │   ├── providers/
│   │   │   └── providers.tsx
│   │   ├── shared/
│   │   │   ├── form-field.tsx
│   │   │   ├── newsletter-form.tsx
│   │   │   ├── section-header.tsx
│   │   │   └── theme-toggle.tsx
│   │   └── ui/                                  shadcn (generated by the CLI, not in my copy)
│   ├── features/
│   │   ├── account/actions.ts
│   │   ├── auth/actions.ts
│   │   ├── cart/actions.ts
│   │   ├── checkout/actions.ts
│   │   └── marketing/actions.ts
│   ├── hooks/
│   │   ├── use-cart.ts
│   │   ├── use-debounce.ts
│   │   ├── use-mounted.ts
│   │   └── use-scroll-direction.ts
│   ├── lib/
│   │   ├── auth/
│   │   │   ├── redirect.ts
│   │   │   └── session.ts
│   │   ├── cart/
│   │   │   ├── pricing.ts
│   │   │   └── promos.ts
│   │   ├── catalog/
│   │   │   ├── categories.ts
│   │   │   ├── filtering.ts
│   │   │   ├── query.ts
│   │   │   └── slug.ts
│   │   ├── constants/
│   │   │   ├── countries.ts
│   │   │   ├── footer.ts
│   │   │   ├── icons.tsx
│   │   │   ├── navigation.ts
│   │   │   ├── plans.ts
│   │   │   └── policies.ts
│   │   ├── content/
│   │   │   ├── blog.ts
│   │   │   ├── help.ts
│   │   │   ├── info.ts
│   │   │   └── legal.ts
│   │   ├── data/
│   │   │   ├── catalog.ts
│   │   │   ├── collections.ts
│   │   │   ├── home.ts
│   │   │   ├── orders.ts
│   │   │   └── products.ts
│   │   ├── payments/
│   │   │   └── index.ts
│   │   ├── validations/
│   │   │   ├── auth.ts
│   │   │   ├── cart.ts
│   │   │   ├── catalog.ts
│   │   │   ├── checkout.ts
│   │   │   ├── newsletter.ts
│   │   │   └── search.ts
│   │   └── utils.ts
│   ├── store/
│   │   ├── cart-store.ts
│   │   ├── ui-store.ts
│   │   └── wishlist-store.ts
│   └── types/
│       ├── cart.ts
│       ├── catalog.ts
│       ├── content.ts
│       ├── index.ts
│       ├── order.ts
│       └── product.ts
├── .env.example
├── next.config.ts
└── README.md
```

## Build plan

1. **Foundation + header** (this step)
2. Homepage: hero carousel, personal-offers strip, category grid, banners, product rails, newsletter, footer
3. Catalog: category/search pages with faceted filters, sort, pagination
4. Product page, cart drawer, cart page, checkout UI
5. Sanity: schemas, studio, GROQ queries, replace static data
6. Prisma: schema, migrations, seed
7. Auth (Auth.js), orders, payments adapter, webhooks
8. Seller dashboard, sponsored listings, Astra Plus
9. SEO, performance, tests, deployment
