import Link from "next/link";

export function AccountAddresses() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-medium text-leaf">Customer area</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Addresses
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
          Delivery addresses would be kept here in a future version.
        </p>
      </div>
      <section
        aria-labelledby="addresses-empty-heading"
        className="rounded-xl border border-line bg-surface px-6 py-12 text-center sm:px-12"
      >
        <div
          aria-hidden="true"
          className="mx-auto flex size-14 items-center justify-center rounded-full bg-mist text-2xl text-estate"
        >
          ⌖
        </div>
        <h2
          id="addresses-empty-heading"
          className="mt-5 text-xl font-semibold text-ink"
        >
          No saved addresses
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">
          This demo does not store real addresses. Address management and saving
          are not enabled.
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
