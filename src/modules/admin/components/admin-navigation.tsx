"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/customers", label: "Customers" },
];

export function AdminNavigation() {
  const pathname = usePathname();

  return (
    <nav aria-label="Admin demo" className="flex flex-wrap gap-2">
      {links.map(({ href, label }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-leaf ${
              active
                ? "bg-estate text-surface"
                : "text-muted hover:bg-mist hover:text-estate"
            }`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
