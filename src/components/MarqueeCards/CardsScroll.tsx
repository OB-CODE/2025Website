import { cn } from "../../lib/utils";
import Marquee from "react-fast-marquee";
import { objsToMap } from "./cardsToMap";
import { useEffect, useState } from "react";

const CardsScroll = ({ direction }: { direction: "left" | "right" }) => {
  const [dynamicObjectsToMap, setDynamicObjectsToMap] = useState(
    direction == "left" ? objsToMap : objsToMap.reverse()
  );

  // Adjust the loop count based on screen size
  useEffect(() => {
    const increaseNumberOfObjectsToMap = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth > 1920) {
        setDynamicObjectsToMap([...objsToMap, ...objsToMap, ...objsToMap]); // More loops for extra-large screens
      } else if (screenWidth > 1280) {
        setDynamicObjectsToMap([...objsToMap, ...objsToMap]); // Medium-large screens
      } else {
        setDynamicObjectsToMap([...objsToMap]); // Default for smaller screens
      }
    };

    increaseNumberOfObjectsToMap(); // Set initial loop count
    window.addEventListener("resize", increaseNumberOfObjectsToMap); // Update on resize

    return () => {
      window.removeEventListener("resize", increaseNumberOfObjectsToMap); // Cleanup
    };
  }, []);

  return (
    <Marquee
      pauseOnHover={true}
      gradient={true}
      gradientColor={"black"}
      direction={direction}
      className="max-w-[calc(100vw)] md:max-w-[calc(100vw-30px)] flex justify-between group  overflow-hidden p-0 [gap:var(--gap)] flex-row space-x-1 "
    >
      {dynamicObjectsToMap.map((obj, index) => {
        return (
          <figure
            className={cn(
              "relative h-44 w-56 md:h-40 md:w-84 ml-3 cursor-pointer overflow-hidden rounded-xl border p-4 backdrop-blur-sm transition-all duration-300",
              "border-white/10 bg-white/[.06] hover:border-aurora/40 hover:bg-white/[.12] hover:shadow-[0_0_20px_rgba(186,113,255,0.15)]"
            )}
            key={index}
          >
            <div className="flex flex-row w-full justify-between items-center gap-2">
              <div data-testid={`card${direction}`} className="flex flex-col">
                <figcaption
                  data-testid="cardTitle"
                  className="text-sm font-medium text-white"
                >
                  {obj.title}
                </figcaption>
              </div>
              <div className="rounded-full text-aurora/80 w-[30px] h-[30px] shrink-0 flex items-center justify-center">
                {obj.logo}
              </div>
            </div>
            <blockquote className="mt-2 text-sm text-gray-300">
              {obj.description}
            </blockquote>
          </figure>
        );
      })}
    </Marquee>
  );
};

export default CardsScroll;
