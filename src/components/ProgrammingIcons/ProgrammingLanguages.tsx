import { knownLanguagesToMap } from "./ProgrammingLanguagesHelper";

const ProgrammingLanguages = () => {
  return (
    <div className="flex flex-col h-fit">
      <div className="py-5">
        <h2>Languages + Tools</h2>
      </div>
      <div className="flex w-full justify-center">
        <div className="max-w-[80%] justify-center h-fit flex flex-row flex-wrap gap-10">
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
