import source from "../../../../dummy_product_list.json";
import { catalogSchema } from "../validators/catalog";

const catalog = catalogSchema.parse(source);

export const catalogRepository = {
  getCatalog: () => catalog,
  findBySlug: (slug: string) =>
    catalog.products.find((product) => product.slug === slug),
};
