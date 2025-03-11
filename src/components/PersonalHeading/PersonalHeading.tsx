import { useEffect, useState } from "react";
import { personalDetails } from "./personal-info";
import { HyperText } from "../magicui/hyper-text";

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
    <div>
      <h1 className="py-2">
        {personalDetails.firstName} {personalDetails.lastName}
      </h1>
      <div
        className={`bg-[rgba(186,58,249,0.17)] w-fit h-16 flex justify-center opacity px-2 items-center ${
          toggleForRightBorder ? "border-r" : ""
        }`}>
        <div className="text-5xl bottom-1 relative">{`<`}</div>
        <HyperText duration={400} characterSet={["0", "1"]}>
          {personalDetails.jobTitle}
        </HyperText>
        <div className="text-5xl bottom-1 relative pl-2">{`/>`}</div>
      </div>
    </div>
  );
};

export default PersonalHeading;
