export function AdminCustomers() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-medium text-leaf">Admin demo</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Customers
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
          Customer records are not part of this public demo.
        </p>
      </div>
      <section
        aria-labelledby="admin-customers-heading"
        className="rounded-xl border border-line bg-surface p-6 sm:p-8"
      >
        <h2
          id="admin-customers-heading"
          className="text-xl font-semibold text-ink"
        >
          No customer data connected
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
          This screen does not display real customer information or provide
          customer management actions.
        </p>
      </section>
    </div>
  );
}
