# Astra

Production-oriented e-commerce marketplace. See `docs/` for the business model and architecture.

## Setup

```bash
npx create-next-app@latest astra --typescript --tailwind --app --src-dir --eslint --import-alias "@/*"
cd astra
# copy this repo's src/, docs/, .env.example over the generated project (overwrite globals.css, layout.tsx, page.tsx)

npm i framer-motion zustand zod next-themes lucide-react clsx tailwind-merge tw-animate-css
npm i prisma @prisma/client next-sanity @sanity/image-url   # used from steps 5-6

npx shadcn@latest init
npx shadcn@latest add button input select dropdown-menu sheet accordion badge separator sonner

cp .env.example .env.local
npm run dev
```

When `shadcn init` asks to overwrite `globals.css`, decline: the Astra theme tokens are already in place.
