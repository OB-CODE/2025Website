import { useEffect, useState } from "react";
import { leftFacingRocket, rightFacingRocket } from "./headerSVGs";
import { IConfettiWrapper } from "./PersonalHeading";

const ConfettiWrapper = ({
  setToggleForRightBorder,
  setshowConfetti,
  setDimensions,
  dimensions,
  showConfetti,
}: IConfettiWrapper) => {
  const [rocketPosition, setRocketPosition] = useState(0);
  const [movingRight, setMovingRight] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setToggleForRightBorder((prev) => !prev);
    }, 500);

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const moveRocket = setInterval(() => {
      setRocketPosition((prev) => {
        if (movingRight && prev >= dimensions.width - 300) {
          setMovingRight(false);
          return prev - 10;
        } else if (!movingRight && prev <= 0) {
          setMovingRight(true);
          return prev + 10;
        }
        return movingRight ? prev + 10 : prev - 10;
      });
    }, 50);

    return () => clearInterval(moveRocket);
  }, [movingRight, dimensions.width]);

  return (
    <div
      onClick={() => setshowConfetti((prev) => !prev)}
      className="text-3xl md:text-6xl cursor-pointer flex w-[200px] md:w-[250px]  justify-center items-center top-[20px] md:top-[30px] lg:top-[50px]" // sm:text-2xl md:text-4xl lg:
      style={{
        position: "absolute",
        // top: 60,
        left: rocketPosition,
        transition: "left 0.05s linear",
      }}
    >
      {movingRight == false && rightFacingRocket}

      <span className="text-xl cursor-pointer w-fit flex">
        <button
          className={`${
            showConfetti ? "text-red-400" : "text-purple-400"
          } w-[150px]  flex`}
        >
          {showConfetti ? "Stop" : "Start"} party
        </button>
      </span>
      {movingRight && leftFacingRocket}
    </div>
  );
};

export default ConfettiWrapper;
