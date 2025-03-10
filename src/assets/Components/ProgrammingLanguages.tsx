import React from "react";
import { knownLanguagesToMap } from "./ProgrammingLanguagesHelper";

const ProgrammingLanguages = () => {
  return (
    <div className="flex w-full flex-row">
      {knownLanguagesToMap.map((language) => {
        return (
          <a href="https://react.dev" target="_blank">
            <img
              src={language.logo}
              alt={language.alt}
              className={`logo ${language.additionalClassname}`}
            />
          </a>
        );
      })}
    </div>
  );
};

export default ProgrammingLanguages;
