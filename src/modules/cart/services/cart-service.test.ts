import { describe, expect, it } from "vitest";
import { getCatalog } from "../../catalog/services/catalog-service";
import { changeCart, getCartLines, getCartSubtotal } from "./cart-service";

const { products } = getCatalog();
const sku = products[0].skus[0].sku;
const initial = [{ sku, quantity: 1 }];

describe("cart service", () => {
  it("adds a product and merges repeated selections without mutating state", () => {
    expect(changeCart([], products, sku, 1, "add")).toEqual({ success: true, items: initial });
    expect(changeCart(initial, products, sku, 2, "add")).toEqual({
      success: true, items: [{ sku, quantity: 3 }],
    });
    expect(initial).toEqual([{ sku, quantity: 1 }]);
  });

  it("keeps different pack sizes separate", () => {
    const otherSku = products[0].skus[1].sku;
    const result = changeCart(initial, products, otherSku, 1, "add");
    expect(result).toEqual({
      success: true, items: [...initial, { sku: otherSku, quantity: 1 }],
    });
  });

  it("updates and removes cart items explicitly", () => {
    expect(changeCart(initial, products, sku, 4, "set")).toEqual({
      success: true, items: [{ sku, quantity: 4 }],
    });
    expect(changeCart(initial, products, sku, 0, "remove")).toEqual({ success: true, items: [] });
    expect(changeCart([], products, sku, 1, "set").success).toBe(false);
    expect(changeCart([], products, sku, 0, "remove").success).toBe(false);
  });

  it.each([0, -1, 1.5, NaN, Infinity, 10000])("rejects invalid quantity %s", (quantity) => {
    expect(changeCart(initial, products, sku, quantity, "set").success).toBe(false);
  });

  it("enforces combined stock limits on add and set", () => {
    const stock = products[0].skus[0].inventory_quantity;
    expect(changeCart(initial, products, sku, stock - 1, "add").success).toBe(true);
    expect(changeCart(initial, products, sku, stock, "add").success).toBe(false);
    expect(changeCart(initial, products, sku, stock + 1, "set").success).toBe(false);
  });

  it("rejects unavailable, inactive, and out-of-stock SKUs", () => {
    expect(changeCart([], products, "unknown", 1, "add").success).toBe(false);
    const unavailable = structuredClone(products);
    unavailable[0].skus[0].is_active = false;
    expect(changeCart([], unavailable, sku, 1, "add").success).toBe(false);
    unavailable[0].skus[0].is_active = true;
    unavailable[0].skus[0].inventory_quantity = 0;
    expect(changeCart([], unavailable, sku, 1, "add").success).toBe(false);
  });

  it("derives totals from catalog prices with integer-paise arithmetic", () => {
    const fractional = structuredClone(products);
    fractional[0].skus[0].price = 0.1;
    fractional[0].skus[1].price = 0.2;
    const items = [{ sku, quantity: 1 }, { sku: fractional[0].skus[1].sku, quantity: 1 }];
    expect(getCartSubtotal(getCartLines(items, fractional))).toBe(0.3);
    expect(getCartSubtotal(getCartLines(initial, products))).toBe(1450);
    expect(getCartSubtotal([])).toBe(0);
    expect(() => getCartLines([{ sku: "unknown", quantity: 1 }], products)).toThrow("Unknown cart SKU");
  });
});
