astra/
├── docs/
│   ├── ARCHITECTURE.md                          updated
│   ├── BUSINESS_MODEL.md
│   └── CMS.md                                   new
├── prisma/
│   └── .gitkeep                                 empty until step 6
├── public/
│   └── images/
│       └── .gitkeep
├── scripts/
│   └── seed-sanity.ts                           new
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
│   │   │   ├── layout.tsx                       updated: fetches navigation
│   │   │   └── page.tsx                         homepage
│   │   ├── (studio)/                            new
│   │   │   └── studio/[[...tool]]/page.tsx      Sanity Studio at /studio
│   │   ├── api/                                 new
│   │   │   └── revalidate/route.ts              Sanity publish webhook
│   │   ├── error.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── not-found.tsx
│   │   ├── robots.ts
│   │   └── sitemap.ts                           updated: async content
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
│   │   │   ├── departments-index.tsx            updated: takes departments as a prop
│   │   │   ├── filter-panel.tsx
│   │   │   ├── filter-sheet.tsx
│   │   │   ├── filter-sidebar.tsx
│   │   │   ├── listing-view.tsx
│   │   │   ├── pagination.tsx
│   │   │   ├── product-grid.tsx
│   │   │   ├── product-list-item.tsx
│   │   │   ├── results-region.tsx
│   │   │   ├── search-empty.tsx                 updated: async
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
│   │   │   │   ├── footer.tsx                   updated: takes columns as props
│   │   │   │   └── payment-methods.tsx
│   │   │   ├── header/                          all updated: navigation arrives as props
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
│   │   ├── providers/providers.tsx
│   │   ├── shared/
│   │   │   ├── form-field.tsx
│   │   │   ├── newsletter-form.tsx
│   │   │   ├── section-header.tsx
│   │   │   └── theme-toggle.tsx
│   │   └── ui/                                  shadcn, generated by the CLI (not in my copy)
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
│   │   │   ├── categories.ts                    updated: async, built from navigation
│   │   │   ├── filtering.ts
│   │   │   ├── query.ts
│   │   │   └── slug.ts
│   │   ├── cms/                                 new
│   │   │   └── content.ts                       cached, tagged Sanity reads
│   │   ├── constants/
│   │   │   ├── countries.ts
│   │   │   ├── footer.ts                        now the CMS fallback
│   │   │   ├── icon-keys.ts                     new
│   │   │   ├── icons.tsx
│   │   │   ├── navigation.ts                    now the CMS fallback
│   │   │   ├── plans.ts
│   │   │   └── policies.ts
│   │   ├── content/                             sample copy: CMS fallback and seed source
│   │   │   ├── blog.ts
│   │   │   ├── help.ts                          stays in code (quotes live shipping numbers)
│   │   │   ├── info.ts
│   │   │   └── legal.ts
│   │   ├── data/                                the swap point for Sanity and Prisma
│   │   │   ├── catalog.ts
│   │   │   ├── collections.ts                   updated
│   │   │   ├── content.ts                       new: info, legal and blog from CMS or samples
│   │   │   ├── home-samples.ts                  new: the old home.ts sample data
│   │   │   ├── home.ts                          now a CMS-aware wrapper
│   │   │   ├── navigation.ts                    new
│   │   │   ├── orders.ts
│   │   │   └── products.ts                      updated: merges Sanity product copy
│   │   ├── payments/index.ts
│   │   ├── validations/
│   │   │   ├── auth.ts
│   │   │   ├── cart.ts
│   │   │   ├── catalog.ts
│   │   │   ├── checkout.ts
│   │   │   ├── newsletter.ts
│   │   │   └── search.ts
│   │   └── utils.ts
│   ├── sanity/                                  new
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
│       ├── cms.ts                               new
│       ├── content.ts
│       ├── index.ts
│       ├── order.ts
│       └── product.ts
├── .env.example                                 updated: Sanity vars
├── next.config.ts                               updated: cacheComponents, Sanity images
├── README.md                                    updated
└── sanity.config.ts                             new