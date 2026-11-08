import Link from "next/link";

export function AccountOverview() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-medium text-leaf">Your space</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Account overview
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
          A calm place to see your profile, orders, and delivery details.
        </p>
      </div>

      <section
        aria-labelledby="profile-heading"
        className="rounded-xl border border-line bg-surface p-6 sm:p-8"
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2
              id="profile-heading"
              className="text-xl font-semibold text-ink"
            >
              Profile
            </h2>
            <p className="mt-1 text-sm text-muted">
              Fictional demo details, not connected to a customer account.
            </p>
          </div>
          <span className="rounded-full bg-mist px-3 py-1 text-xs font-semibold text-estate">
            Sample profile
          </span>
        </div>
        <dl className="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <dt className="text-sm text-muted">Name</dt>
            <dd className="mt-1 font-medium text-ink">Mira Sen</dd>
          </div>
          <div>
            <dt className="text-sm text-muted">Email</dt>
            <dd className="mt-1 font-medium text-ink">
              mira.example@demo.invalid
            </dd>
          </div>
        </dl>
        <p className="mt-6 border-t border-mist pt-5 text-sm leading-6 text-muted">
          Profile editing is not available in this demo.
        </p>
      </section>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/account/orders"
          className="group rounded-xl border border-line bg-surface p-6 transition-colors hover:border-control focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-leaf"
        >
          <h2 className="text-lg font-semibold text-ink group-hover:text-estate">
            Your orders
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            Order history is not connected in this demo.
          </p>
          <span className="mt-4 inline-block text-sm font-semibold text-estate">
            View orders <span aria-hidden="true">→</span>
          </span>
        </Link>
        <Link
          href="/account/addresses"
          className="group rounded-xl border border-line bg-surface p-6 transition-colors hover:border-control focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-leaf"
        >
          <h2 className="text-lg font-semibold text-ink group-hover:text-estate">
            Saved addresses
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            No saved delivery details are available in this demo.
          </p>
          <span className="mt-4 inline-block text-sm font-semibold text-estate">
            View addresses <span aria-hidden="true">→</span>
          </span>
        </Link>
      </div>
    </div>
  );
}
