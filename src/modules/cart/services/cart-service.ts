import { z } from "zod";
import type { Product, ProductSku } from "../../catalog/validators/catalog";

export type CartItem = { sku: string; quantity: number };
export type CartLine = CartItem & { product: Product; variant: ProductSku };
export type CartResult =
  | { success: true; items: CartItem[] }
  | { success: false; error: string };

const quantitySchema = z.number().int().positive().max(9999);
const skuSchema = z.string().min(1).max(120);

function findSku(products: Product[], skuId: string) {
  for (const product of products) {
    const variant = product.skus.find((sku) => sku.sku === skuId && sku.is_active);
    if (variant) return { product, variant };
  }
}

export function changeCart(
  items: CartItem[],
  products: Product[],
  sku: string,
  quantity: number,
  action: "add" | "set" | "remove",
): CartResult {
  if (!skuSchema.safeParse(sku).success) return { success: false, error: "Invalid product selection." };
  if (action === "remove") {
    if (!items.some((item) => item.sku === sku)) return { success: false, error: "This item is no longer in your cart." };
    return { success: true, items: items.filter((item) => item.sku !== sku) };
  }
  if (!quantitySchema.safeParse(quantity).success) {
    return { success: false, error: "Enter a whole quantity between 1 and 9999." };
  }
  const found = findSku(products, sku);
  if (!found) return { success: false, error: "This product option is unavailable." };
  const existing = items.find((item) => item.sku === sku);
  if (action === "set" && !existing) return { success: false, error: "This item is no longer in your cart." };
  const nextQuantity = action === "add" ? (existing?.quantity ?? 0) + quantity : quantity;
  if (nextQuantity > found.variant.inventory_quantity || nextQuantity > 9999) {
    return { success: false, error: `Only ${Math.min(found.variant.inventory_quantity, 9999)} packs are available in this demo.` };
  }
  const nextItem = { sku, quantity: nextQuantity };
  return {
    success: true,
    items: existing
      ? items.map((item) => item.sku === sku ? nextItem : item)
      : [...items, nextItem],
  };
}

export function getCartLines(items: CartItem[], products: Product[]): CartLine[] {
  return items.map((item) => {
    const found = findSku(products, item.sku);
    if (!found) throw new Error(`Unknown cart SKU: ${item.sku}`);
    return { ...item, ...found };
  });
}

export function getCartSubtotal(lines: CartLine[]): number {
  const paise = lines.reduce(
    (total, line) => total + Math.round(line.variant.price * 100) * line.quantity, 0,
  );
  return paise / 100;
}
