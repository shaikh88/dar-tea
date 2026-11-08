import Link from "next/link";

const sections = [
  {
    href: "/admin/products",
    title: "Products",
    description: "Open the catalog reference or see the demo note.",
  },
  {
    href: "/admin/orders",
    title: "Orders",
    description: "Order administration is not available in this phase.",
  },
  {
    href: "/admin/customers",
    title: "Customers",
    description: "Customer records are not available in this phase.",
  },
];

export function AdminOverview() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-medium text-leaf">Admin demo</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Workspace overview
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
          A preview of the future store administration area. No operational
          tools or store data are connected.
        </p>
      </div>
      <section aria-label="Admin demo sections" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map(({ href, title, description }) => (
          <Link
            key={href}
            href={href}
            className="group rounded-xl border border-line bg-surface p-6 transition-colors hover:border-control focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-leaf"
          >
            <h2 className="text-lg font-semibold text-ink group-hover:text-estate">
              {title}
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              {description}
            </p>
            <span className="mt-4 inline-block text-sm font-semibold text-estate">
              Open section <span aria-hidden="true">→</span>
            </span>
          </Link>
        ))}
      </section>
    </div>
  );
}
