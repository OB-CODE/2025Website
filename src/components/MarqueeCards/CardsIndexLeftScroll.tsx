import { cn } from "@/lib/utils";
import Marquee from "react-fast-marquee";

const CardsIndexLeftScroll = () => {
  const cardDetailsObject = {
    logo: "Image",
    title: "Testing",
    description: "Used to have a small blurb",
  };

  const objsToMap = [
    cardDetailsObject,
    cardDetailsObject,
    cardDetailsObject,
    cardDetailsObject,
    cardDetailsObject,
  ];

  return (
    <Marquee
      pauseOnHover={true}
      gradient={true}
      gradientColor={"black"}
      direction={"left"}
      className="w-full flex justify-between group  overflow-hidden p-0 [gap:var(--gap)] flex-row space-x-1">
      {objsToMap.map((obj, index) => {
        return (
          <figure
            className={cn(
              "relative h-full w-84 ml-3 cursor-pointer overflow-hidden rounded-xl border p-4",
              // light styles
              // "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]"
              // dark styles
              "border-gray-50/[.1] bg-gray-50/[.10] hover:bg-gray-50/[.15]"
            )}
            key={index}>
            <div className="flex flex-row items-center gap-2">
              {/* <img
            className="rounded-full"
            width="32"
            height="32"
            alt=""
            src={img}
          /> */}
              <div className="flex flex-col">
                <figcaption className="text-sm font-medium dark:text-white">
                  {obj.title}
                </figcaption>
                <p className="text-xs font-medium dark:text-white/40">
                  {obj.title}
                </p>
              </div>
            </div>
            <blockquote className="mt-2 text-sm">{obj.description}</blockquote>
          </figure>
        );
      })}
    </Marquee>
  );
};

export default CardsIndexLeftScroll;
