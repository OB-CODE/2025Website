import { HyperText } from "../magicui/hyper-text";
import { MorphingText } from "../magicui/morphing-text";
import { personalDetails } from "./personal-info";

interface PersonalHeadingProps {
  id?: string;
}

const PersonalHeading = ({ id }: PersonalHeadingProps) => {




  return (
    <div id={id} className="min-h-[25rem] md:min-h-[35rem] flex flex-col justify-center items-center h-full w-full bg-[radial-gradient(ellipse_at_center,_rgba(76,97,255,0.2)_0%,_rgba(0,0,0,1)_70%)] z-above-scan">


      {/* Heading */}
      <div className="flex flex-row justify-between items-center pb-1 w-full md:w-[70vw]">
        <div className="text-xl font-bold flex md:text-5xl lg:text-7xl flex-row w-full">
          <MorphingText
            className="w-full"
            texts={[
              personalDetails.nickname,
              `${personalDetails.firstName} ${personalDetails.lastName}`,
            ]}
          />
        </div>
        <div className="w-3 pl-1 h-full flex items-center">
          <div
            className="border-transparent z-10 flex h-[60%] w-1"
          ></div>
        </div>
      </div>

      {/* Job Title */}
      <div
        data-testid="jobTitle"
        className={`z-10 glassmorphic w-fit h-18 flex justify-center rounded-xl opacity px-4 py-2 items-center`}
      >
        <div className="text-3xl font-bold tracking-tighter md:text-5xl lg:text-7xl bottom-1 relative">{`<`}</div>
        <HyperText
          className="text-3xl font-bold tracking-tighter md:text-5xl lg:text-7xl"
          duration={300}
          characterSet={["0", "1"]}
        >
          {personalDetails.jobTitle}
        </HyperText>
        <div className="text-3xl font-bold tracking-tighter md:text-5xl lg:text-7xl bottom-1 relative pl-2">{`/>`}</div>
      </div>
    </div>
  );
};

export default PersonalHeading;
