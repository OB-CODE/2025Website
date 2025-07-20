import { useState } from "react";
import Heading2 from "../ui/Heading2";
import ShinyButton from "../ui/ShinnyButton";
import { IconCloudIndex } from "./IconCloudIndx";
import { knownLanguagesToMap } from "./ProgrammingLanguagesHelper";
import CyberpunkGrid from "../magicui/cyberpunk-grid";

const ProgrammingLanguages = () => {
  const [isAnimated, setIsAnimated] = useState(false);

  return (
    <div className="min-h-[25rem] pt-[10vh] md:min-h-[35rem] flex flex-col justify-center items-center h-full w-full pb-[2vh]">
      {/* <CyberpunkGrid color="#ba71ff" opacity={0.15} spacing={30} /> */}
      <Heading2 inputString="Languages / Tools" />
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
          <div className="flex w-full justify-center pt-[3vh]">
            <div className="max-w-[80%] justify-center h-fit flex flex-row flex-wrap gap-10 ">
              {knownLanguagesToMap.map((language, index) => {
                return (
                  <div
                    className="w-24 h-24 flx justify-center items-center logo "
                    data-testid="language-item"
                    key={index}
                  >
                    <img
                      src={language.logo}
                      alt={language.alt}
                      className={`rounded-xl border-rounded p-2 logo ${language.additionalClassname}`}
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
