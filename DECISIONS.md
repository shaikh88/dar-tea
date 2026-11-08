# Architecture Decision Records

## ADR-001

Decision:
Use Next.js App Router

Reason:
Modern Next.js standard with server component support.

Status:
Accepted

---

## ADR-002

Decision:
Use Tailwind CSS

Reason:
Rapid development and maintainable design system.

Status:
Accepted

---

## ADR-003

Decision:
Use Modular Monolith

Reason:
Current scale does not justify microservices.

Status:
Accepted

---

## ADR-004

Decision:
Prefer PostgreSQL over MongoDB

Reason:
Strong transactional consistency for orders and payments.

Status:
Accepted

---

## ADR-005

Decision:
Keep Phase 1 frontend-only, using dummy product JSON without persistence or order placement.

Reason:
Phase 1 is focused on validating the storefront and cart experience. Database persistence and product/order operations are deferred to Phase 2.

Status:
Accepted

---

## ADR-006

Decision:
Use a single-store catalog with simple products and basic stock representation; keep the admin area as a non-operational shell in Phase 1.

Reason:
The initial product scope is small (10-20 products) and does not require marketplace or product-variant complexity.

Status:
Accepted

---

## ADR-007

Decision:
Promote the initial ADMIN account manually in the database once database-backed administration is introduced.

Reason:
This avoids adding an admin-provisioning flow before the application has persistent user records.

Status:
Accepted

---

## ADR-008

Decision:
Defer Auth.js and Google sign-in until Phase 2.

Reason:
Phase 1 is focused on the storefront and demo customer screens and does not require user authentication.

Status:
Accepted

---

## ADR-009

Decision:
Preserve the supplied dummy catalog's existing pack SKUs for display and cart selection in Phase 1.

Reason:
The fixture includes multiple weights and packaging formats per tea. Treating every tea as a
single fixed-price item would discard supplied data. This refines ADR-006 without adding
marketplace functionality or configurable variant management.

Status:
Accepted