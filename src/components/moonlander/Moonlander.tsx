import { useState } from "react";
import { BorderBeam } from "../magicui/border-beam";

const Moonlander = () => {
  const [userClickedStaticImage, setUserClickedStaticImage] = useState(false);
  const handleClick = () => {
    setUserClickedStaticImage(true);
    setTimeout(() => {
      setUserClickedStaticImage(false);
    }, 150);
  };

  return (
    <div className="w-[80%] overflow-hidden flex flex-col items-center justify-center">
      <div className="relative sm:min-h-[300px]  md:min-h-[555px] xl:min-h-[800px] bg-black w-full overflow-hidden">
        <iframe
          title="Moonlander Configuration"
          src="https://configure.zsa.io/embed/moonlander/layouts/gdxrX/latest/0?theme=dark"
          className="absolute top-0 left-0 w-full h-full border-0 bg-black sm:hidden lg:block"
          id="iFrameContainer"
          style={{
            filter: "invert(1) hue-rotate(180deg)",
            height: "100%",
            overflow: "hidden",
          }}
        ></iframe>
        <div
          onClick={handleClick}
          className="sm:block lg:hidden flex justify-center items-center h-full w-full"
        >
          <div
            className={`p-2 ${
              userClickedStaticImage
                ? "text-purple-950 bg-purple-600"
                : "text-purple-500 bg-purple-950"
            } `}
          >
            View on larger screen for an interactive experience.
          </div>
          <img src="/DvorakLayout.png" alt="" />
        </div>
        <BorderBeam duration={6} size={200} data-testid="border-beam" />
      </div>
    </div>
  );
};

export default Moonlander;
