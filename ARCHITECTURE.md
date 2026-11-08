# Architecture

## Architecture Style

Modular Monolith

## Frontend

Next.js App Router

## Authentication

Auth.js (planned; not part of Phase 1)

## Styling

Tailwind CSS
shadcn/ui

## Routing

Public

/
/products
/products/[slug]
/cart

Customer

/account
/account/orders
/account/addresses

Admin

/admin
/admin/products
/admin/orders
/admin/customers

## Business Modules

catalog
cart
customers
orders
payments
inventory
shipping
admin

## Phase 1 Scope

- App Router Setup
- Responsive storefront backed by dummy product JSON
- Cart interactions without persistence
- Customer area demo screens (no sign-in)
- Admin shell only (no operational admin features)
- No authentication, checkout, order placement, or database persistence

## Future Scope

- Auth.js / Google sign-in
- PostgreSQL and Prisma (Phase 2)
- Product CRUD and persistent customer/order data (Phase 2)
- Payments
- Fulfillment
- Notifications