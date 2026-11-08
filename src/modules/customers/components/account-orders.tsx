import Link from "next/link";

export function AccountOrders() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-medium text-leaf">Customer area</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Orders
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
          Your order history will appear here when order features are available.
        </p>
      </div>
      <section
        aria-labelledby="orders-empty-heading"
        className="rounded-xl border border-line bg-surface px-6 py-12 text-center sm:px-12"
      >
        <div
          aria-hidden="true"
          className="mx-auto flex size-14 items-center justify-center rounded-full bg-mist text-2xl text-estate"
        >
          ◷
        </div>
        <h2
          id="orders-empty-heading"
          className="mt-5 text-xl font-semibold text-ink"
        >
          No demo orders to show
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">
          This screen does not use real customer or order data. Ordering and
          order placement are not part of this demo.
        </p>
        <Link
          href="/account"
          className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl bg-estate px-5 py-2.5 text-sm font-semibold text-surface hover:bg-leaf focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-leaf"
        >
          Back to account
        </Link>
      </section>
    </div>
  );
}
