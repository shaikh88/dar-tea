import Link from "next/link";
import Form from "next/form";
import {
  filterProducts, getCatalog, getCatalogOptions,
} from "../services/catalog-service";
import { catalogQuerySchema } from "../validators/catalog";
import { ProductCard } from "./product-card";
import { primaryLinkClass, secondaryLinkClass } from "@/components/ui/button";
import { Select } from "@/components/ui/select";

type SearchParams = Record<string, string | string[] | undefined>;

export async function CatalogBrowser({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;
  const parsed = catalogQuerySchema.safeParse(params);
  const { types, flushes } = getCatalogOptions();
  if (!parsed.success) {
    return (
      <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-8">
        <h2 className="text-xl font-semibold">Check your search filters</h2>
        <p className="mt-3 text-sm text-red-800">Use a search of up to 120 characters, one value per filter, and a supported sort option.</p>
        <Link href="/products" className={`${secondaryLinkClass} mt-6`}>Reset filters</Link>
      </div>
    );
  }
  const query = parsed.data;
  const invalidFilter = (query.type && !types.includes(query.type)) || (query.flush && !flushes.includes(query.flush));
  const products = invalidFilter ? [] : filterProducts(getCatalog().products, query);
  return (
    <>
      <Form key={JSON.stringify(query)} action="/products" className="grid items-end gap-4 rounded-xl border border-line bg-surface p-6 shadow-card md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_auto]">
        <div>
          <label htmlFor="tea-search" className="text-sm font-medium">Search teas</label>
          <input id="tea-search" name="q" type="search" defaultValue={query.q} maxLength={120} placeholder="Estate, flavor, or tea..." className="field-control mt-2 min-h-12 w-full rounded-xl px-4 font-normal placeholder:text-muted" autoComplete="off"/>
        </div>
        <Select id="tea-type" label="Tea type" name="type" defaultValue={query.type} options={[
          { value: "", label: "All tea types" },
          ...(query.type && !types.includes(query.type) ? [{ value: query.type, label: "Unknown tea type" }] : []),
          ...types.map((type) => ({ value: type, label: type })),
        ]} />
        <Select id="tea-harvest" label="Harvest" name="flush" defaultValue={query.flush} options={[
          { value: "", label: "All harvests" },
          ...(query.flush && !flushes.includes(query.flush) ? [{ value: query.flush, label: "Unknown harvest" }] : []),
          ...flushes.map((flush) => ({ value: flush, label: flush })),
        ]} />
        <Select id="tea-sort" label="Sort by" name="sort" defaultValue={query.sort} options={[
          { value: "featured", label: "Featured" },
          { value: "price-asc", label: "Price: low to high" },
          { value: "price-desc", label: "Price: high to low" },
          { value: "name", label: "Name: A to Z" },
        ]} />
        <button type="submit" className={primaryLinkClass}>Apply filters</button>
      </Form>
      {invalidFilter && <p role="alert" className="mt-6 text-red-800">That tea type or harvest is not in this collection. Choose an available filter.</p>}
      <div className="my-8 flex items-center justify-between gap-4">
        <p className="text-sm text-muted">{products.length} {products.length === 1 ? "tea" : "teas"} in the collection</p>
        <Link href="/products" className="text-sm font-semibold text-estate underline underline-offset-4">Clear filters</Link>
      </div>
      {products.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{products.map((product) => <ProductCard key={product.product_id} product={product} />)}</div>
      ) : (
        <div className="rounded-xl border border-dashed border-control p-12 text-center"><h2 className="text-2xl font-semibold">No teas found</h2><p className="mt-3 text-muted">Try a different flavor, estate, or harvest.</p><Link className={`${secondaryLinkClass} mt-6`} href="/products">Show all teas</Link></div>
      )}
    </>
  );
}
