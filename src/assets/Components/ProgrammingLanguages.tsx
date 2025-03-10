import React from "react";
import { knownLanguagesToMap } from "./ProgrammingLanguagesHelper";

const ProgrammingLanguages = () => {
  return (
    <div>
      {knownLanguagesToMap.map((language) => {
        return (
          <div className="logo">
            <img src={language.logo} alt={language.alt} />
          </div>
        );
      })}
    </div>
  );
};

export default ProgrammingLanguages;
