E-Commerce Platform Engineering Instructions
Purpose

This document defines the mandatory engineering standards for the E-Commerce Platform.

Its purpose is to ensure:

Consistent code quality
Predictable architecture
Minimal technical debt
No duplicate implementations
High maintainability
Safe future scalability

All engineers and AI coding assistants must follow these instructions when creating or modifying code.

Core Principles
Rule 1: Simplicity First

Always prefer the simplest solution that satisfies the requirement.

Avoid introducing:

unnecessary abstractions
unnecessary generic frameworks
premature optimizations
microservices
event buses
custom state management solutions

Unless explicitly required.

Rule 2: Modular Monolith

This application is intentionally designed as a modular monolith.

Do not create:

Plain Text
apps/
services/
microservices/

All business domains belong inside the Next.js application.

Business separation should be achieved through modules.

Rule 3: Single Source of Truth

Never duplicate business logic.

Bad:

TypeScript
calculateDiscount()
calculateDiscountForAdmin()

Good:

TypeScript
catalogService.calculateDiscount()
 

All consumers use the same implementation.

Technology Decisions

Approved technologies:

Frontend
Plain Text
Next.js App Router
TypeScript
TailwindCSS
shadcn/ui
Authentication
Plain Text
Auth.js (planned for Phase 2; not used in Phase 1)
Database
Plain Text
PostgreSQL
Prisma

PostgreSQL and Prisma are planned for Phase 2; Phase 1 uses dummy product JSON and has no database persistence.
Validation
Plain Text
Zod
Forms
Plain Text
React Hook Form
Icons
Plain Text
lucide-react

No additional frameworks should be introduced without approval.

Folder Structure

Must follow:

Plain Text
src/
 
├── app/
├── modules/
├── components/
├── lib/
├── hooks/
├── types/
├── db/
├── providers/
└── constants/
Module Ownership

Every business feature must belong to exactly one module.

Example:

Plain Text
catalog
cart
orders
customers
payments
shipping
inventory
admin

A feature must never exist in multiple modules.

Module Structure

Each module should follow:

Plain Text
module/
 
├── components/
├── services/
├── repositories/
├── types/
├── validators/
├── hooks/
└── actions/

Example:

Plain Text
modules/orders
 
├── components
├── services
├── repositories
├── types
├── validators
└── actions
Component Rules
Shared Components

Location:

Plain Text
components/ui

Examples:

Plain Text
Button
Modal
Table
Input

Shared components must be generic.

Allowed:

Plain Text
Button
Card
Table

Not Allowed:

Plain Text
OrderTable
ProductCard

These belong in their modules.

Component Size

Target:

Plain Text
< 200 lines

Hard limit:

Plain Text
300 lines

When exceeded:

split component
extract hooks
extract subcomponents
API Route Rules

Route handlers must remain thin.

Bad:

TypeScript
POST
↓
Business Logic
↓
Database Access

Good:

TypeScript
POST
↓
Validation
↓
Service
↓
Repository

Route handlers should:

validate input
call service
return response

Nothing more.

Business Logic Rules

Business logic belongs only in:

Plain Text
modules/*/services

Never place business logic in:

Plain Text
components
pages
route handlers
hooks
Database Rules

All database access must go through repositories.

Never do:

TypeScript
prisma.order.findMany()

inside:

Plain Text
component
route
service

Instead:

TypeScript
orderRepository.findById()

Benefits:

easier testing
easier migration
better separation
Validation Rules

Every external input must be validated.

Examples:

Plain Text
forms
query params
route params
webhooks
api requests

Use only:

Plain Text
Zod

Example:

TypeScript
const schema = z.object({
email: z.string().email(),
});
TypeScript Rules

Strict mode must remain enabled.

Never use:

TypeScript
any

Allowed only when:

third party limitation exists
documented justification provided

Prefer:

TypeScript
unknown

and proper type narrowing.

State Management

Default:

Plain Text
React State
Server Components
Server Actions

Do not introduce:

Plain Text
Redux
MobX
Recoil

unless a documented requirement exists.

For cart state:

Plain Text
Context API

is sufficient.

Authentication Rules

Allowed Roles:

Plain Text
USER
ADMIN
 

No additional roles without architectural review.

Authorization checks must occur:

Plain Text
server-side

Never rely solely on UI hiding.

Security Requirements

Mandatory:

Input Validation

All inputs validated using Zod.

Authentication

All protected routes require authentication.

Authorization

All admin routes require:

Plain Text
ADMIN

role verification.

Phase 1 exception: customer and admin demo screens are public, read-only placeholders with
no real account data or operational actions. Do not add authentication for these demo
screens. Enforce the rules above before introducing protected data or admin operations.

Secrets

Never expose:

Plain Text
API Keys
Database URLs
Tokens
Secrets

to frontend code.

Must reside:

Plain Text
.env
Logging Rules

Use structured logging.

Example:

TypeScript
logger.info({
orderId,
paymentId,
});

Do not use:

TypeScript
console.log()

inside production code.

Error Handling

Never swallow errors.

Bad:

TypeScript
catch {}

Good:

TypeScript
catch(error){
logger.error(error);
throw error;
}
Testing Requirements

Minimum coverage:

Services

Mandatory Unit Tests

Plain Text
Vitest
Critical User Flows

E2E Tests

Plain Text
Playwright

Flows:

Login
Product Browsing
Cart
Checkout
Admin Product Management

Add E2E coverage as each flow enters scope; Login, Checkout, and Admin Product Management are deferred beyond Phase 1.
Performance Requirements

Support target:

Plain Text
100 concurrent users

Optimization targets:

LCP
Plain Text
< 2.5 seconds
INP
Plain Text
< 200 ms
CLS
Plain Text
< 0.1
 

Use:

Plain Text
Next.js Image
Dynamic Imports
Server Components

where appropriate.

Dependency Management

Before installing a dependency:

Check if Next.js already provides functionality.
Check if existing libraries already solve the problem.
Verify package maintenance status.

Avoid dependency duplication.

Example:

Do not install:

Plain Text
axios

when:

Plain Text
fetch

is sufficient.

AI Agent Instructions

Before writing code:

Search for existing implementation.
Reuse existing services.
Reuse existing validators.
Reuse existing repositories.
Reuse existing UI components.

Never create duplicate functionality.

Before creating:

TypeScript
ProductService

verify one does not already exist.

Pull Request Checklist

Every PR must verify:

 No duplicated logic introduced
 No duplicated components introduced
 Types are strict
 Inputs validated
 Authorization enforced
 Tests added
 No console.log statements
 No unused dependencies
 No secrets committed
 Followed module boundaries
Long-Term Architecture Rule

Design every module as if it could become its own service in the future.

The module should:

own its business logic
expose clear interfaces
avoid direct coupling to other modules

However:

Do not implement microservices until a real business need exists.

I'd keep this alongside:

ARCHITECTURE.md → What we're building
INSTRUCTIONS.md → How we're building it
DECISIONS.md → Why specific architectural decisions were made (ADR-style)

That combination is usually enough to keep both human developers and AI agents aligned and prevent the project from accumulating architectural debt from day one.