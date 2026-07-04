import { Tooltip } from "react-tooltip";
import Heading2 from "../ui/Heading2";
import { knownLanguagesToMap } from "./ProgrammingLanguagesHelper";

const ProgrammingLanguages = () => {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col px-6">
      <Heading2 inputString="Languages / Tools" />
      <div className="mt-8 flex flex-row flex-wrap justify-center gap-3">
        {knownLanguagesToMap.map((language, index) => {
          return (
            <div
              className="flex h-16 w-16 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/40 transition-colors duration-200 hover:border-zinc-600 hover:bg-zinc-900 md:h-20 md:w-20"
              data-testid="language-item"
              data-tooltip-id="language-tooltip"
              data-tooltip-content={language.language}
              data-tooltip-place="top"
              key={index}
            >
              <img
                src={language.logo}
                alt={language.alt}
                loading="lazy"
                className={`h-full w-full rounded-lg p-3 ${language.additionalClassname}`}
              />
            </div>
          );
        })}
      </div>
      <Tooltip id="language-tooltip" />
    </div>
  );
};

export default ProgrammingLanguages;
