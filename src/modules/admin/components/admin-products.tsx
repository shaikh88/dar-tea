import Link from "next/link";

export function AdminProducts() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-medium text-leaf">Admin demo</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Products
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
          Product administration is a placeholder in Phase 1.
        </p>
      </div>
      <section
        aria-labelledby="products-placeholder-heading"
        className="rounded-xl border border-line bg-surface p-6 sm:p-8"
      >
        <h2
          id="products-placeholder-heading"
          className="text-xl font-semibold text-ink"
        >
          No product management here yet
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
          This demo has no admin product data or create, edit, archive, or save
          actions. You can visit the storefront catalog instead.
        </p>
        <Link
          href="/products"
          className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl border border-estate px-5 py-2.5 text-sm font-semibold text-estate hover:bg-mist focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-leaf"
        >
          Browse the storefront catalog
        </Link>
      </section>
    </div>
  );
}
