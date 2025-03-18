import Heading2 from "../ui/Heading2";
import { knownLanguagesToMap } from "./ProgrammingLanguagesHelper";
import ShinyButton from "../ui/ShinnyButton";
import { IconCloudIndex } from "./IconCloudindx";
import { useState } from "react";

const ProgrammingLanguages = () => {
  const [isAnimated, setIsAnimated] = useState(false);

  return (
    <div className="min-h-[25rem] pt-[5vh] md:min-h-[35rem] flex flex-col justify-center items-center h-full w-full">
      <Heading2 inputString="Languages / Tools" />
      <div className="pt-5">
        {/* <TestButton></TestButton> */}
        <ShinyButton onClick={() => alert("hi")}>Animate List</ShinyButton>
      </div>
      <div className="flex w-full justify-center pt-[3vh]">
        <div className="max-w-[80%] justify-center h-fit flex flex-row flex-wrap gap-10 ">
          {knownLanguagesToMap.map((language, index) => {
            return (
              <div
                className="w-24 h-24 flx justify-center items-center logo"
                data-testid="language-item"
                key={index}>
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
      <IconCloudIndex />
    </div>
  );
};

export default ProgrammingLanguages;
