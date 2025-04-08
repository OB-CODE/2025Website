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
              "relative min-h-28 h-full w-48 md:w-84 ml-3 cursor-pointer overflow-hidden rounded-xl border p-4",
              // light styles
              // "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]"
              // dark styles
              "border-gray-50/[.1] bg-gray-50/[.10] hover:bg-gray-50/[.15]"
            )}
            key={index}
          >
            <div className="flex flex-row w-full justify-between items-center gap-2">
              <div data-testid={`card${direction}`} className="flex flex-col">
                <figcaption
                  data-testid="cardTitle"
                  className="text-sm font-medium dark:text-white"
                >
                  {obj.title}
                </figcaption>
              </div>
              <div className=" rounded-full text-gray-400 w-[30px] h-[30px] flex items-center justify-center">
                {obj.logo}
              </div>
            </div>
            <blockquote className="mt-2 text-sm">{obj.description}</blockquote>
          </figure>
        );
      })}
    </Marquee>
  );
};

export default CardsScroll;
