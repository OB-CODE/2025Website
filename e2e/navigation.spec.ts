import { expect, test } from "@playwright/test";
import { mockGithubPulse } from "./helpers";

test.beforeEach(async ({ page }) => {
  await mockGithubPulse(page);
  await page.goto("/");
});

test.describe("desktop navigation", () => {
  test("header shows the brand and all nav links", async ({ page }) => {
    const header = page.locator("header");
    await expect(
      header.getByRole("button", { name: "Mitch O'Brien" })
    ).toBeVisible();

    for (const label of [
      "Home",
      "Projects",
      "Experience",
      "About",
      "Contact",
    ]) {
      await expect(
        header.getByRole("button", { name: label, exact: true })
      ).toBeVisible();
    }
  });

  test("clicking a nav link scrolls to that section", async ({ page }) => {
    await page
      .locator("header")
      .getByRole("button", { name: "Projects", exact: true })
      .click();

    await expect(page.locator("#projectsIndexContainer")).toBeInViewport();
    await expect
      .poll(() => page.evaluate(() => window.scrollY), { timeout: 5_000 })
      .toBeGreaterThan(0);
  });

  test("brand button scrolls back to the top", async ({ page }) => {
    await page
      .locator("header")
      .getByRole("button", { name: "Contact", exact: true })
      .click();
    await expect(page.locator("#contactSection")).toBeInViewport();

    await page
      .locator("header")
      .getByRole("button", { name: "Mitch O'Brien" })
      .click();
    await expect(page.locator("#personalHeading")).toBeInViewport();
  });
});

test.describe("mobile navigation", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("hamburger opens the menu and a link navigates then closes it", async ({
    page,
  }) => {
    // Desktop nav is hidden on small screens
    await expect(
      page.locator("header nav").getByRole("button", { name: "Home" })
    ).toBeHidden();

    await page.getByRole("button", { name: "Open menu" }).click();

    const menu = page.locator("#mobile-menu-portal");
    await expect(
      menu.getByRole("button", { name: "Navigate to Projects section" })
    ).toBeVisible();

    await menu
      .getByRole("button", { name: "Navigate to Projects section" })
      .click();

    await expect(menu.locator("div").first()).toBeHidden();
    await expect(page.locator("#projectsIndexContainer")).toBeInViewport();
  });

  test("the close button dismisses the menu without navigating", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Open menu" }).click();
    await expect(
      page
        .locator("#mobile-menu-portal")
        .getByRole("button", { name: "Navigate to Home section" })
    ).toBeVisible();

    await page.getByRole("button", { name: "Close menu" }).click();
    await expect(
      page
        .locator("#mobile-menu-portal")
        .getByRole("button", { name: "Navigate to Home section" })
    ).toBeHidden();
  });
});
