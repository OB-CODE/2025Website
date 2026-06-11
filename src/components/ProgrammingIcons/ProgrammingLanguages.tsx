import { useState } from "react";
import Heading2 from "../ui/Heading2";
import ShinyButton from "../ui/ShinnyButton";
import { IconCloudIndex } from "./IconCloudIndx";
import { knownLanguagesToMap } from "./ProgrammingLanguagesHelper";

const ProgrammingLanguages = () => {
  const [isAnimated, setIsAnimated] = useState(false);

  return (
    <div className="min-h-[25rem] pt-[10vh] md:min-h-[35rem] flex flex-col justify-center items-center h-full w-full pb-[2vh]">
      <Heading2 inputString="Languages / Tools" align="center" />
      <div className="pt-5">
        {/* <TestButton></TestButton> */}
        <ShinyButton onClick={() => setIsAnimated((state) => !state)}>
          {isAnimated ? "Normal List" : "Animate List"}
        </ShinyButton>
      </div>
      <div className="min-h-[25rem]">
        {isAnimated ? (
          <IconCloudIndex />
        ) : (
          <div className="flex w-full justify-center pt-8">
            <div className="flex max-w-[85%] md:max-w-[70%] flex-row flex-wrap justify-center gap-4 md:gap-6">
              {knownLanguagesToMap.map((language, index) => {
                return (
                  <div
                    className="group flex h-20 w-20 md:h-24 md:w-24 items-center justify-center rounded-2xl border border-white/10 bg-white/[.04] backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-nebula/50 hover:bg-white/[.08] hover:shadow-[0_0_18px_rgba(76,97,255,0.25)]"
                    data-testid="language-item"
                    key={index}
                  >
                    <img
                      src={language.logo}
                      alt={language.alt}
                      className={`rounded-xl p-2 logo ${language.additionalClassname}`}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgrammingLanguages;
