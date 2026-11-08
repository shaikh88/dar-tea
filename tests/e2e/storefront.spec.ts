import { expect, test } from "@playwright/test";

const firstSlug = "/products/makaibari-organic-first-flush-spring-blossom";
const firstTitle = "Makaibari Organic First Flush Spring Blossom";

test("home, catalog search, filters, sorting, and empty states", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("A little altitude.");
  await page.getByRole("link", { name: "Explore our teas", exact: false }).first().click();
  await expect(page.getByRole("article")).toHaveCount(4);
  await page.getByRole("searchbox", { name: "Search teas" }).fill("muscatel grape");
  await page.getByRole("button", { name: "Apply filters" }).click();
  await expect(page.getByRole("article")).toHaveCount(1);
  await expect(page.getByRole("heading", { name: "Castleton Royal Muscatel Vintage Second Flush" })).toBeVisible();
  await page.getByRole("link", { name: "Clear filters" }).click();
  await expect(page.getByRole("searchbox")).toHaveValue("");
  await page.getByRole("combobox", { name: "Tea type" }).click();
  await page.getByRole("option", { name: "White Tea", exact: true }).click();
  await page.getByRole("button", { name: "Apply filters" }).click();
  await expect(page.getByRole("article")).toHaveCount(1);
  await expect(page.getByRole("heading", { name: "Gopaldhara White Peony Silver Needle" })).toBeVisible();
  await page.getByRole("link", { name: "Clear filters" }).click();
  await expect(page.getByRole("combobox", { name: "Tea type" })).toHaveText("All tea types");
  await expect(page.getByRole("article")).toHaveCount(4);
  await page.getByRole("combobox", { name: "Harvest", exact: true }).click();
  await page.getByRole("option", { name: "Autumnal Flush", exact: true }).click();
  await page.getByRole("button", { name: "Apply filters" }).click();
  await expect(page.getByRole("article")).toHaveCount(1);
  await expect(page.getByRole("heading", { name: "Puttabong Heritage Autumnal Ruby" })).toBeVisible();
  await page.getByRole("link", { name: "Clear filters" }).click();
  await expect(page.getByRole("combobox", { name: "Harvest", exact: true })).toHaveText("All harvests");
  await expect(page.getByRole("article")).toHaveCount(4);
  await page.getByRole("combobox", { name: "Sort by" }).click();
  await page.getByRole("option", { name: "Price: low to high", exact: true }).click();
  await page.getByRole("button", { name: "Apply filters" }).click();
  await expect(page.getByRole("article").first()).toContainText("Puttabong");
  await page.getByRole("searchbox").fill("no-such-tea");
  await page.getByRole("button", { name: "Apply filters" }).click();
  await expect(page.getByRole("heading", { name: "No teas found" })).toBeVisible();
});

test("pack selection, cart updates, search navigation preservation, and reload reset", async ({ page }) => {
  await page.goto(firstSlug);
  await expect(page.getByRole("heading", { name: firstTitle })).toBeVisible();
  await page.getByRole("combobox", { name: "Choose your pack" }).click();
  await page.getByRole("option", { name: /^250g -/ }).click();
  await page.getByRole("button", { name: "Add to cart" }).click();
  await page.getByRole("link", { name: "View cart", exact: true }).click();
  await expect(page.getByText("250g / Vacuum Sealed Pouch")).toBeVisible();
  await expect(page.getByRole("complementary")).toContainText("3,200");
  await page.getByRole("button", { name: /^Increase quantity/ }).click();
  await expect(page.getByRole("complementary")).toContainText("6,400");
  await page.getByRole("button", { name: /^Decrease quantity/ }).click();
  await expect(page.getByRole("complementary")).toContainText("3,200");

  await page.getByRole("link", { name: "Continue exploring" }).click();
  await page.getByRole("searchbox").fill("Makaibari");
  await page.getByRole("button", { name: "Apply filters" }).click();
  await expect(page.getByRole("article")).toHaveCount(1);
  await page.getByRole("link", { name: /^Cart / }).click();
  await expect(page.getByRole("complementary")).toContainText("3,200");
  await page.getByRole("button", { name: /^Remove / }).click();
  await expect(page.getByRole("heading", { name: "Your cup is waiting" })).toBeVisible();

  await page.getByRole("link", { name: "Explore our teas", exact: true }).click();
  await page.getByRole("article").filter({ hasText: firstTitle }).getByRole("link").click();
  await page.getByRole("combobox", { name: "Choose your pack" }).click();
  await page.getByRole("option", { name: /^100g -/ }).click();
  await page.getByRole("button", { name: "Add to cart" }).click();
  await page.getByRole("link", { name: "View cart", exact: true }).click();
  await expect(page.getByRole("complementary")).toContainText("1,450");
  await page.reload();
  await expect(page.getByRole("heading", { name: "Your cup is waiting" })).toBeVisible();
});

test("invalid inputs and unknown products have explicit feedback", async ({ page }) => {
  await page.goto("/products?sort=invalid");
  await expect(page.getByRole("main").getByRole("alert")).toContainText("Check your search filters");
  await page.goto("/products?type=nonexistent");
  await expect(page.getByRole("main").getByRole("alert")).toContainText("not in this collection");
  await page.goto("/products/missing-tea");
  await expect(page.getByRole("heading", { name: "This page is not in our collection" })).toBeVisible();
});

test("stock limits are enforced in the UI", async ({ page }) => {
  await page.goto("/products/castleton-royal-muscatel-second-flush");
  await page.getByRole("combobox", { name: "Choose your pack" }).click();
  await page.getByRole("option", { name: /^500g -/ }).click();
  await page.getByRole("button", { name: "Add to cart" }).click();
  await page.getByRole("link", { name: "View cart", exact: true }).click();
  const increase = page.getByRole("button", { name: /^Increase quantity/ });
  for (let count = 1; count < 15; count++) {
    await increase.click();
  }
  await expect(increase).toBeDisabled();
  await expect(page.getByRole("complementary")).toContainText("1,23,000");
});

test("demo routes are public, read-only, and have one main landmark", async ({ page }) => {
  for (const route of [
    "/account", "/account/orders", "/account/addresses",
    "/admin", "/admin/products", "/admin/orders", "/admin/customers",
  ]) {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("complementary", { name: "Demo information" })).toContainText(/no authentication/i);
    await expect(page.getByRole("main")).toHaveCount(1);
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    await expect(page.locator("form")).toHaveCount(0);
    await expect(page.locator('a[href*="/auth/"]')).toHaveCount(0);
  }
});

test("storefront fits the viewport and keyboard skip link works", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#main-content$/);
  for (const route of ["/", "/products", firstSlug, "/cart", "/account", "/admin"]) {
    await page.goto(route);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  }
});
