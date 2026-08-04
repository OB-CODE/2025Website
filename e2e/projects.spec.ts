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
    // The web projects are a grid; the phone projects are a deck showing one card at a
    // time, so only the top of that deck is mounted alongside them.
    const cards = page.getByTestId("projectContainer");
    await expect(cards).toHaveCount(5);

    for (const name of [
      "Liquidity Cube",
      "indigo",
      "Pokemon Remastered",
      "Home Harvest",
      "Personal Board",
    ]) {
      await expect(cards.filter({ hasText: name })).toBeVisible();
    }
  });

  test("the phone deck opens on Personal Board and rotates between projects", async ({
    page,
  }) => {
    const deck = page.getByTestId("projectCarousel");
    await deck.scrollIntoViewIfNeeded();

    // Only ever one card on top of the deck, and it names itself in its header.
    const cardName = deck.getByTestId("projectContainer");
    await expect(cardName).toHaveCount(1);
    await expect(cardName).toContainText("Personal Board");

    await deck.getByRole("button", { name: "Next project" }).click();
    await expect(cardName).toContainText("Planner");

    // Wraps back around to the first card
    await deck.getByRole("button", { name: "Next project" }).click();
    await expect(cardName).toContainText("Personal Board");

    // The dots jump straight to a card
    await deck.getByRole("button", { name: "Show Planner" }).click();
    await expect(cardName).toContainText("Planner");
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
    // Planner sits behind Personal Board in the deck, so rotate to it first.
    const plannerCard = page.getByTestId("projectCarousel");
    await plannerCard.scrollIntoViewIfNeeded();
    await plannerCard.getByRole("button", { name: "Show Planner" }).click();

    const plannerImage = plannerCard.getByAltText("Planner preview");
    await expect(plannerImage).toHaveAttribute("src", "/PlannerMain.webp");

    const next = plannerCard.getByRole("button", { name: "Next image" });
    await next.click();
    await expect(plannerImage).toHaveAttribute("src", "/PlannerCreate.webp");

    await next.click();
    await expect(plannerImage).toHaveAttribute("src", "/PlannerShopping.webp");

    // Wraps back around to the first image
    await next.click();
    await expect(plannerImage).toHaveAttribute("src", "/PlannerMain.webp");

    // Previous wraps backwards too
    await plannerCard.getByRole("button", { name: "Previous image" }).click();
    await expect(plannerImage).toHaveAttribute("src", "/PlannerShopping.webp");
  });
});
