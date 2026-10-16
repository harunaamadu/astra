# Content management (Sanity)

Astra runs with or without Sanity. With no project id set, every page uses the built-in sample content.
Once Sanity is configured and seeded, editors own the content below and changes go live within seconds.

## Who owns what

| Content | Owner | Where |
|---|---|---|
| Navigation, footer, popular searches | Sanity | `siteSettings`, `category` |
| Categories and their menu order | Sanity | `category` (departments and subcategories) |
| Homepage hero, promo banners, quick links, sponsored strip | Sanity | `heroSlide`, `promoBanner`, `shortcut` |
| Product copy, specs, images, FAQ | Sanity | `product` (matched by product slug) |
| About, careers, press, and other info pages | Sanity | `infoPage` |
| Terms, privacy, cookies, ads | Sanity | `legalDoc` |
| Blog | Sanity | `blogPost` |
| Prices, stock, variants, orders, users | Prisma (step 6) | never the CMS, so checkout cannot be tampered with |
| Help articles (shipping, returns, ...) | Code | they quote live shipping and returns numbers |
| Cart, shipping and promo rules | Code | business logic |

## One-time setup

1. Create a project at https://www.sanity.io/manage and note the **project id**. Use the `production` dataset.
2. Install the packages:
   ```bash
   npm i next-sanity sanity @sanity/vision styled-components
   npm i -D @sanity/client tsx
   ```
3. Add to `.env.local`: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_REVALIDATE_SECRET` (any long random string).
4. In the project's **API > CORS origins**, add `http://localhost:3000` (and your production URL) with credentials allowed.
5. Add this script to `package.json`: `"seed:cms": "tsx --env-file=.env.local scripts/seed-sanity.ts"`.
6. Create an **Editor** token (API > Tokens), put it in `.env.local` as `SANITY_API_WRITE_TOKEN`, then:
   ```bash
   npm run seed:cms -- --dry   # preview
   npm run seed:cms            # write the sample content into Sanity
   ```
7. Open http://localhost:3000/studio and sign in.

## Publish webhook (makes edits appear in seconds)

In **API > Webhooks > Create**:

- URL: `https://<your-site>/api/revalidate` (use a tunnel such as ngrok for local testing)
- Trigger on: Create, Update, Delete
- Filter: `_type in ["siteSettings","category","heroSlide","promoBanner","shortcut","infoPage","legalDoc","blogPost","product"]`
- Projection: `{ _type, "slug": coalesce(slug.current, catalogSlug) }`
- HTTP method: POST
- Secret: the same value as `SANITY_REVALIDATE_SECRET`

Without the webhook, content still updates when its cache expires (1 hour for most content, about 1 to 5 minutes
for hero slides, banners and shortcuts).

## How caching works

Every CMS call in `src/lib/cms/content.ts` is cached with `"use cache"` and tagged `sanity:<type>`
(and `sanity:<type>:<slug>` for single documents). The webhook revalidates exactly those tags.
Failures are never cached, so a Sanity outage keeps serving the last good copy.

## Editing tips

- **Scheduling:** hero slides and shortcut tiles have "Show from" and "Show until". Uncheck Active to hide one.
- **Featured product on a hero slide:** enter the product slug. The slide shows the live price from the catalog, so price never lives in the CMS.
- **Product content:** create a "Product content" document whose slug equals the product's URL slug. Fields you fill in replace the defaults on that product page.
- **Sponsored strip:** shortcut tiles with placement "Sponsored" are paid placements. They are always labelled "Sponsored" on the site.
- **Categories:** departments have no parent. Subcategories pick a department and a "menu group" heading.

## Known limitations

- Renaming a category slug changes its URL, and (until Prisma links products to categories by id) its sample products will no longer appear there.
- Image crop and hotspot are not applied; images render uncropped. Add `@sanity/image-url` if you need it.
- No draft preview yet. Editors see changes after publishing. Draft mode and visual editing are a later addition.
