import React from "react";
import { knownLanguagesToMap } from "./ProgrammingLanguagesHelper";

const ProgrammingLanguages = () => {
  return (
    <div className="flex flex-col h-fit">
      <div className="py-5">
        <h1>Languages / Tools</h1>
      </div>
      <div className="flex w-full flex-row h-fit gap-10">
        {knownLanguagesToMap.map((language) => {
          return (
            <div className="bg-[#191818] w-24 h-24 flx justify-center items-center logo">
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
  );
};

export default ProgrammingLanguages;
