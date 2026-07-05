import { render, screen, waitFor } from "@testing-library/react";
import GithubPulse from "./GithubPulse";
import "@testing-library/jest-dom";

const contributionsResponse = {
  total: { lastYear: 254 },
  contributions: [
    { date: "2025-07-06", count: 8, level: 3 },
    { date: "2025-07-07", count: 0, level: 0 },
    { date: "2025-07-08", count: 2, level: 1 },
  ],
};

const eventsResponse = [
  {
    type: "PushEvent",
    repo: { name: "OB-CODE/2025Website" },
    created_at: "2026-07-05T12:51:26Z",
    payload: { head: "ff7794f" },
  },
];

const commitResponse = {
  commit: { message: "Fix to moonlander size and hero landing" },
};

const mockFetch = (url: string) => {
  const jsonByUrl: Record<string, unknown> = {
    "github-contributions-api": contributionsResponse,
    "/events/public": eventsResponse,
    "/commits/": commitResponse,
  };
  const match = Object.keys(jsonByUrl).find((key) => url.includes(key));
  return Promise.resolve({
    ok: Boolean(match),
    json: () => Promise.resolve(match ? jsonByUrl[match] : {}),
  } as Response);
};

describe("GithubPulse Component", () => {
  beforeEach(() => {
    global.fetch = jest.fn(mockFetch) as jest.Mock;
  });

  test("renders the section label and profile link", async () => {
    render(<GithubPulse />);

    expect(screen.getByText("Recent activity")).toBeInTheDocument();
    const profileLink = screen.getByText("@OB-CODE");
    expect(profileLink).toHaveAttribute("href", "https://github.com/OB-CODE");

    // let the mocked fetches settle so state updates stay inside the test
    await screen.findByRole("img", { name: /contributions/ });
  });

  test("shows a loading skeleton, then the contribution heatmap", async () => {
    render(<GithubPulse />);

    expect(screen.getByTestId("github-pulse-skeleton")).toBeInTheDocument();

    const heatmap = await screen.findByRole("img", {
      name: /254 contributions in the last year/,
    });
    expect(heatmap).toBeInTheDocument();
    expect(
      screen.getByText(/contributions in the last year/)
    ).toBeInTheDocument();
  });

  test("shows the latest push with commit message", async () => {
    render(<GithubPulse />);

    expect(await screen.findByText(/latest push to/)).toBeInTheDocument();
    const repoLink = screen.getByText("2025Website");
    expect(repoLink).toHaveAttribute(
      "href",
      "https://github.com/OB-CODE/2025Website/commit/ff7794f"
    );
    expect(
      screen.getByText(/Fix to moonlander size and hero landing/)
    ).toBeInTheDocument();
  });

  test("falls back to a GitHub link when the fetch fails", async () => {
    global.fetch = jest.fn(() =>
      Promise.reject(new Error("network down"))
    ) as jest.Mock;

    render(<GithubPulse />);

    await waitFor(() => {
      expect(screen.getByText("see it on GitHub")).toBeInTheDocument();
    });
  });
});
