import type { Metadata } from "next";
import { Suspense } from "react";
import { CatalogBrowser } from "@/modules/catalog/components/catalog-browser";

export const metadata: Metadata = { title: "Our teas" };

export default function ProductsPage({ searchParams }: PageProps<"/products">) {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-widest text-leaf">A place, a season, a cup</p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight">Explore our teas</h1>
      <p className="mb-8 mt-4 max-w-2xl text-lg leading-8 text-muted">Discover the character of Darjeeling, one estate at a time. Search by flavor, or find your favorite harvest.</p>
      <Suspense fallback={<p role="status" className="py-12">Finding your teas...</p>}>
        <CatalogBrowser searchParams={searchParams} />
      </Suspense>
      <p className="mt-8 text-xs text-muted">Illustrative packaging. Prices and stock come from the supplied dummy catalog.</p>
    </div>
  );
}
