import { useState } from "react";

const Moonlander = () => {
  const [userClickedStaticImage, setUserClickedStaticImage] = useState(false);
  const handleClick = () => {
    setUserClickedStaticImage(true);
    setTimeout(() => {
      setUserClickedStaticImage(false);
    }, 150);
  };

  return (
    <div className="flex w-full flex-col items-center justify-center overflow-hidden">
      <div className="relative min-h-[100px] w-full overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 sm:min-h-[300px] md:min-h-[555px] xl:min-h-[800px]">
        <iframe
          title="Moonlander Configuration"
          src="https://configure.zsa.io/embed/moonlander/layouts/gdxrX/latest/0?theme=dark"
          className="absolute top-0 left-0 hidden h-full w-full border-0 bg-black lg:block"
          id="iFrameContainer"
          scrolling="no"
          style={{
            filter: "invert(1) hue-rotate(180deg)",
            height: "100%",
            overflow: "hidden",
          }}
        ></iframe>
        <div
          onClick={handleClick}
          className="flex h-full w-full flex-col items-center justify-center p-4 lg:hidden"
        >
          <div
            className={`mb-3 w-full rounded-md border p-3 text-center text-sm transition-colors ${
              userClickedStaticImage
                ? "border-zinc-500 bg-zinc-800 text-zinc-100"
                : "border-zinc-800 bg-zinc-900/60 text-zinc-400"
            }`}
          >
            View on larger screen for an interactive experience.
          </div>
          <img
            src="/DvorakLayout.webp"
            alt="Dvorak Keyboard Layout"
            loading="lazy"
            className="w-full max-w-[300px] rounded-md border border-zinc-800 sm:max-w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Moonlander;
