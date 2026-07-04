import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import SkillCards from "./SkillCards";
import { objsToMap } from "./cardsToMap";

describe("SkillCards Component", () => {
  test("renders the correct number of cards", () => {
    render(<SkillCards />);
    const cards = screen.getAllByTestId("skillCard");
    expect(cards).toHaveLength(objsToMap.length);
  });

  objsToMap.forEach((obj) => {
    test(`renders the title of ${obj.title}`, () => {
      render(<SkillCards />);
      const cardTitleHeading = screen.getByText(obj.title);
      expect(cardTitleHeading).toBeInTheDocument();
    });
  });

  objsToMap.forEach((obj) => {
    test(`renders the description of ${obj.title}`, () => {
      render(<SkillCards />);
      const cardDescription = screen.getByText(obj.description);
      expect(cardDescription).toBeInTheDocument();
    });
  });
});
