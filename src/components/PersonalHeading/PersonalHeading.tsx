import { FiChevronDown } from "react-icons/fi";
import { HyperText } from "../magicui/hyper-text";
import { MorphingText } from "../magicui/morphing-text";
import { personalDetails } from "./personal-info";

interface PersonalHeadingProps {
  id?: string;
}

const PersonalHeading = ({ id }: PersonalHeadingProps) => {
  return (
    <div
      id={id}
      className="relative min-h-[28rem] md:min-h-[38rem] flex flex-col justify-center items-center gap-8 md:gap-12 h-full w-full px-4 bg-[radial-gradient(ellipse_at_center,_rgba(76,97,255,0.2)_0%,_rgba(0,0,0,1)_70%)] z-above-scan"
    >
      {/* Heading */}
      <div className="flex flex-row justify-center items-center w-full md:w-[70vw]">
        <div className="text-2xl font-bold flex md:text-5xl lg:text-7xl flex-row w-full font-display">
          <MorphingText
            className="w-full h-16 md:h-28 lg:h-36"
            texts={[
              personalDetails.nickname,
              `${personalDetails.firstName} ${personalDetails.lastName}`,
            ]}
          />
        </div>
      </div>

      {/* Job Title */}
      <div
        data-testid="jobTitle"
        className="z-10 glassmorphic w-fit flex justify-center rounded-xl border-nebula/30 px-4 py-3 md:px-6 items-center shadow-[0_0_30px_rgba(76,97,255,0.15)]"
      >
        <div className="text-2xl font-bold tracking-tighter md:text-5xl lg:text-6xl bottom-1 relative text-aurora">{`<`}</div>
        <HyperText
          className="text-2xl font-bold tracking-tighter md:text-5xl lg:text-6xl"
          duration={300}
          characterSet={["0", "1"]}
        >
          {personalDetails.jobTitle}
        </HyperText>
        <div className="text-2xl font-bold tracking-tighter md:text-5xl lg:text-6xl bottom-1 relative pl-2 text-aurora">{`/>`}</div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-4 flex flex-col items-center gap-1 text-gray-500 animate-bounce">
        <span className="text-xs uppercase tracking-[0.3em]">scroll</span>
        <FiChevronDown size={18} />
      </div>
    </div>
  );
};

export default PersonalHeading;
