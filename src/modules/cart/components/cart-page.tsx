"use client";

import Link from "next/link";
import { primaryLinkClass, secondaryLinkClass } from "@/components/ui/button";
import { formatMoney } from "@/lib/money";
import { TeaArt } from "@/modules/catalog/components/tea-art";
import { useCart } from "./cart-provider";

export function CartPageContent() {
  const { lines, count, subtotal, setQuantity, removeItem, message, error } = useCart();
  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-widest text-leaf">Your next slow moment</p>
      <h1 className="mt-4 text-4xl font-bold">Your cart</h1>
      <p className="mt-4 text-muted">Demo cart only. Items stay during navigation and reset on reload.</p>
      <p role="status" className="mt-4 min-h-6 text-sm text-estate">{message}</p>
      {error && <p role="alert" className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-800">{error}</p>}
      {!lines.length ? (
        <section className="mt-6 rounded-xl border border-dashed border-control bg-surface px-6 py-16 text-center">
          <h2 className="text-2xl font-semibold">Your cup is waiting</h2><p className="mt-4 text-muted">Explore the estate collection and add a tea you would like to try.</p><Link href="/products" className={`${primaryLinkClass} mt-8`}>Explore our teas</Link>
        </section>
      ) : (
        <div className="mt-6 grid items-start gap-8 lg:grid-cols-[2fr_1fr]">
          <ul className="space-y-6">
            {lines.map(({ product, variant, sku, quantity }) => (
              <li key={sku} className="rounded-xl border border-line bg-surface p-6 shadow-card">
                <div className="flex items-start gap-4 sm:gap-6">
                  <TeaArt type={product.tea_type} className="size-20 shrink-0 rounded-xl sm:size-28" />
                  <div className="min-w-0 flex-1">
                    <Link href={`/products/${product.slug}`} className="font-semibold leading-6 text-ink hover:underline">{product.title}</Link>
                    <p className="mt-2 text-sm text-muted">{variant.weight_grams}g / {variant.packaging_type}</p>
                    <p className="mt-2 text-sm">{formatMoney(variant.price)} each</p>
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                      <div className="inline-flex items-center gap-4 rounded-xl border border-control p-1">
                        <button aria-label={`Decrease quantity of ${product.title} ${variant.weight_grams}g`} onClick={() => setQuantity(sku, quantity - 1)} disabled={quantity <= 1} className="size-10 rounded-xl hover:bg-mist disabled:text-control">-</button>
                        <span aria-label="Quantity" className="min-w-6 text-center font-medium">{quantity}</span>
                        <button aria-label={`Increase quantity of ${product.title} ${variant.weight_grams}g`} onClick={() => setQuantity(sku, quantity + 1)} disabled={quantity >= Math.min(variant.inventory_quantity, 9999)} className="size-10 rounded-xl hover:bg-mist disabled:text-control">+</button>
                      </div>
                      <span className="font-semibold">{formatMoney(variant.price * quantity)}</span>
                    </div>
                    <button onClick={() => removeItem(sku)} aria-label={`Remove ${product.title} ${variant.weight_grams}g`} className="mt-4 min-h-11 text-sm text-red-800 underline underline-offset-4">Remove</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <aside className="rounded-xl border border-line bg-mist p-8 shadow-card">
            <h2 className="text-2xl font-semibold">Cart summary</h2>
            <dl className="mt-6 space-y-4 text-sm"><div className="flex justify-between"><dt>Packs</dt><dd>{count}</dd></div><div className="flex justify-between border-t border-control pt-4 text-lg font-semibold"><dt>Subtotal</dt><dd>{formatMoney(subtotal)}</dd></div></dl>
            <p className="mt-6 text-sm leading-7 text-muted">Product subtotal only. Shipping and taxes are not calculated. Checkout, order placement, and payments are unavailable in Phase 1.</p>
            <Link href="/products" className={`${secondaryLinkClass} mt-6 w-full`}>Continue exploring</Link>
          </aside>
        </div>
      )}
    </div>
  );
}
