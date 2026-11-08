# E-Commerce Platform

A modern e-commerce platform focused on the Indian market.

## Current Status

Phase 1 - Frontend Foundation (demo data; no order placement or persistence)

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui

Planned for future phases:

- Auth.js / Google sign-in
- PostgreSQL
- Prisma
- Razorpay
- Shiprocket
- Notifications
- Analytics

Phase 1 uses dummy product JSON. PostgreSQL and Prisma are planned for Phase 2.

## Local Development

```bash
npm install
npm run dev
```

Open http://localhost:3000. No database or authentication environment variables are required.

## Phase 1 Implementation

- Storefront: `/`, `/products`, and `/products/[slug]`
- Search by estate, name, tasting notes, description, or tags; filter by tea type and harvest; sort by price or name
- Product details include brewing instructions and source SKU pack selection
- In-memory cart: `/cart`, with stock limits, quantity controls, removal, and INR subtotals
- Customer demo: `/account`, `/account/orders`, `/account/addresses`
- Public, read-only admin shell: `/admin`, `/admin/products`, `/admin/orders`, `/admin/customers`

The supplied [product JSON](./dummy_product_list.json) is validated with Zod when loaded.
It currently contains four teas and seven pack SKUs; no products have been invented to reach the original 10-20 product target.
Illustrative SVG packaging is used because the source has no image URLs.
SKU selection uses the pack sizes already present in the data, not a configurable variant-management system.

Cart contents survive client-side navigation, including search/filter submissions, but reset on a full reload or in a new tab.
Cart changes do not reserve inventory. Stock, certifications, and product descriptions are dummy content.
No sign-in, persistent customer data, admin mutations, checkout, order placement, or payments are implemented.

## Validation

Run these commands manually:

```bash
npm run lint
npm run typecheck
npm test
npx playwright install chromium
npm run test:e2e
npm run build
npm run start
```

The browser suite starts its own development server at http://127.0.0.1:3100;
keep that port free. It covers desktop and mobile Chromium, catalog search/filter/sort,
pack selection, cart updates and reload reset, stock limits, invalid inputs, demo routes, and basic responsive/keyboard checks.
Unit tests cover source validation, catalog services, SKU availability, and cart calculations.
Production startup uses http://localhost:3000; stop an existing server on that port first.

Passing functional tests does not establish the 100-concurrent-user or Core Web Vitals targets.
Load and performance measurements are still required before claiming those targets are met.

## Documentation

- ARCHITECTURE.md
- INSTRUCTIONS.md
- PRODUCT_REQUIREMENTS.md
- ROADMAP.md
- DECISIONS.md
- DATABASE_DESIGN.md
- API_CONTRACTS.md
- UI_GUIDELINES.md
- AGENTS.md

## Core Principles

- Modular Monolith
- Domain Driven Design
- Reusable Components
- Server First Architecture
- Strong Type Safety
