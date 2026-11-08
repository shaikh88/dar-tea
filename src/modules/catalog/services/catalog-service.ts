import { catalogRepository } from "../repositories/catalog-repository";
import type { CatalogQuery, Product } from "../validators/catalog";
import { getActiveSkus, getStartingPrice } from "./product-options";

export function getCatalog() {
  const catalog = catalogRepository.getCatalog();
  return {
    ...catalog,
    products: catalog.products.filter((product) => getActiveSkus(product).length > 0),
  };
}

export function getCatalogOptions() {
  const { products } = getCatalog();
  return {
    types: [...new Set(products.map((product) => product.tea_type))].sort(),
    flushes: [...new Set(products.map((product) => product.flush))].sort(),
  };
}

export function findProduct(slug: string) {
  const product = catalogRepository.findBySlug(slug);
  return product && getActiveSkus(product).length ? product : undefined;
}

export function filterProducts(products: Product[], query: CatalogQuery): Product[] {
  const words = query.q.toLowerCase().split(/\s+/).filter(Boolean);
  const filtered = products.filter((product) => {
    const searchable = [
      product.title, product.estate, product.description,
      ...product.tags, ...product.flavor_profile,
    ].join(" ").toLowerCase();
    return words.every((word) => searchable.includes(word))
      && (!query.type || product.tea_type === query.type)
      && (!query.flush || product.flush === query.flush);
  });
  return filtered.sort((a, b) => {
    if (query.sort === "price-asc") return getStartingPrice(a) - getStartingPrice(b);
    if (query.sort === "price-desc") return getStartingPrice(b) - getStartingPrice(a);
    if (query.sort === "name") return a.title.localeCompare(b.title);
    return 0;
  });
}
