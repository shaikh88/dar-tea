# API Contracts

Product, cart, order, admin, and authentication endpoints below are planned contracts, not Phase 1 endpoints. Phase 1 reads dummy product JSON and does not provide sign-in, persist data, or place orders.

## Products

GET /api/products

Response

{
  products: []
}

---

GET /api/products/:slug

Response

{
  product: {}
}

## Cart

GET /api/cart

POST /api/cart

DELETE /api/cart/:itemId

## Orders

GET /api/orders

GET /api/orders/:id

POST /api/orders

Order endpoints are deferred until persistent order creation is in scope.

## Auth

Deferred; no authentication routes are required in Phase 1.

GET /api/auth/session

POST /api/auth/signin

POST /api/auth/signout

## Admin

GET /api/admin/products

POST /api/admin/products

PATCH /api/admin/products/:id