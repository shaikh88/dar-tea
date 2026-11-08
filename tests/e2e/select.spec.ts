import { expect, test } from "@playwright/test";

test("custom dropdown supports keyboard navigation, typeahead, and dismissal without submitting", async ({ page }) => {
  await page.goto("/products");
  await expect(page.locator("select")).toHaveCount(0);
  const type = page.getByRole("combobox", { name: "Tea type", exact: true });
  await type.focus();
  await expect(type).toHaveCSS("outline-width", "2px");
  await expect(type).toHaveCSS("outline-offset", "-2px");
  await type.press("ArrowDown");
  await expect(type).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByRole("listbox", { name: "Tea type" })).toBeVisible();
  await expect(page.getByRole("option", { name: "All tea types" })).toHaveAttribute("aria-selected", "true");
  await type.press("ArrowDown");
  await type.press("Enter");
  await expect(type).toHaveText("Black Tea");
  await expect(type).toBeFocused();
  await expect(page.locator('input[name="type"]')).toHaveValue("Black Tea");
  await expect(page.getByRole("listbox")).toHaveCount(0);
  await expect(page).toHaveURL(/\/products$/);

  await type.press(" ");
  await type.press("End");
  await expect(type).toHaveAttribute("aria-activedescendant", "tea-type-option-2");
  await type.press("Home");
  await expect(type).toHaveAttribute("aria-activedescendant", "tea-type-option-0");
  await type.press("ArrowUp");
  await expect(type).toHaveAttribute("aria-activedescendant", "tea-type-option-2");
  await type.press("Escape");
  await expect(type).toHaveText("Black Tea");
  await expect(type).toHaveAttribute("aria-expanded", "false");
  await expect(type).toBeFocused();

  await type.press("w");
  await type.press("h");
  await expect(type).toHaveAttribute("aria-activedescendant", "tea-type-option-2");
  await type.press("Enter");
  await expect(type).toHaveText("White Tea");
  await type.press("Enter");
  await type.press("Tab");
  await expect(type).toHaveAttribute("aria-expanded", "false");
  await expect(page.getByRole("combobox", { name: "Harvest", exact: true })).toBeFocused();
  await expect(page).toHaveURL(/\/products$/);

  await type.click();
  await page.getByRole("searchbox").click();
  await expect(type).toHaveAttribute("aria-expanded", "false");
  await expect(type).toHaveText("White Tea");
  await page.getByRole("button", { name: "Apply filters" }).click();
  await expect(page).toHaveURL(/type=White\+Tea/);
  await expect(page.getByRole("article")).toHaveCount(1);
  await page.getByRole("link", { name: "Clear filters" }).click();
  await expect(type).toHaveText("All tea types");
});

test("only one menu opens at a time and menus stay within a small viewport", async ({ page, isMobile }) => {
  await page.setViewportSize({ width: 360, height: 480 });
  await page.goto("/products");
  const type = page.getByRole("combobox", { name: "Tea type", exact: true });
  const harvest = page.getByRole("combobox", { name: "Harvest", exact: true });
  if (isMobile) {
    await type.tap();
    await expect(type).toHaveAttribute("aria-expanded", "true");
    await type.tap();
    await expect(type).toHaveAttribute("aria-expanded", "false");
    await harvest.tap();
  } else {
    await type.click();
    await harvest.click();
  }
  await expect(page.getByRole("listbox")).toHaveCount(1);
  const list = page.getByRole("listbox", { name: "Harvest", exact: true });
  await expect(list).toBeVisible();
  await expect(async () => {
    const bounds = await list.evaluate((element) => {
      const rect = element.getBoundingClientRect();
      return { top: rect.top, bottom: rect.bottom, left: rect.left, right: rect.right, width: window.innerWidth, height: window.innerHeight };
    });
    expect(bounds.top).toBeGreaterThanOrEqual(0);
    expect(bounds.left).toBeGreaterThanOrEqual(0);
    expect(bounds.right).toBeLessThanOrEqual(bounds.width);
    expect(bounds.bottom).toBeLessThanOrEqual(bounds.height);
  }).toPass();
  const spring = page.getByRole("option", { name: "First Flush (Spring)", exact: true });
  if (isMobile) await spring.tap();
  else await spring.click();
  await expect(page.getByRole("combobox", { name: "Harvest", exact: true })).toHaveText("First Flush (Spring)");
  await expect(page.getByRole("listbox")).toHaveCount(0);
});

test("multiword typeahead matches harvest labels without committing on a space", async ({ page }) => {
  await page.goto("/products");
  const harvest = page.getByRole("combobox", { name: "Harvest", exact: true });
  await harvest.focus();
  await harvest.pressSequentially("First F");
  await expect(harvest).toHaveAttribute("aria-expanded", "true");
  await expect(harvest).toHaveText("All harvests");
  await harvest.press("Enter");
  await expect(harvest).toHaveText("First Flush (Spring)");
  await expect(page.locator('input[name="flush"]')).toHaveValue("First Flush (Spring)");
});

test("unknown filter values have explicit feedback and can be replaced using the dropdown", async ({ page }) => {
  await page.goto("/products?type=nonexistent");
  const type = page.getByRole("combobox", { name: "Tea type", exact: true });
  await expect(type).toHaveText("Unknown tea type");
  await expect(page.getByRole("main").getByRole("alert")).toContainText("not in this collection");
  await type.click();
  await expect(page.getByRole("option", { name: "Unknown tea type" })).toHaveAttribute("aria-selected", "true");
  await page.getByRole("option", { name: "All tea types" }).click();
  await page.getByRole("button", { name: "Apply filters" }).click();
  await expect(page.getByRole("article")).toHaveCount(4);
});
