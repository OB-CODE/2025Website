import { expect, test } from "@playwright/test";
import { mockGithubPulse } from "./helpers";

test.beforeEach(async ({ page }) => {
  await mockGithubPulse(page);
  await page.goto("/");
});

test.describe("home page", () => {
  test("has the expected title", async ({ page }) => {
    await expect(page).toHaveTitle("Mitch O'Brien | Software Engineer");
  });

  test("shows the hero with name, tagline and current role", async ({
    page,
  }) => {
    await expect(
      page.getByRole("heading", { level: 1, name: "Mitchell O'Brien" })
    ).toBeVisible();

    await expect(
      page.getByText(
        "Software engineer building products end-to-end. From database to pixel."
      )
    ).toBeVisible();

    const jobTitle = page.getByTestId("jobTitle");
    await expect(jobTitle).toContainText("Current role");
    await expect(jobTitle).toContainText("Liquidity Cube");
    await expect(jobTitle).toContainText("Principal, Strategy & Developer");
  });

  test("renders every main section", async ({ page }) => {
    for (const id of [
      "#personalHeading",
      "#projectsIndexContainer",
      "#experienceSection",
      "#aboutMeSection",
      "#contactSection",
    ]) {
      await expect(page.locator(id)).toBeAttached();
    }
  });

  test("confetti easter egg toggles on and times out", async ({ page }) => {
    const egg = page.getByTestId("confetti-egg");
    await egg.click();

    // Countdown pill appears and confetti canvas is drawn
    await expect(page.getByText("5s")).toBeVisible();
    await expect(egg).toContainText("🎉");

    // Clicking again dismisses it immediately
    await egg.click();
    await expect(page.getByText(/\ds/)).toBeHidden();
    await expect(egg).not.toContainText("🎉");
  });
});
