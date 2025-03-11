import { useEffect, useState } from "react";
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
    <div>
      <h1 className="py-2">
        {personalDetails.firstName} {personalDetails.lastName}
      </h1>
      <div className="flex justify-center">
        <h1
          className={`bg-[rgba(186,58,249,0.17)] w-fit h-16 flex justify-center opacity ${
            toggleForRightBorder ? "border-r" : ""
          }`}>{`<${personalDetails.jobTitle}/>`}</h1>
      </div>
    </div>
  );
};

export default PersonalHeading;
