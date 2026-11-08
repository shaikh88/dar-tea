import { describe, expect, it } from "vitest";
import {
  filterProducts, findProduct, getCatalog, getCatalogOptions,
} from "./catalog-service";
import { getActiveSkus, getDefaultSku, getStartingPrice } from "./product-options";
import { catalogQuerySchema, catalogSchema, slugSchema } from "../validators/catalog";
import source from "../../../../dummy_product_list.json";

const { products } = getCatalog();

describe("catalog validation", () => {
  it("loads every supplied product without changing the source", () => {
    expect(products).toHaveLength(source.products.length);
    expect(catalogSchema.safeParse(source).success).toBe(true);
    expect(getCatalog().currency).toBe("INR");
  });

  it("rejects malformed or duplicate catalog data", () => {
    expect(catalogSchema.safeParse({ ...source, currency: "USD" }).success).toBe(false);
    expect(catalogSchema.safeParse({ ...source, products: [source.products[0], source.products[0]] }).success).toBe(false);
    const invalid = structuredClone(source);
    invalid.products[0].skus[0].inventory_quantity = -1;
    expect(catalogSchema.safeParse(invalid).success).toBe(false);
  });

  it("validates query and slug inputs instead of silently defaulting bad values", () => {
    expect(catalogQuerySchema.parse({})).toEqual({ q: "", type: "", flush: "", sort: "featured" });
    expect(catalogQuerySchema.parse({ q: "  floral " }).q).toBe("floral");
    for (const query of [{ sort: "bad" }, { q: "a".repeat(121) }, { type: ["Black Tea", "White Tea"] }]) {
      expect(catalogQuerySchema.safeParse(query).success).toBe(false);
    }
    expect(slugSchema.safeParse("../secrets").success).toBe(false);
  });
});

describe("catalog service", () => {
  it("finds products by slug and handles missing products", () => {
    expect(findProduct(products[0].slug)?.product_id).toBe(products[0].product_id);
    expect(findProduct("unknown-tea")).toBeUndefined();
  });

  it("searches case-insensitively across estate, tasting notes, and title", () => {
    const query = catalogQuerySchema.parse({ q: "MAKAIBARI floral" });
    expect(filterProducts(products, query).map((product) => product.product_id)).toEqual(["DARJ-PROD-001"]);
    expect(filterProducts(products, catalogQuerySchema.parse({ q: "no-such-tea" }))).toEqual([]);
  });

  it("combines type and harvest filters", () => {
    const query = catalogQuerySchema.parse({ type: "Black Tea", flush: "First Flush (Spring)" });
    expect(filterProducts(products, query).map((product) => product.product_id)).toEqual(["DARJ-PROD-001"]);
    expect(filterProducts(products, catalogQuerySchema.parse({ type: "unknown" }))).toEqual([]);
    expect(getCatalogOptions().types).toContain("White Tea");
  });

  it("sorts by starting price and name without mutating the source array", () => {
    const original = products.map((product) => product.product_id);
    const asc = filterProducts(products, catalogQuerySchema.parse({ sort: "price-asc" }));
    const desc = filterProducts(products, catalogQuerySchema.parse({ sort: "price-desc" }));
    expect(asc.map(getStartingPrice)).toEqual([950, 1450, 1850, 2200]);
    expect(desc.map(getStartingPrice)).toEqual([2200, 1850, 1450, 950]);
    const names = filterProducts(products, catalogQuerySchema.parse({ sort: "name" })).map((product) => product.title);
    expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)));
    expect(products.map((product) => product.product_id)).toEqual(original);
  });

  it("uses only active SKUs and prefers an in-stock default", () => {
    const product = structuredClone(products[0]);
    product.skus[0].inventory_quantity = 0;
    expect(getDefaultSku(product)?.sku).toBe(product.skus[1].sku);
    product.skus[0].is_active = false;
    expect(getActiveSkus(product)).toHaveLength(1);
    expect(getStartingPrice(product)).toBe(product.skus[1].price);
    product.skus[1].is_active = false;
    expect(getDefaultSku(product)).toBeUndefined();
    expect(() => getStartingPrice(product)).toThrow("no active SKUs");
  });
});
