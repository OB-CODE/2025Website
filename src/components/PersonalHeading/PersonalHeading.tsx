import { FiChevronDown } from "react-icons/fi";
import HeroCodeCard from "./HeroCodeCard";
import { personalDetails } from "./personal-info";

interface PersonalHeadingProps {
  id?: string;
}

const PersonalHeading = ({ id }: PersonalHeadingProps) => {
  return (
    <div
      id={id}
      className="relative flex min-h-[70vh] w-full items-center overflow-hidden px-6 py-20 md:min-h-[80vh]"
    >
      {/* Subtle dot-grid backdrop, faded at the edges */}
      <div
        aria-hidden="true"
        className="bg-dot-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_70%_at_center,black_30%,transparent_85%)]"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-5xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        {/* Left: name, tagline, current role */}
        <div className="flex min-w-0 flex-col gap-6">
          <h1 className="max-w-md text-5xl font-semibold tracking-tight text-zinc-50 md:text-7xl">
            {`${personalDetails.firstName} ${personalDetails.lastName}`}
          </h1>

          <p className="max-w-md text-lg leading-relaxed text-zinc-400">
            {personalDetails.tagline}
          </p>

          <div data-testid="jobTitle" className="mt-4 flex flex-col gap-1">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-500">
              Current role
            </span>
            <span className="text-2xl font-semibold text-zinc-50">
              {personalDetails.company}
            </span>
            <span className="text-sm text-zinc-400">
              {personalDetails.role}
            </span>
          </div>
        </div>

        {/* Right: terminal-style code card */}
        <HeroCodeCard />
      </div>

      {/* Scroll cue */}
      <div className="absolute inset-x-0 bottom-6 z-10 flex flex-col items-center gap-1 text-zinc-600">
        <span className="text-[10px] uppercase tracking-[0.3em]">scroll</span>
        <FiChevronDown size={16} className="motion-safe:animate-bounce" />
      </div>
    </div>
  );
};

export default PersonalHeading;
