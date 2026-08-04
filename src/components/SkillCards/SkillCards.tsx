import { cn } from "../../lib/utils";
import { objsToMap } from "./cardsToMap";

const SkillCards = () => {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-wrap justify-center gap-4 px-6">
      {objsToMap.map((obj, index) => {
        return (
          <figure
            className={cn(
              "relative flex w-full flex-col rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 transition-colors duration-200",
              "sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2rem)/3)]",
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
