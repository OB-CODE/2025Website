import { useEffect, useState } from "react";
import { HyperText } from "../magicui/hyper-text";
import { MorphingText } from "../magicui/morphing-text";
import { personalDetails } from "./personal-info";

const PersonalHeading = () => {
  const [toggleForRightBorder, setToggleForRightBorder] = useState(true);
  // on mount, set a timer to change the state of the toggle after a second passes.
  useEffect(() => {
    const interval = setInterval(() => {
      setToggleForRightBorder((prev) => !prev);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-[25rem] md:min-h-[35rem] flex flex-col justify-center items-center h-full w-full bg-[radial-gradient(ellipse_at_center,_rgba(111,111,111,0.7)_0%,_rgba(0,0,0,1)_60%)]">
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
            className={`z-10 flex h-[60%] w-1 ${
              toggleForRightBorder ? "border-r" : "border-transparent"
            } `}></div>
        </div>
      </div>
      <div
        className={`z-10 bg-[rgba(186,113,255,0.49)] w-fit h-18 flex justify-center rounded-4xl opacity px-2 items-center `}>
        <div className="text-3xl font-bold tracking-tighter md:text-5xl lg:text-7xl bottom-1 relative">{`<`}</div>
        <HyperText
          className="text-3xl font-bold tracking-tighter md:text-5xl lg:text-7xl"
          duration={300}
          characterSet={["0", "1"]}>
          {personalDetails.jobTitle}
        </HyperText>
        <div className="text-3xl font-bold tracking-tighter md:text-5xl lg:text-7xl bottom-1 relative pl-2">{`/>`}</div>
      </div>
    </div>
  );
};

export default PersonalHeading;
