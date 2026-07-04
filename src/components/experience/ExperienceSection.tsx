import Heading2 from "../ui/Heading2";

/**
 * Placeholder section — replace these entries with real roles.
 * One line per role is enough; the projects below do the talking.
 */
const experience = [
  {
    role: "Software Engineer",
    company: "Company name",
    period: "2024 — Present",
    note: "One line on what you build and ship here.",
  },
  {
    role: "Previous role",
    company: "Company name",
    period: "2022 — 2024",
    note: "One line on the impact you had.",
  },
];

const ExperienceSection = () => {
  return (
    <div className="mx-auto w-full max-w-5xl px-6">
      <Heading2 inputString="Experience" />
      <div className="mt-8 flex flex-col">
        {experience.map((item, index) => (
          <div
            key={index}
            className="grid gap-1 border-t border-zinc-800/80 py-6 first:border-t-0 first:pt-0 sm:grid-cols-[1fr_auto] sm:gap-4"
          >
            <div className="flex flex-col gap-1">
              <div className="text-base font-medium text-zinc-50">
                {item.role}
                <span className="text-zinc-500"> · {item.company}</span>
              </div>
              <p className="text-sm text-zinc-400">{item.note}</p>
            </div>
            <div className="font-mono text-xs text-zinc-500 sm:pt-1">
              {item.period}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceSection;
