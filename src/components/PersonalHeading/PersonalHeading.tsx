import { FiChevronDown } from "react-icons/fi";
import { personalDetails } from "./personal-info";

interface PersonalHeadingProps {
  id?: string;
}

const PersonalHeading = ({ id }: PersonalHeadingProps) => {
  return (
    <div
      id={id}
      className="relative min-h-[28rem] md:min-h-[38rem] flex flex-col justify-center items-center gap-8 md:gap-12 h-full w-full px-4 bg-[radial-gradient(ellipse_at_center,_rgba(76,97,255,0.2)_0%,_rgba(0,0,0,1)_70%)] z-content"
    >
      {/* Heading */}
      <div className="flex flex-row justify-center items-center w-full md:w-[70vw]">
        <h1 className="text-4xl font-bold md:text-6xl lg:text-8xl w-full text-center font-display bg-gradient-to-r from-white via-blue-100 to-fuchsia-200 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(186,113,255,0.35)]">
          {`${personalDetails.firstName} ${personalDetails.lastName}`}
        </h1>
      </div>

      {/* Job Title */}
      <div
        data-testid="jobTitle"
        className="z-10 glassmorphic w-fit flex justify-center rounded-xl border-nebula/30 px-4 py-3 md:px-6 items-center shadow-[0_0_30px_rgba(76,97,255,0.15)]"
      >
        <div className="text-2xl font-bold tracking-tighter md:text-5xl lg:text-6xl bottom-1 relative text-aurora">{`<`}</div>
        <div className="text-2xl font-bold tracking-tighter md:text-5xl lg:text-6xl px-2 text-white">
          {personalDetails.jobTitle}
        </div>
        <div className="text-2xl font-bold tracking-tighter md:text-5xl lg:text-6xl bottom-1 relative text-aurora">{`/>`}</div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-4 flex flex-col items-center gap-1 text-gray-500 motion-safe:animate-bounce">
        <span className="text-xs uppercase tracking-[0.3em]">scroll</span>
        <FiChevronDown size={18} />
      </div>
    </div>
  );
};

export default PersonalHeading;
