export function AdminOrders() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-medium text-leaf">Admin demo</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Orders
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
          This page previews where order administration may live.
        </p>
      </div>
      <section
        aria-labelledby="admin-orders-heading"
        className="rounded-xl border border-line bg-surface p-6 sm:p-8"
      >
        <h2
          id="admin-orders-heading"
          className="text-xl font-semibold text-ink"
        >
          Order management is not available
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
          There are no real order records or order actions in this demo. Order
          placement and administration are outside Phase 1.
        </p>
      </section>
    </div>
  );
}
