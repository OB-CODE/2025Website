import { useEffect } from "react";
import { IConfettiWrapper } from "../Confetticomponent";
import { leftFacingRocket, rightFacingRocket } from "./headerSVGs";

const ConfettiWrapper = ({
  setshowConfetti,
  setDimensions,
  showConfetti,
  countdown,
}: IConfettiWrapper) => {
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      onClick={() => setshowConfetti((prev) => !prev)}
      className="text-3xl md:text-6xl cursor-pointer flex justify-center items-center gap-2"
      data-testid="rocket"
    >
      {rightFacingRocket}

      <span className="text-xl cursor-pointer w-fit flex">
        <button
          className={`${
            showConfetti ? "text-red-400" : "text-purple-400"
          } w-[200px] flex justify-center items-center border-2 border-white rounded-lg hover:bg-white/10 transition-colors duration-300 p-2`}
        >
          {showConfetti ? "Stop" : "Start"} party ({countdown}s)
        </button>
      </span>
      {leftFacingRocket}
    </div>
  );
};

export default ConfettiWrapper;
