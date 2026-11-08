import { z } from "zod";

const skuSchema = z.object({
  sku: z.string().min(1),
  weight_grams: z.number().positive(),
  packaging_type: z.string().min(1),
  price: z.number().nonnegative().refine(
    (price) => Number.isSafeInteger(Math.round(price * 100)),
    "Price must fit within safe integer paise",
  ),
  compare_at_price: z.number().nonnegative().nullable(),
  inventory_quantity: z.number().int().nonnegative(),
  is_active: z.boolean(),
});

export const productSchema = z.object({
  product_id: z.string().min(1),
  title: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  estate: z.string().min(1),
  location: z.string().min(1),
  elevation_ft: z.number().positive(),
  harvest_year: z.number().int().positive(),
  flush: z.string().min(1),
  tea_type: z.string().min(1),
  leaf_grade: z.string().min(1),
  certifications: z.array(z.string()),
  flavor_profile: z.array(z.string()),
  liquor_color: z.string(),
  description: z.string().min(1),
  brewing_instructions: z.object({
    water_temperature_celsius: z.number().positive().max(100),
    steep_time_minutes: z.string().min(1),
    leaf_quantity_grams: z.number().positive(),
    water_volume_ml: z.number().positive(),
  }),
  tags: z.array(z.string()),
  skus: z.array(skuSchema).min(1),
});

export const catalogSchema = z.object({
  catalog_name: z.string().min(1),
  currency: z.literal("INR"),
  products: z.array(productSchema).min(1),
}).superRefine(({ products }, context) => {
  for (const key of ["product_id", "slug"] as const) {
    const values = products.map((product) => product[key]);
    if (new Set(values).size !== values.length) {
      context.addIssue({ code: "custom", message: `Duplicate product ${key}` });
    }
  }
  const skus = products.flatMap((product) => product.skus.map((sku) => sku.sku));
  if (new Set(skus).size !== skus.length) {
    context.addIssue({ code: "custom", message: "Duplicate SKU" });
  }
});

export const catalogQuerySchema = z.object({
  q: z.string().trim().max(120).default(""),
  type: z.string().max(80).default(""),
  flush: z.string().max(80).default(""),
  sort: z.enum(["featured", "price-asc", "price-desc", "name"]).default("featured"),
});

export const slugSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(200);

export type Product = z.infer<typeof productSchema>;
export type ProductSku = Product["skus"][number];
export type CatalogQuery = z.infer<typeof catalogQuerySchema>;
