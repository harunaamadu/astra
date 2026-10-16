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
5. Sanity: schemas, studio, GROQ queries, replace static data (done, see "Content layer" below)
6. Prisma: schema, migrations, seed
7. Auth (Auth.js), orders, payments adapter, webhooks
8. Seller dashboard, sponsored listings, Astra Plus
9. SEO, performance, tests, deployment

## Content layer (Sanity, step 5)

Editors manage content at `/studio`. The storefront reads it through `src/lib/cms/*`, which runs a cached GROQ query (`src/lib/sanity/queries.ts`) and falls back to the static sample content when Sanity is not configured, unreachable, or empty. Nothing outside `src/lib/cms` imports Sanity.

| Sanity document | Replaces | Read by |
|---|---|---|
| `department` | `lib/constants/navigation.ts` (category tree) | `cms/departments.ts`; header menus via `DepartmentsProvider`, `/c` pages, sitemap |
| `homePage` (singleton) | hero, category tiles, offers, banners, sponsored strip in `lib/data/home.ts` | `cms/home.ts` |
| `blogPost`, `infoPage`, `helpArticle`, `helpCenter`, `legalDoc` | `lib/content/*` | `cms/pages.ts` |
| `productContent` | description, highlights, specs, FAQ, gallery for one product slug | `cms/products.ts` (`getProductDetail`, product page only) |

Stays in code until Prisma (step 6): price, compare-at price, stock, variants, reviews, seller, shipping rates, plans, promo codes. A hero slide references a product by slug and takes its price from the catalog. Checkout and the cart call `getProductBySlug`, which never touches Sanity.

Numbers inside editorial text are tokens such as `{{returnWindowDays}}` or `{{standardShippingPrice}}`, filled at read time from the constants the cart uses (`cms/tokens.ts`), so help and legal copy cannot disagree with real charges.

Caching: every query is a `use cache` function tagged `sanity:<family>` (`cacheLife("hours")`). A Sanity webhook calls `POST /api/revalidate`, which verifies the signature and calls `revalidateTag(tag, "max")` for the changed document type.

Setup: create a project, copy `.env.example` to `.env.local`, then `npm run sanity:seed` (use `-- --dry` first) to load the current sample content. Add a webhook for `/api/revalidate` (POST, projection `{_type}`) using `SANITY_REVALIDATE_SECRET`, and add the site URL as a CORS origin so `/studio` can sign in.

## STucture 2
astra/
├── docs/
│   ├── ARCHITECTURE.md
│   ├── BUSINESS_MODEL.md
│   └── CMS.md
├── prisma/
│   └── .gitkeep
├── public/
│   └── images/
│       └── .gitkeep
├── scripts/
│   └── seed-sanity.ts
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── forgot-password/
│   │   │   │   └── page.tsx
│   │   │   ├── sign-in/
│   │   │   │   └── page.tsx
│   │   │   ├── sign-up/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── (checkout)/
│   │   │   ├── checkout/
│   │   │   │   ├── success/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── (shop)/
│   │   │   ├── [slug]/
│   │   │   │   └── page.tsx
│   │   │   ├── account/
│   │   │   │   ├── orders/
│   │   │   │   │   ├── [id]/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── settings/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── subscriptions/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── wishlist/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── layout.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── best-sellers/
│   │   │   │   └── page.tsx
│   │   │   ├── blog/
│   │   │   │   ├── [slug]/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── c/
│   │   │   │   └── [[...slug]]/
│   │   │   │       ├── not-found.tsx
│   │   │   │       └── page.tsx
│   │   │   ├── cart/
│   │   │   │   └── page.tsx
│   │   │   ├── deals/
│   │   │   │   └── page.tsx
│   │   │   ├── essentials/
│   │   │   │   └── page.tsx
│   │   │   ├── for-you/
│   │   │   │   └── page.tsx
│   │   │   ├── gift-cards/
│   │   │   │   └── page.tsx
│   │   │   ├── help/
│   │   │   │   ├── [topic]/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── legal/
│   │   │   │   └── [doc]/
│   │   │   │       └── page.tsx
│   │   │   ├── new/
│   │   │   │   └── page.tsx
│   │   │   ├── p/
│   │   │   │   └── [slug]/
│   │   │   │       ├── not-found.tsx
│   │   │   │       └── page.tsx
│   │   │   ├── plus/
│   │   │   │   └── page.tsx
│   │   │   ├── s/
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx
│   │   │   ├── search/
│   │   │   │   └── page.tsx
│   │   │   ├── sell/
│   │   │   │   ├── pro/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── (studio)/
│   │   │   └── studio/
│   │   │       └── [[...tool]]/
│   │   │           └── page.tsx
│   │   ├── api/
│   │   │   └── revalidate/
│   │   │       └── route.ts
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
│   │   └── shared/
│   │       ├── form-field.tsx
│   │       ├── newsletter-form.tsx
│   │       ├── section-header.tsx
│   │       └── theme-toggle.tsx
│   ├── features/
│   │   ├── account/
│   │   │   └── actions.ts
│   │   ├── auth/
│   │   │   └── actions.ts
│   │   ├── cart/
│   │   │   └── actions.ts
│   │   ├── checkout/
│   │   │   └── actions.ts
│   │   └── marketing/
│   │       └── actions.ts
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
│   │   ├── cms/
│   │   │   └── content.ts
│   │   ├── constants/
│   │   │   ├── countries.ts
│   │   │   ├── footer.ts
│   │   │   ├── icon-keys.ts
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
│   │   │   ├── content.ts
│   │   │   ├── home-samples.ts
│   │   │   ├── home.ts
│   │   │   ├── navigation.ts
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
│   ├── sanity/
│   │   ├── schemaTypes/
│   │   │   ├── documents/
│   │   │   │   ├── blog-post.ts
│   │   │   │   ├── category.ts
│   │   │   │   ├── hero-slide.ts
│   │   │   │   ├── info-page.ts
│   │   │   │   ├── legal-doc.ts
│   │   │   │   ├── product.ts
│   │   │   │   ├── promo-banner.ts
│   │   │   │   ├── shortcut.ts
│   │   │   │   └── site-settings.ts
│   │   │   ├── index.ts
│   │   │   ├── objects.ts
│   │   │   └── shared.ts
│   │   ├── client.ts
│   │   ├── env.ts
│   │   ├── image.ts
│   │   ├── queries.ts
│   │   └── structure.ts
│   ├── store/
│   │   ├── cart-store.ts
│   │   ├── ui-store.ts
│   │   └── wishlist-store.ts
│   └── types/
│       ├── cart.ts
│       ├── catalog.ts
│       ├── cms.ts
│       ├── content.ts
│       ├── index.ts
│       ├── order.ts
│       └── product.ts
├── .env.example
├── next.config.ts
├── README.md
└── sanity.config.ts