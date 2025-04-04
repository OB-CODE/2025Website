import { render, screen } from "@testing-library/react";
import ProgrammingLanguages from "./ProgrammingLanguages";
import { knownLanguagesToMap } from "./ProgrammingLanguagesHelper";

describe("ProgrammingLanguages component", () => {
  test("should render a div for each language in the knownLanguagesToMap array", () => {
    const expectedDivsRendered = knownLanguagesToMap.length;

    render(<ProgrammingLanguages />);

    const languageDivs = screen.getAllByTestId("language-item");

    expect(languageDivs.length).toBe(expectedDivsRendered);
  });
});
