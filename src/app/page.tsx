import Link from "next/link";
import { primaryLinkClass, secondaryLinkClass } from "@/components/ui/button";
import { ProductCard } from "@/modules/catalog/components/product-card";
import { TeaArt } from "@/modules/catalog/components/tea-art";
import { getCatalog } from "@/modules/catalog/services/catalog-service";

export default function Home() {
  const { products } = getCatalog();
  return (
    <div>
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-12 lg:grid-cols-2 lg:px-8 lg:py-20">
        <div>
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[.25em] text-leaf"><span aria-hidden="true" className="h-px w-8 shrink-0 bg-amber" />From the hills of Darjeeling</p>
          <h1 className="mt-6 max-w-xl font-serif text-5xl font-medium leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">A little altitude.<br /><span className="italic text-estate">A lot of character.</span></h1>
          <p className="mt-6 max-w-lg text-lg leading-8 text-muted">Meet teas shaped by mountain mist, changing seasons, and the estates they call home. Find your next slow moment.</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link className={primaryLinkClass} href="/products">Explore our teas <span className="ml-4" aria-hidden="true">&rarr;</span></Link>
            <Link className={secondaryLinkClass} href="#collection">Meet the collection</Link>
          </div>
          <p className="mt-8 text-xs uppercase tracking-widest text-muted">Single estate &nbsp; / &nbsp; Whole leaf &nbsp; / &nbsp; Distinct harvests</p>
        </div>
        <div className="relative">
          <TeaArt type="Black Tea" className="aspect-square rounded-xl shadow-float" />
          <div className="absolute bottom-6 left-6 right-6 rounded-xl border border-surface/60 bg-surface/95 p-6 shadow-card">
            <p className="text-xs uppercase tracking-widest text-muted">The estate collection</p><p className="mt-2 font-serif text-2xl text-estate">Every harvest tells a different story.</p>
          </div>
        </div>
      </section>
      <section className="border-y border-line bg-mist px-6 py-8">
        <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-3">
          {[["Know your origin", "Estate, elevation, and harvest details."], ["Find your flavor", "From delicate florals to deep muscatel."], ["Make it your ritual", "Brewing notes for every tea."]].map(([title, detail]) => (
            <div key={title}><h2 className="font-serif text-xl font-medium text-estate">{title}</h2><p className="mt-2 text-sm text-muted">{detail}</p></div>
          ))}
        </div>
      </section>
      <section id="collection" className="mx-auto max-w-7xl px-6 pt-16 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
          <div><p className="text-xs font-semibold uppercase tracking-widest text-leaf">Discover your daily cup</p><h2 className="mt-3 text-3xl font-semibold">The estate collection</h2></div>
          <Link href="/products" className="text-sm font-semibold text-estate underline underline-offset-4">View all {products.length} teas</Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{products.slice(0, 3).map((product) => <ProductCard key={product.product_id} product={product} />)}</div>
        <p className="mt-6 text-xs text-muted">Illustrative packaging. Product details and inventory are dummy data; purchases are unavailable.</p>
      </section>
    </div>
  );
}
