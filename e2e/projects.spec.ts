import { expect, test } from "@playwright/test";
import { mockGithubPulse } from "./helpers";

test.beforeEach(async ({ page }) => {
  await mockGithubPulse(page);
  await page.goto("/");
  await page.locator("#projectsIndexContainer").scrollIntoViewIfNeeded();
});

test.describe("portfolio section", () => {
  test("shows the Portfolio heading and intro copy", async ({ page }) => {
    const portfolio = page.getByTestId("PortfolioHeader");
    await expect(
      portfolio.getByRole("heading", { name: "Portfolio" })
    ).toBeVisible();
    await expect(
      portfolio.getByText("A small collection of my projects.")
    ).toBeVisible();
  });

  test("renders a card for every project", async ({ page }) => {
    const cards = page.getByTestId("projectContainer");
    await expect(cards).toHaveCount(5);

    for (const name of [
      "indigo",
      "Pokemon Remastered",
      "Home Harvest",
      "Original Website",
      "Planner",
    ]) {
      await expect(cards.filter({ hasText: name })).toBeVisible();
    }
  });

  test("project links point to the live sites and open in a new tab", async ({
    page,
  }) => {
    const pokemonCard = page
      .getByTestId("projectContainer")
      .filter({ hasText: "Pokemon Remastered" });

    const websiteLink = pokemonCard.locator(
      'a[href="https://poke-battles-remastered.vercel.app/"]'
    );
    await expect(websiteLink).toBeVisible();
    await expect(websiteLink).toHaveAttribute("target", "_blank");

    const githubLink = pokemonCard.locator(
      'a[href="https://github.com/OB-CODE/PokeBattlesRemastered"]'
    );
    await expect(githubLink).toBeVisible();
    await expect(githubLink).toHaveAttribute("target", "_blank");
  });

  test("the Planner card carousel cycles through its images", async ({
    page,
  }) => {
    const plannerImage = page.getByAltText("Planner preview");
    await plannerImage.scrollIntoViewIfNeeded();
    await expect(plannerImage).toHaveAttribute("src", "/PlannerMain.webp");

    const next = page.getByRole("button", { name: "Next image" });
    await next.click();
    await expect(plannerImage).toHaveAttribute("src", "/PlannerCreate.webp");

    await next.click();
    await expect(plannerImage).toHaveAttribute("src", "/PlannerShopping.webp");

    // Wraps back around to the first image
    await next.click();
    await expect(plannerImage).toHaveAttribute("src", "/PlannerMain.webp");

    // Previous wraps backwards too
    await page.getByRole("button", { name: "Previous image" }).click();
    await expect(plannerImage).toHaveAttribute("src", "/PlannerShopping.webp");
  });
});
