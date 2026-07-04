import { FiChevronDown } from "react-icons/fi";
import { personalDetails } from "./personal-info";

interface PersonalHeadingProps {
  id?: string;
}

const PersonalHeading = ({ id }: PersonalHeadingProps) => {
  return (
    <div
      id={id}
      className="relative flex min-h-[70vh] w-full flex-col items-center justify-center gap-6 overflow-hidden px-6 md:min-h-[80vh]"
    >
      {/* Subtle dot-grid backdrop, faded at the edges */}
      <div
        aria-hidden="true"
        className="bg-dot-grid absolute inset-0 [mask-image:radial-gradient(ellipse_60%_60%_at_center,black_30%,transparent_80%)]"
      />

      {/* Job Title */}
      <div
        data-testid="jobTitle"
        className="relative z-10 flex items-center gap-1 rounded-full border border-zinc-800 bg-zinc-950/60 px-4 py-1.5 font-mono text-xs text-zinc-400 md:text-sm"
      >
        <span className="text-zinc-600">{`<`}</span>
        <span className="text-zinc-200">{personalDetails.jobTitle}</span>
        <span className="text-zinc-600">{`/>`}</span>
      </div>

      {/* Heading */}
      <h1 className="relative z-10 text-center text-5xl font-semibold tracking-tight text-zinc-50 md:text-7xl">
        {`${personalDetails.firstName} ${personalDetails.lastName}`}
      </h1>

      {/* Scroll cue */}
      <div className="absolute bottom-6 z-10 flex flex-col items-center gap-1 text-zinc-600">
        <span className="text-[10px] uppercase tracking-[0.3em]">scroll</span>
        <FiChevronDown size={16} className="motion-safe:animate-bounce" />
      </div>
    </div>
  );
};

export default PersonalHeading;
