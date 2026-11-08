"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { formatMoney } from "@/lib/money";
import { useCart } from "@/modules/cart/components/cart-provider";
import { getActiveSkus, getDefaultSku } from "../services/product-options";
import type { Product } from "../validators/catalog";

export function ProductPurchase({ product }: { product: Product }) {
  const variants = getActiveSkus(product);
  const [selectedSku, setSelectedSku] = useState(getDefaultSku(product)?.sku ?? "");
  const variant = variants.find((sku) => sku.sku === selectedSku);
  const { addItem, lines, message, error } = useCart();
  if (!variant) return <p role="alert">This product has no available options.</p>;
  const inCart = lines.find((line) => line.sku === variant.sku)?.quantity ?? 0;
  const remaining = variant.inventory_quantity - inCart;
  return (
    <div className="mt-8 border-t border-line pt-8">
      <p className="text-3xl font-semibold">{formatMoney(variant.price)}
        {variant.compare_at_price !== null && variant.compare_at_price > variant.price && <span className="ml-3 text-lg font-normal text-muted"><span className="sr-only">Original price </span><s>{formatMoney(variant.compare_at_price)}</s></span>}
      </p>
      <Select id="pack" label="Choose your pack" value={selectedSku} onValueChange={setSelectedSku} className="mt-6" options={variants.map((sku) => ({
        value: sku.sku,
        label: `${sku.weight_grams}g - ${sku.packaging_type}${sku.inventory_quantity === 0 ? " (out of stock)" : ""}`,
      }))} />
      <p className="mt-3 text-sm text-muted">{variant.inventory_quantity > 0 ? `${variant.inventory_quantity} packs in demo stock${inCart ? ` / ${inCart} in your cart` : ""}` : "Out of stock"}</p>
      <Button onClick={() => addItem(variant.sku, 1)} disabled={remaining <= 0} className="mt-6 w-full">
        {remaining > 0 ? "Add to cart" : variant.inventory_quantity === 0 ? "Out of stock" : "Stock limit reached"}
      </Button>
      <p role="status" className="mt-3 min-h-6 text-sm text-estate">{message}</p>
      {error && <p role="alert" className="mt-2 text-sm text-red-800">{error}</p>}
      <Link href="/cart" className="mt-3 inline-block text-sm font-semibold text-estate underline underline-offset-4">View cart</Link>
      <p className="mt-4 text-xs leading-6 text-muted">Demo only. No checkout or payment. Your cart resets when this page is reloaded.</p>
    </div>
  );
}
