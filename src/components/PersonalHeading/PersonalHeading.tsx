import { useEffect, useState } from "react";
import { personalDetails } from "./personal-info";
import { HyperText } from "../magicui/hyper-text";
import { AuroraText } from "../magicui/aurora-text";

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
    <div className="flex flex-col justify-center items-center h-full w-full bg-[radial-gradient(ellipse_at_center,_rgba(60,60,60,0.7)_0%,_rgba(0,0,0,1)_60%)]">
      <div className="flex flex-row w-fit justify-between items-center">
        <h1 className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-7xl">
          {personalDetails.firstName}{" "}
          <AuroraText
            speed={2}
            // colors={[
            //   "#ffffff",
            //   "#e0c3fc",
            //   "#c084fc",
            //   "#9333ea",
            //   "#7e22ce",
            //   "#6b21a8",
            // ]}
          >
            {personalDetails.lastName}
          </AuroraText>
        </h1>
        <div className="w-3 pl-1 h-full flex items-center">
          <div
            className={`z-10 flex h-[60%] w-1 ${
              toggleForRightBorder ? "border-r" : "border-transparent"
            } `}></div>
        </div>
      </div>
      <div
        className={`z-10 bg-[rgba(168,85,247,0.2)] w-fit h-16 flex justify-center rounded-4xl opacity px-2 items-center `}>
        <div className="text-5xl bottom-1 relative">{`<`}</div>
        <HyperText duration={300} characterSet={["0", "1"]}>
          {personalDetails.jobTitle}
        </HyperText>
        <div className="text-5xl bottom-1 relative pl-2">{`/>`}</div>
      </div>
    </div>
  );
};

export default PersonalHeading;
