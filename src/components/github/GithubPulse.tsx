import { useEffect, useRef, useState } from "react";
import { Tooltip } from "react-tooltip";

const GITHUB_USER = "OB-CODE";
const PROFILE_URL = `https://github.com/${GITHUB_USER}`;
const CONTRIBUTIONS_API = `https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}?y=last`;
const EVENTS_API = `https://api.github.com/users/${GITHUB_USER}/events/public?per_page=30`;

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface ContributionsResponse {
  total: { lastYear: number };
  contributions: ContributionDay[];
}

interface LatestPush {
  repo: string;
  sha: string;
  date: string;
  message: string | null;
}

// Sequential zinc ramp on the zinc-950 surface: level 0 (no activity) sits
// just above the background, level 4 is near-white.
const LEVEL_CLASSES = [
  "bg-zinc-900",
  "bg-zinc-700",
  "bg-zinc-500",
  "bg-zinc-300",
  "bg-zinc-50",
];

/** Pad the first/last week with nulls so every column is a full Sun-Sat week. */
const buildWeeks = (days: ContributionDay[]) => {
  const weeks: (ContributionDay | null)[][] = [];
  let week: (ContributionDay | null)[] = [];
  days.forEach((day, index) => {
    if (index === 0) {
      week = Array<null>(new Date(day.date).getUTCDay()).fill(null);
    }
    week.push(day);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  });
  if (week.length > 0) {
    weeks.push([...week, ...Array<null>(7 - week.length).fill(null)]);
  }
  return weeks;
};

const relativeTime = (isoDate: string) => {
  const elapsedMs = Date.now() - new Date(isoDate).getTime();
  const hours = Math.round(elapsedMs / 3_600_000);
  if (hours < 1) return "just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days < 30) return `${days}d ago`;
  return `${Math.round(days / 30)}mo ago`;
};

const prettyDate = (isoDate: string) =>
  new Date(isoDate).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const fetchLatestPush = async (): Promise<LatestPush | null> => {
  const eventsResponse = await fetch(EVENTS_API);
  if (!eventsResponse.ok) return null;
  const events: {
    type: string;
    repo: { name: string };
    created_at: string;
    payload: { head?: string };
  }[] = await eventsResponse.json();
  const push = events.find((event) => event.type === "PushEvent");
  if (!push?.payload.head) return null;

  const latest: LatestPush = {
    repo: push.repo.name,
    sha: push.payload.head,
    date: push.created_at,
    message: null,
  };
  // The public events feed omits commit messages; look one up separately and
  // fall back to repo + time if that call fails.
  try {
    const commitResponse = await fetch(
      `https://api.github.com/repos/${push.repo.name}/commits/${push.payload.head}`
    );
    if (commitResponse.ok) {
      const commit: { commit: { message: string } } =
        await commitResponse.json();
      latest.message = commit.commit.message.split("\n")[0];
    }
  } catch {
    // keep message null
  }
  return latest;
};

const GithubPulse = () => {
  const [contributions, setContributions] =
    useState<ContributionsResponse | null>(null);
  const [latestPush, setLatestPush] = useState<LatestPush | null>(null);
  const [failed, setFailed] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    fetch(CONTRIBUTIONS_API)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json() as Promise<ContributionsResponse>;
      })
      .then((data) => {
        if (!cancelled) setContributions(data);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    fetchLatestPush()
      .then((push) => {
        if (!cancelled) setLatestPush(push);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  // Most recent weeks live on the right; start scrolled there on small screens.
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [contributions]);

  const weeks = contributions ? buildWeeks(contributions.contributions) : [];

  return (
    <section aria-label="Recent GitHub activity" className="border-t border-zinc-800/80">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-6 py-10">
        <div className="flex items-baseline justify-between gap-4">
          <span className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            Recent activity
          </span>
          <a
            href={PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-zinc-400 transition-colors hover:text-zinc-50"
          >
            @{GITHUB_USER}
          </a>
        </div>

        {failed ? (
          <p className="text-sm text-zinc-400">
            Live activity is taking a nap —{" "}
            <a
              href={PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-200 underline underline-offset-4 hover:text-zinc-50"
            >
              see it on GitHub
            </a>
            .
          </p>
        ) : !contributions ? (
          <div
            data-testid="github-pulse-skeleton"
            className="h-[88px] w-full animate-pulse rounded-md bg-zinc-900"
          />
        ) : (
          <>
            <div ref={scrollRef} className="overflow-x-auto">
              <div
                role="img"
                aria-label={`GitHub contribution heatmap: ${contributions.total.lastYear} contributions in the last year`}
                className="grid w-max grid-flow-col grid-rows-7 gap-[2px]"
              >
                {weeks.flat().map((day, index) =>
                  day ? (
                    <div
                      key={day.date}
                      data-tooltip-id="github-pulse-tooltip"
                      data-tooltip-content={`${day.count} contribution${
                        day.count === 1 ? "" : "s"
                      } · ${prettyDate(day.date)}`}
                      className={`h-2.5 w-2.5 rounded-[2px] ${LEVEL_CLASSES[day.level]}`}
                    />
                  ) : (
                    <div key={`pad-${index}`} className="h-2.5 w-2.5" />
                  )
                )}
              </div>
            </div>

            <div className="flex flex-col justify-between gap-2 text-xs text-zinc-500 sm:flex-row sm:items-center">
              <span>
                <span className="text-zinc-200">
                  {contributions.total.lastYear.toLocaleString()}
                </span>{" "}
                contributions in the last year
                {latestPush && (
                  <>
                    {" · latest push to "}
                    <a
                      href={`https://github.com/${latestPush.repo}/commit/${latestPush.sha}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-200 transition-colors hover:text-zinc-50"
                    >
                      {latestPush.repo.replace(`${GITHUB_USER}/`, "")}
                    </a>{" "}
                    {relativeTime(latestPush.date)}
                    {latestPush.message && ` — “${latestPush.message}”`}
                  </>
                )}
              </span>
              <span className="flex items-center gap-1" aria-hidden="true">
                Less
                {LEVEL_CLASSES.map((levelClass) => (
                  <span
                    key={levelClass}
                    className={`h-2.5 w-2.5 rounded-[2px] ${levelClass}`}
                  />
                ))}
                More
              </span>
            </div>
          </>
        )}
      </div>
      <Tooltip id="github-pulse-tooltip" />
    </section>
  );
};

export default GithubPulse;
