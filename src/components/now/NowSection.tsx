import { personalDetails } from "../PersonalHeading/personal-info";

const capitalise = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1);

/**
 * Placeholder section — swap these values for whatever is actually
 * current. Keep each one short; it reads as a status line, not a bio.
 */
const nowItems = [
  { label: "Building", value: "This website" },
  { label: "Learning", value: "Something new" },
  {
    label: "Off the clock",
    value: capitalise(personalDetails.offClock.join(", ")),
  },
];

const NowSection = () => {
  return (
    <section aria-label="Currently" className="border-t border-zinc-800/80">
      <div className="mx-auto grid max-w-5xl gap-6 px-6 py-10 sm:grid-cols-3">
        {nowItems.map((item) => (
          <div key={item.label} className="flex flex-col gap-1">
            <span className="text-xs uppercase tracking-[0.2em] text-zinc-500">
              {item.label}
            </span>
            <span className="text-sm text-zinc-200">{item.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NowSection;
