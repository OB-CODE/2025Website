import { useEffect, useState } from "react";
import { HyperText } from "../magicui/hyper-text";
import { MorphingText } from "../magicui/morphing-text";
import { personalDetails } from "./personal-info";
import Confetti from "react-confetti";

const rightFacingRocket = (
  <svg
    fill="#ffffff"
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    transform="rotate(90)matrix(1, 0, 0, -1, 0, 0)"
  >
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      <title>rocket</title>
      <path d="M23.371 29.529c0 0 0.335-2.012-1.731-4.469 2.011-5.641 2.29-10.778 2.29-10.778s4.133 0.95 4.133 5.026c-0.001 6.981-4.692 10.221-4.692 10.221zM11.979 27.078c0 0-2.768-8.883-2.768-12.568 0-1.658 0.187-3.133 0.478-4.472h12.61c0.293 1.34 0.481 2.816 0.481 4.473 0 3.629-2.76 12.567-2.76 12.567h-8.041zM15.99 12.069c-1.418 0-2.568 1.15-2.568 2.569 0 1.418 1.15 2.569 2.568 2.569s2.569-1.15 2.569-2.569c0.001-1.419-1.15-2.569-2.569-2.569zM15.438 0.596v-3.498h1v3.409c1.143 0.832 4.236 3.478 5.635 8.575h-12.16c1.352-4.957 4.296-7.574 5.525-8.486zM8.629 29.529c0 0-4.691-3.24-4.691-10.221 0-4.076 4.133-5.026 4.133-5.026s0.279 5.137 2.289 10.778c-2.067 2.458-1.731 4.469-1.731 4.469zM17.691 30.045l-0.838-0.838-0.893 2.793-1.062-2.793-0.726 1.451-1.062-2.625h5.752l-1.171 2.012z"></path>{" "}
    </g>
  </svg>
);

const leftFacingRocket = (
  <svg
    fill="#ffffff"
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    transform="rotate(90)matrix(1, 0, 0, 1, 0, 0)"
  >
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      <title>rocket</title>
      <path d="M23.371 29.529c0 0 0.335-2.012-1.731-4.469 2.011-5.641 2.29-10.778 2.29-10.778s4.133 0.95 4.133 5.026c-0.001 6.981-4.692 10.221-4.692 10.221zM11.979 27.078c0 0-2.768-8.883-2.768-12.568 0-1.658 0.187-3.133 0.478-4.472h12.61c0.293 1.34 0.481 2.816 0.481 4.473 0 3.629-2.76 12.567-2.76 12.567h-8.041zM15.99 12.069c-1.418 0-2.568 1.15-2.568 2.569 0 1.418 1.15 2.569 2.568 2.569s2.569-1.15 2.569-2.569c0.001-1.419-1.15-2.569-2.569-2.569zM15.438 0.596v-3.498h1v3.409c1.143 0.832 4.236 3.478 5.635 8.575h-12.16c1.352-4.957 4.296-7.574 5.525-8.486zM8.629 29.529c0 0-4.691-3.24-4.691-10.221 0-4.076 4.133-5.026 4.133-5.026s0.279 5.137 2.289 10.778c-2.067 2.458-1.731 4.469-1.731 4.469zM17.691 30.045l-0.838-0.838-0.893 2.793-1.062-2.793-0.726 1.451-1.062-2.625h5.752l-1.171 2.012z"></path>{" "}
    </g>
  </svg>
);

const PersonalHeading = () => {
  const [toggleForRightBorder, setToggleForRightBorder] = useState(true);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

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

  const [showConfetti, setshowConfetti] = useState(false);

  return (
    <div className="min-h-[25rem] md:min-h-[35rem] flex flex-col justify-center items-center h-full w-full bg-[radial-gradient(ellipse_at_center,_rgba(111,111,111,0.7)_0%,_rgba(0,0,0,1)_60%)]">
      <div
        onClick={() => setshowConfetti((prev) => !prev)}
        className="text-6xl cursor-pointer flex w-[200px] justify-center items-center"
        style={{
          position: "absolute",
          top: 60,
          left: rocketPosition,
          transition: "left 0.05s linear",
        }}
      >
        {movingRight == false && rightFacingRocket}

        <span className="text-xl cursor-pointer ">
          <button
            className={`${showConfetti ? "text-red-400" : "text-green-400"}`}
          >
            {showConfetti ? "Stop" : "Start"} party
          </button>
        </span>
        {movingRight && leftFacingRocket}
      </div>

      {showConfetti && (
        <Confetti
          width={dimensions.width - 50}
          height={dimensions.height / 2 + 70}
        />
      )}

      {/* Confetti */}
      {/* <Confetti width={dimensions.width - 50} height={dimensions.height / 2} /> */}

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
            className={`z-10 flex h-[60%] w-1 ${
              toggleForRightBorder ? "border-r" : "border-transparent"
            } `}
          ></div>
        </div>
      </div>

      {/* Job Title */}
      <div
        data-testid="jobTitle"
        className={`z-10 bg-[rgba(186,113,255,0.49)] w-fit h-18 flex justify-center rounded-4xl opacity px-2 items-center `}
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
