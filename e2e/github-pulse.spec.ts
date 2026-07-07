import { expect, test } from "@playwright/test";
import {
  MOCK_CONTRIBUTIONS,
  failGithubPulse,
  mockGithubPulse,
} from "./helpers";

test.describe("GitHub pulse section", () => {
  test("renders the contribution heatmap and latest push from the API", async ({
    page,
  }) => {
    await mockGithubPulse(page);
    await page.goto("/");

    const section = page.getByRole("region", {
      name: "Recent GitHub activity",
    });
    await expect(section.getByText("Recent activity")).toBeVisible();
    await expect(
      section.getByRole("link", { name: "@OB-CODE" })
    ).toHaveAttribute("href", "https://github.com/OB-CODE");

    // Heatmap aria-label reflects the mocked contribution total
    await expect(
      section.getByRole("img", {
        name: `GitHub contribution heatmap: ${MOCK_CONTRIBUTIONS.total.lastYear} contributions in the last year`,
      })
    ).toBeVisible();
    await expect(
      section.getByText("contributions in the last year")
    ).toBeVisible();

    // Latest push line from the mocked events + commit endpoints
    await expect(
      section.getByRole("link", { name: "2025Website" })
    ).toHaveAttribute(
      "href",
      "https://github.com/OB-CODE/2025Website/commit/abc1234def5678"
    );
    await expect(section.getByText(/Add playwright tests/)).toBeVisible();
  });

  test("falls back gracefully when the API is unreachable", async ({
    page,
  }) => {
    await failGithubPulse(page);
    await page.goto("/");

    const section = page.getByRole("region", {
      name: "Recent GitHub activity",
    });
    await expect(
      section.getByText(/Live activity is taking a nap/)
    ).toBeVisible();
    await expect(
      section.getByRole("link", { name: "see it on GitHub" })
    ).toHaveAttribute("href", "https://github.com/OB-CODE");
  });
});
