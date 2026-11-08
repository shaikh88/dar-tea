import type { Product, ProductSku } from "../validators/catalog";

export function getActiveSkus(product: Product): ProductSku[] {
  return product.skus.filter((sku) => sku.is_active);
}

export function getStartingPrice(product: Product): number {
  const prices = getActiveSkus(product).map((sku) => sku.price);
  if (!prices.length) throw new Error(`Product has no active SKUs: ${product.product_id}`);
  return Math.min(...prices);
}

export function getDefaultSku(product: Product): ProductSku | undefined {
  const active = getActiveSkus(product);
  return active.find((sku) => sku.inventory_quantity > 0) ?? active[0];
}
