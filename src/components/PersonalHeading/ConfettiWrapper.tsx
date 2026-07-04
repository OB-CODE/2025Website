import { useEffect } from "react";
import { IConfettiWrapper } from "../Confetticomponent";
import Button from "../ui/Button";
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
      className="flex cursor-pointer items-center justify-center gap-3 text-3xl md:text-4xl"
      data-testid="rocket"
    >
      {rightFacingRocket}
      <Button
        variant="outline"
        className={showConfetti ? "text-red-400" : undefined}
      >
        {showConfetti ? "Stop" : "Start"} party ({countdown}s)
      </Button>
      {leftFacingRocket}
    </div>
  );
};

export default ConfettiWrapper;
