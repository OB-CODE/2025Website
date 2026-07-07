import { expect, test } from "@playwright/test";
import { mockContactFormEndpoint, mockGithubPulse } from "./helpers";

test.beforeEach(async ({ page }) => {
  await mockGithubPulse(page);
  await mockContactFormEndpoint(page);
  await page.goto("/");
  await page.getByRole("button", { name: "Contact Me" }).click();
});

test.describe("contact modal", () => {
  test("opens with contact details and the email form", async ({ page }) => {
    const modal = page.locator("#messageContainer");
    await expect(
      modal.getByRole("heading", { name: "Contact Me" })
    ).toBeVisible();
    await expect(modal.getByText("Sydney, Australia")).toBeVisible();
    await expect(
      modal.getByText("mitchell.s.obrien@gmail.com")
    ).toBeVisible();
    await expect(modal.getByPlaceholder("Your name")).toBeVisible();
    await expect(modal.getByPlaceholder("Your Email")).toBeVisible();
    await expect(
      modal.getByPlaceholder("Type your message here...")
    ).toBeVisible();
  });

  test("the Close button dismisses the modal", async ({ page }) => {
    await page.getByRole("button", { name: "Close" }).click();
    await expect(page.locator("#messageContainer")).toBeHidden();
  });

  test("clicking the backdrop dismisses the modal", async ({ page }) => {
    await page.getByTestId("modalBackground").click({ position: { x: 5, y: 5 } });
    await expect(page.locator("#messageContainer")).toBeHidden();
  });
});

test.describe("contact form validation", () => {
  test("rejects an empty submission", async ({ page }) => {
    await page.getByRole("button", { name: "Contact Mitch" }).click();
    await expect(page.getByText("Name is required.").first()).toBeVisible();
    await expect(page.locator("#messageContainer")).toBeVisible();
  });

  test("rejects an invalid email address", async ({ page }) => {
    await page.getByPlaceholder("Your name").fill("Test Person");
    // "test@example" passes the browser's native type="email" check but
    // fails the app's stricter regex (which requires a dot in the domain),
    // so the app's own validation toast is exercised.
    await page.getByPlaceholder("Your Email").fill("test@example");
    await page
      .getByPlaceholder("Type your message here...")
      .fill("Hello there!");

    await page.getByRole("button", { name: "Contact Mitch" }).click();

    // Toast (in addition to the inline hint next to the field)
    await expect(
      page.locator(".Toastify").getByText("Invalid email format.")
    ).toBeVisible();
    await expect(page.locator("#messageContainer")).toBeVisible();
  });

  test("submits a valid form and closes the modal", async ({ page }) => {
    await page.getByPlaceholder("Your name").fill("Test Person");
    await page.getByPlaceholder("Your Email").fill("test@example.com");
    await page
      .getByPlaceholder("Type your message here...")
      .fill("Hello from the Playwright suite!");

    await page.getByRole("button", { name: "Contact Mitch" }).click();

    await expect(page.getByText("Thank you for your message!")).toBeVisible();
    await expect(page.locator("#messageContainer")).toBeHidden({
      timeout: 5_000,
    });
  });
});

test.describe("footer", () => {
  test("shows social links and the copyright line", async ({ page }) => {
    // Close the modal opened by beforeEach so the footer is interactable
    await page.getByRole("button", { name: "Close" }).click();

    const footer = page.locator("footer");
    await expect(
      footer.getByRole("link", { name: "GitHub" })
    ).toHaveAttribute("href", "https://github.com/OB-CODE");
    await expect(
      footer.getByRole("link", { name: "LinkedIn" })
    ).toHaveAttribute("href", "https://linkedin.com/in/mitchellobriense01");

    const year = new Date().getFullYear();
    await expect(footer.getByText(`© ${year} - Mitch O'Brien`)).toBeVisible();
  });
});
