import { cn } from "../../lib/utils";
import { objsToMap } from "./cardsToMap";

const SkillCards = () => {
  return (
    <div className="flex flex-wrap justify-center gap-4 px-4 max-w-7xl mx-auto">
      {objsToMap.map((obj, index) => {
        return (
          <figure
            className={cn(
              "relative h-44 w-56 md:h-40 md:w-84 overflow-hidden rounded-xl border p-4 backdrop-blur-sm transition-all duration-300",
              "border-white/10 bg-white/[.06] hover:border-aurora/40 hover:bg-white/[.12] hover:shadow-[0_0_20px_rgba(186,113,255,0.15)]"
            )}
            key={index}
          >
            <div className="flex flex-row w-full justify-between items-center gap-2">
              <div data-testid="skillCard" className="flex flex-col">
                <figcaption
                  data-testid="cardTitle"
                  className="text-sm font-medium text-white text-left"
                >
                  {obj.title}
                </figcaption>
              </div>
              <div className="rounded-full text-aurora/80 w-[30px] h-[30px] shrink-0 flex items-center justify-center">
                {obj.logo}
              </div>
            </div>
            <blockquote className="mt-2 text-sm text-gray-300 text-left">
              {obj.description}
            </blockquote>
          </figure>
        );
      })}
    </div>
  );
};

export default SkillCards;
