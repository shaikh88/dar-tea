import { expect, test } from "@playwright/test";

function contrast(foreground: string, background: string) {
  const luminance = (color: string) => {
    const channels = color.match(/[\d.]+/g)?.slice(0, 3).map(Number);
    if (!channels || channels.length !== 3) throw new Error(`Unsupported color: ${color}`);
    const linear = channels.map((channel) => {
      const value = channel / 255;
      return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
    });
    return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
  };
  const values = [luminance(foreground), luminance(background)];
  return (Math.max(...values) + 0.05) / (Math.min(...values) + 0.05);
}

test("Misty Estate colors, self-hosted fonts, gradients, and shadows render", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("body")).toHaveCSS("background-color", "rgb(247, 245, 239)");
  await expect(page.locator("body")).toHaveCSS("color", "rgb(36, 51, 45)");
  await expect(page.locator("body")).toHaveCSS("font-family", /manrope/i);
  await expect(page.getByRole("heading", { level: 1 })).toHaveCSS("font-family", /fraunces/i);
  expect(await page.evaluate(async () => {
    await document.fonts.ready;
    return ["manrope", "fraunces"].every((name) =>
      [...document.fonts].some((font) => font.family.toLowerCase().includes(name) && font.status === "loaded"),
    );
  })).toBe(true);
  await expect(page.locator("main svg").first().locator("..")).toHaveCSS("background-image", /linear-gradient/);
  await expect(page.getByRole("article").first()).not.toHaveCSS("box-shadow", "none");
  await expect(page.locator("footer")).toHaveCSS("background-color", "rgb(23, 63, 53)");
});

test("text, actions, and control boundaries meet contrast thresholds", async ({ page, isMobile }) => {
  await page.goto("/products");
  const colors = await page.evaluate(() => {
    const readStyle = (selector: string) => {
      const element = document.querySelector(selector);
      if (!element) throw new Error(`Missing contrast target: ${selector}`);
      return getComputedStyle(element);
    };
    const body = readStyle("body");
    const description = readStyle("main > div > p:nth-of-type(2)");
    const button = readStyle('button[type="submit"]');
    const input = readStyle('input[type="search"]');
    const footer = readStyle("footer");
    return {
      body: [body.color, body.backgroundColor],
      description: [description.color, body.backgroundColor],
      button: [button.color, button.backgroundColor],
      footer: [footer.color, footer.backgroundColor],
      control: [input.borderTopColor, input.backgroundColor],
    };
  });
  for (const pair of [colors.body, colors.description, colors.button, colors.footer]) {
    expect(contrast(pair[0], pair[1])).toBeGreaterThanOrEqual(4.5);
  }
  expect(contrast(colors.control[0], colors.control[1])).toBeGreaterThanOrEqual(3);

  const button = page.getByRole("button", { name: "Apply filters" });
  if (!isMobile) {
    await button.hover();
    await expect(button).toHaveCSS("background-color", "rgb(66, 101, 83)");
    const hover = await button.evaluate((element) => {
      const style = getComputedStyle(element);
      return [style.color, style.backgroundColor];
    });
    expect(contrast(hover[0], hover[1])).toBeGreaterThanOrEqual(4.5);
  }
  const search = page.getByRole("searchbox");
  await search.focus();
  await expect(search).toHaveCSS("outline-style", "solid");
  await expect(search).toHaveCSS("outline-offset", "-2px");
  const focus = await search.evaluate((element) => {
    const style = getComputedStyle(element);
    return [style.outlineColor, style.backgroundColor];
  });
  expect(contrast(focus[0], focus[1])).toBeGreaterThanOrEqual(3);

  const footerLink = page.locator("footer").getByRole("link");
  await footerLink.focus();
  await expect(footerLink).toHaveCSS("outline-style", "solid");
  const footerFocus = await footerLink.evaluate((element) => {
    const footer = element.closest("footer");
    if (!footer) throw new Error("Missing footer focus background");
    return [getComputedStyle(element).outlineColor, getComputedStyle(footer).backgroundColor];
  });
  expect(contrast(footerFocus[0], footerFocus[1])).toBeGreaterThanOrEqual(3);
});

test("selected filters retain their value and reduced motion disables transitions", async ({ page }) => {
  await page.goto("/products?type=White%20Tea");
  await expect(page.getByRole("combobox", { name: "Tea type" })).toHaveText("White Tea");
  await expect(page.getByLabel("Tea type")).toHaveCSS("background-color", "rgb(229, 235, 226)");
  await expect(page.getByLabel("Tea type")).toHaveCSS("border-top-color", "rgb(23, 63, 53)");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.getByRole("article").first()).toHaveCSS("transition-duration", "0s");
  await expect(page.getByRole("button", { name: "Apply filters" })).toHaveCSS("transition-duration", "0s");
});
