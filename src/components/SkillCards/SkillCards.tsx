import { cn } from "../../lib/utils";
import { objsToMap } from "./cardsToMap";

const SkillCards = () => {
  return (
    <div className="mx-auto grid w-full max-w-5xl gap-4 px-6 sm:grid-cols-2 lg:grid-cols-3">
      {objsToMap.map((obj, index) => {
        return (
          <figure
            className={cn(
              "relative flex flex-col rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 transition-colors duration-200",
              "hover:border-zinc-700 hover:bg-zinc-900/70"
            )}
            key={index}
          >
            <div className="flex w-full flex-row items-center justify-between gap-2">
              <div data-testid="skillCard" className="flex flex-col">
                <figcaption
                  data-testid="cardTitle"
                  className="text-left text-sm font-medium text-zinc-50"
                >
                  {obj.title}
                </figcaption>
              </div>
              <div className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full text-zinc-500">
                {obj.logo}
              </div>
            </div>
            <blockquote className="mt-2 text-left text-sm text-zinc-400">
              {obj.description}
            </blockquote>
          </figure>
        );
      })}
    </div>
  );
};

export default SkillCards;
