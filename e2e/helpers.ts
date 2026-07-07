import type { Page } from "@playwright/test";

const GITHUB_USER = "OB-CODE";

/**
 * Deterministic contribution data: 28 days ending on a fixed date, cycling
 * through levels 0-4 so every colour bucket appears in the heatmap.
 */
const buildContributions = () => {
  const days = [];
  const end = new Date("2026-07-04T00:00:00Z");
  let total = 0;
  for (let i = 27; i >= 0; i--) {
    const date = new Date(end);
    date.setUTCDate(end.getUTCDate() - i);
    const level = i % 5;
    total += level;
    days.push({
      date: date.toISOString().slice(0, 10),
      count: level,
      level,
    });
  }
  return { total: { lastYear: total }, contributions: days };
};

export const MOCK_CONTRIBUTIONS = buildContributions();

/**
 * Stub the three external GitHub endpoints GithubPulse hits so tests are
 * fast and deterministic, with no real network access.
 */
export const mockGithubPulse = async (page: Page) => {
  await page.route("https://github-contributions-api.jogruber.de/**", (route) =>
    route.fulfill({ json: MOCK_CONTRIBUTIONS })
  );

  await page.route(
    `https://api.github.com/users/${GITHUB_USER}/events/public**`,
    (route) =>
      route.fulfill({
        json: [
          {
            type: "PushEvent",
            repo: { name: `${GITHUB_USER}/2025Website` },
            created_at: new Date(Date.now() - 3 * 3_600_000).toISOString(),
            payload: { head: "abc1234def5678" },
          },
        ],
      })
  );

  await page.route("https://api.github.com/repos/**/commits/**", (route) =>
    route.fulfill({ json: { commit: { message: "Add playwright tests" } } })
  );
};

/** Make GithubPulse's contribution fetch fail so the fallback copy renders. */
export const failGithubPulse = async (page: Page) => {
  await page.route("https://github-contributions-api.jogruber.de/**", (route) =>
    route.abort()
  );
  await page.route("https://api.github.com/**", (route) => route.abort());
};

/** Swallow contact-form submissions so tests never hit the real endpoint. */
export const mockContactFormEndpoint = async (page: Page) => {
  await page.route("https://public.herotofu.com/**", (route) =>
    route.fulfill({ status: 200, json: { status: "ok" } })
  );
};
