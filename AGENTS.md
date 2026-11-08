# Agent Instructions

Before making changes:

1. Read ARCHITECTURE.md
2. Read INSTRUCTIONS.md
3. Read PRODUCT_REQUIREMENTS.md

## Rules

Always:

- Search for existing implementation first
- Reuse components
- Reuse services
- Reuse validators
- Maintain strict typing

Never:

- Duplicate business logic
- Introduce new libraries unnecessarily
- Create alternate implementations

When uncertain:

Use the simplest implementation that follows existing patterns.

## Folder Ownership

Business logic belongs to modules.

Shared code belongs to shared folders.

Never create duplicate modules.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
