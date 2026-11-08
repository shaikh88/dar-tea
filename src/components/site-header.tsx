"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/modules/cart/components/cart-provider";

export function SiteHeader() {
  const { count } = useCart();
  const pathname = usePathname();
  const links = [
    { href: "/products", label: "Our teas" },
    { href: "/account", label: "Account demo" },
    { href: "/admin", label: "Admin demo" },
  ];
  return (
    <header className="border-b border-line bg-background">
      <div className="bg-estate px-4 py-2 text-center text-xs tracking-wide text-surface">
        A taste of the mountains. Phase 1 demo - no orders or payments.
      </div>
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-6 py-6 lg:px-8">
        <Link href="/" aria-label="Darjeeling home" className="flex items-center gap-3">
          <span aria-hidden="true" className="grid size-10 place-items-center rounded-xl bg-estate font-serif text-2xl text-surface shadow-card">d.</span>
          <span><span className="block font-serif text-2xl tracking-tight text-estate">darjeeling</span><span className="block text-[10px] uppercase tracking-[.25em] text-muted">The estate collection</span></span>
        </Link>
        <nav aria-label="Main navigation" className="order-3 flex w-full flex-wrap gap-6 text-sm sm:order-none sm:w-auto">
          {links.map(({ href, label }) => (
            <Link key={href} href={href} aria-current={pathname.startsWith(href) ? "page" : undefined} className="border-b-2 border-transparent py-2 text-muted transition-colors duration-200 hover:border-amber hover:text-estate aria-[current=page]:border-amber aria-[current=page]:font-semibold aria-[current=page]:text-estate">{label}</Link>
          ))}
        </nav>
        <Link href="/cart" className="flex min-h-11 items-center gap-3 rounded-xl border border-control px-4 text-sm font-medium text-estate transition-colors duration-200 hover:bg-mist">
          Cart <span className="grid min-w-6 place-items-center rounded-xl bg-estate px-1 text-xs leading-6 text-surface">{count}</span>
        </Link>
      </div>
    </header>
  );
}
