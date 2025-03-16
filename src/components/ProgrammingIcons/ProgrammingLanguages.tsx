import { knownLanguagesToMap } from "./ProgrammingLanguagesHelper";
import Heading2 from "../ui/heading2";

const ProgrammingLanguages = () => {
  return (
    <div className="min-h-[25rem] pt-[5vh] md:min-h-[35rem] flex flex-col justify-center items-center h-full w-full">
      <div className="py-5">
        <Heading2 inputString="Languages / Tools" />
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
    </div>
  );
};

export default ProgrammingLanguages;
