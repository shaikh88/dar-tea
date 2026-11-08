# Product Requirements

## Overview

Build a simple e-commerce platform capable of supporting 10-20 products and approximately 100 concurrent users.

Target Market:
India

## Phase 1 Scope

- Responsive storefront with product listing, product details, search, and filtering
- Product data loaded from dummy JSON
- Cart with add, remove, and quantity updates; cart changes are not persisted
- Customer area screens (demo UI only)
- Admin shell only; product and order administration are placeholders
- No authentication, checkout, order placement, or persistent application data

The supplied Phase 1 fixture currently contains four tea products with seven pack SKUs.
Use those records as provided rather than inventing additional products. Pack selection
preserves the fixture's weight and packaging choices without adding variant administration.
Product imagery is illustrative until product photographs are supplied.

Phase 1 completion means the storefront and cart flows work with dummy data, customer area screens are present as demo UI, and the admin shell is present. No sign-in flow is required.

## Customer Features

These are the target customer capabilities. In Phase 1, the customer area is UI-only and does not read or persist real profile, order, or address data.

### Product Browsing

Users can:

- View products
- View product detail pages
- Search products
- Filter products

### Cart

Users can:

- Add products
- Remove products
- Update quantity

### Authentication

Users can:

- Sign in using Google

Google sign-in is a planned capability, but is not part of Phase 1.

### Customer Area

Users can:

- View profile
- View orders
- Manage addresses

## Admin Features

These are future operational capabilities. In Phase 1, the admin area is a non-operational shell.

Admins can:

- View products
- Create products
- Update products
- Archive products
- View customer orders

## Not Included In Phase 1

- Database persistence
- Authentication and Google sign-in
- Product CRUD
- Order placement or order management
- Payment Gateway
- Shipping Integration
- Inventory Synchronization
- Notifications
- Coupon System
- Loyalty System