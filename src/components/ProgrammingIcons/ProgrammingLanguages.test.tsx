import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProgrammingLanguages from "./ProgrammingLanguages";
import { knownLanguagesToMap } from "./ProgrammingLanguagesHelper";

// Mock renderToString to avoid "MessageChannel is not defined" error
jest.mock("react-dom/server", () => ({
  renderToString: jest.fn(() => "<div>Mocked Render</div>"),
}));

describe("ProgrammingLanguages component", () => {
  test("should render a div for each language in the knownLanguagesToMap array", () => {
    const expectedDivsRendered = knownLanguagesToMap.length;

    render(<ProgrammingLanguages />);

    const languageDivs = screen.getAllByTestId("language-item");

    expect(languageDivs.length).toBe(expectedDivsRendered);
  });
});
