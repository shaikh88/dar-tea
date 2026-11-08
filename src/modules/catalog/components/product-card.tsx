import Link from "next/link";
import { formatMoney } from "@/lib/money";
import { getActiveSkus, getStartingPrice } from "../services/product-options";
import type { Product } from "../validators/catalog";
import { TeaArt } from "./tea-art";

export function ProductCard({ product }: { product: Product }) {
  const active = getActiveSkus(product);
  const available = active.some((sku) => sku.inventory_quantity > 0);
  return (
    <article className="group overflow-hidden rounded-xl border border-line bg-surface shadow-card transition-[box-shadow,border-color] duration-300 hover:border-control hover:shadow-float focus-within:border-control focus-within:shadow-float">
      <Link href={`/products/${product.slug}`} className="block focus-visible:-outline-offset-4">
        <div className="relative">
          <TeaArt type={product.tea_type} className="aspect-[6/5]" />
          <span className="absolute left-4 top-4 rounded-xl bg-surface/95 px-3 py-2 text-xs font-medium text-estate-deep">{product.tea_type}</span>
          {!available && <span className="absolute bottom-4 left-4 rounded-xl bg-ink px-3 py-2 text-xs text-surface">Out of stock</span>}
        </div>
        <div className="p-6">
          <p className="text-xs uppercase tracking-widest text-muted">{product.flush}</p>
          <h3 className="mt-3 text-2xl font-medium leading-snug text-ink transition-colors duration-200 group-hover:text-estate">{product.title}</h3>
          <p className="mt-3 text-sm text-muted">{product.flavor_profile.slice(0, 3).join(" / ")}</p>
          <div className="mt-6 flex items-end justify-between gap-4 border-t border-mist pt-4">
            <p className="text-sm text-muted">From <span className="font-semibold text-ink">{formatMoney(getStartingPrice(product))}</span></p>
            <span className="text-sm font-medium text-estate">Explore tea <span aria-hidden="true">&rarr;</span></span>
          </div>
        </div>
      </Link>
    </article>
  );
}
