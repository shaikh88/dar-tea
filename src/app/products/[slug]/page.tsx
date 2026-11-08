import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TeaArt } from "@/modules/catalog/components/tea-art";
import { ProductPurchase } from "@/modules/catalog/components/product-purchase";
import { findProduct, getCatalog } from "@/modules/catalog/services/catalog-service";
import { slugSchema } from "@/modules/catalog/validators/catalog";

export function generateStaticParams() {
  return getCatalog().products.map((product) => ({ slug: product.slug }));
}

async function getProduct(params: PageProps<"/products/[slug]">["params"]) {
  const parsed = slugSchema.safeParse((await params).slug);
  if (!parsed.success) notFound();
  const product = findProduct(parsed.data);
  if (!product) notFound();
  return product;
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const product = await getProduct(params);
  return { title: product.title, description: product.description };
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const product = await getProduct(params);
  const brew = product.brewing_instructions;
  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted"><Link href="/products" className="underline underline-offset-4">Our teas</Link><span aria-hidden="true"> / </span><span>{product.estate}</span></nav>
      <div className="grid items-start gap-12 lg:grid-cols-2">
        <div><TeaArt type={product.tea_type} className="aspect-square rounded-xl shadow-card" /><p className="mt-4 text-xs text-muted">Illustrative packaging, not product photography.</p></div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-leaf">{product.tea_type} / {product.harvest_year} harvest</p>
          <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight">{product.title}</h1>
          <p className="mt-4 text-sm text-muted">{product.estate} / {product.elevation_ft.toLocaleString("en-IN")} ft</p>
          <p className="mt-6 text-base leading-8 text-muted">{product.description}</p>
          <div className="mt-6 flex flex-wrap gap-3">{product.flavor_profile.map((flavor) => <span key={flavor} className="rounded-xl bg-mist px-4 py-2 text-xs font-medium text-estate-deep">{flavor}</span>)}</div>
          <ProductPurchase key={product.product_id} product={product} />
        </div>
      </div>
      <section className="mt-16 grid gap-8 rounded-xl border border-line bg-surface p-6 shadow-card sm:p-8 lg:grid-cols-2">
        <div><h2 className="text-2xl font-semibold">From the estate</h2><dl className="mt-6 space-y-4 text-sm">
          {[["Origin", product.location], ["Harvest", product.flush], ["Leaf grade", product.leaf_grade], ["Cup color", product.liquor_color], ["Certifications (dummy data)", product.certifications.join(", ") || "None listed"]].map(([label, value]) => <div key={label} className="grid gap-2 sm:grid-cols-[140px_1fr]"><dt className="text-muted">{label}</dt><dd>{value}</dd></div>)}
        </dl></div>
        <div><h2 className="text-2xl font-semibold">Your brewing ritual</h2><p className="mt-4 text-sm leading-7 text-muted">Give these whole leaves a little room to open. Start here, then adjust to your taste.</p><dl className="mt-6 grid grid-cols-2 gap-6">
          {[["Water temperature", `${brew.water_temperature_celsius} C`], ["Steep time", `${brew.steep_time_minutes} minutes`], ["Tea leaves", `${brew.leaf_quantity_grams} grams`], ["Water", `${brew.water_volume_ml} ml`]].map(([label, value]) => <div key={label}><dt className="text-xs uppercase tracking-wide text-muted">{label}</dt><dd className="mt-2 text-xl font-semibold text-estate">{value}</dd></div>)}
        </dl></div>
      </section>
    </div>
  );
}
