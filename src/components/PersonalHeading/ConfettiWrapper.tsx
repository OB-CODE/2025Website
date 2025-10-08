import { useEffect, useState } from "react";
import { leftFacingRocket, rightFacingRocket } from "./headerSVGs";
import { IConfettiWrapper } from "../Confetticomponent";

const ConfettiWrapper = ({
  setToggleForRightBorder,
  setshowConfetti,
  setDimensions,
  dimensions,
  showConfetti,
  countdown,
  setCountdown,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      className="text-3xl md:text-6xl cursor-pointer flex w-[270px] md:w-[270px]  justify-center items-center top-[20px] md:top-[30px] lg:top-[50px]" // sm:text-2xl md:text-4xl lg:
      style={{
        position: "absolute",
        // top: 60,
        left: rocketPosition,
        transition: "left 0.05s linear",
      }}
      data-testid="rocket"
    >
      {movingRight == false && rightFacingRocket}

      <span className="text-xl cursor-pointer w-fit flex">
        <button
          className={`${
            showConfetti ? "text-red-400" : "text-purple-400"
          } w-[200px] flex justify-center items-center border-2 border-white rounded-lg hover:bg-white/10 transition-colors duration-300 p-2`}
        >
          {showConfetti ? "Stop" : "Start"} party ({countdown}s)
        </button>
      </span>
      {movingRight && leftFacingRocket}
    </div>
  );
};

export default ConfettiWrapper;
