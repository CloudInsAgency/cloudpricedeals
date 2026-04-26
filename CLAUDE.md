# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the local Next.js dev server
- `npm run build` — production build
- `npm run start` — run the production build locally
- `npm run lint` — `next lint` (eslint-config-next)

There are no tests in this repo.

## Architecture

CloudPriceDeals is a Next.js 14 **App Router** affiliate site (JavaScript, not TypeScript) that surfaces Amazon deals and shows price comparisons across Amazon, Best Buy, Walmart, Target, and eBay. It is deployed on Vercel (see `vercel.json`).

### Single source of truth for deals

All deal data is hardcoded in `src/data/deals.js`. There is no CMS, database, or API — adding/updating a deal means editing this file. The same module exports:
- `DEALS` — the canonical array (each entry has `id`, `category`, `price`/`originalPrice`, `affiliateUrl`, `comparePrices[]`, `priceHistory`, `badge`, etc.)
- `CATEGORIES` — drives the category filter UI
- `RETAILERS` — color/label config for retailer badges
- `WISHLIST_OCCASIONS` — used by the wishlist page
- `img(asin)` helper — wraps Amazon product images through the `wsrv.nl` proxy for resizing/whitening

Pages like `/product/[id]` and `/browse` look up entries by `id` from this same array; `/sitemap.js` and `/robots.js` are also static.

### Routing

Standard App Router under `src/app/`: `page.js` (home), `browse/`, `wishlist/`, `guides/` (+ `guides/[id]`), `product/[id]`, `about/`, `privacy/`. Path alias `@/*` → `src/*` is defined in `jsconfig.json`.

### Styling

Styling is **not** primarily Tailwind. The pattern is:
1. CSS variables defined in `src/app/globals.css` under `:root`/`[data-theme="dark"]` and `[data-theme="light"]` (e.g. `--bg-main`, `--accent`, `--text-primary`).
2. Components consume those variables via inline `style={{ ... }}` props — see `src/app/page.js` and `src/components/DealCard.js`.
3. `ThemeToggle` flips `data-theme` on `<html>` and persists the choice in `localStorage` under `cpd-theme`.

Tailwind is configured (`tailwind.config.js`) and base directives are imported, but most layout/color work goes through CSS variables + inline styles. The `brand`/`cream`/Jost/Cormorant config in `tailwind.config.js` does not match the live design (DM Sans / DM Serif Display, green `#00D084` accent loaded via Google Fonts in `globals.css`) — treat the CSS-variable system as authoritative.

### Client-side persistence

Browser `localStorage` keys the app uses (no server state):
- `cpd-theme` — `'dark' | 'light'`
- `cpd-wishlist` — array of saved deal snapshots (written from `DealCard`)
- `cpd-lists` — wishlist "occasion" lists, seeded with defaults on first visit to `/wishlist`

Most pages and components are `'use client'` because they read/write `localStorage` or use `useState`.

### Images

`next.config.js` whitelists remote image domains: `images.unsplash.com`, `via.placeholder.com`, `m.media-amazon.com`, `images-na.ssl-images-amazon.com`, `wsrv.nl`. Add any new external image host here. Local product PNGs live both at the repo root and in `public/` — when referencing them from components, use the `public/` path (e.g. `/AnkerNano45GaNCharger.png`).

### SEO

`src/app/layout.js` defines the global `metadata` (OpenGraph, Twitter, Google Search Console verification). `src/app/sitemap.js` and `src/app/robots.js` are file-based App Router conventions — when adding a new top-level route or guide, also add its URL to `sitemap.js` (the guide list there is hand-maintained, not derived).

## Conventions to preserve

- Existing components use older JS idioms intentionally: `var`, `function(...) {...}` callbacks, no arrow functions in JSX handlers. Match the style of the file you are editing rather than modernizing it incidentally.
- Affiliate links in `DEALS` carry tracking params (`tag=clouddeals20-20`, `linkCode`, `linkId`). Preserve these exactly when editing — they are the monetization path.
