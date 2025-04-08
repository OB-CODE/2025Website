import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AboutMe from "./AboutMe";

describe("AboutMe Component", () => {
  test("renders all sentences from aboutMeBlurb", () => {
    render(<AboutMe />);

    // Check for each sentence in the aboutMeBlurb array
    expect(
      screen.getByText(
        /I have a passion for problem solving and working with others./i
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /When im not wearing my coding hat, I can be found chilling my my partner and dog, surrfing, working out, bouldering, eating and drinking too much coffee./i
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /It's often said a good tradesman never blames their tools - That's why I decided to tool with a split Dvorak layout. It's a lot more believable to blame the tools when they look more complicated ;\)/i
      )
    ).toBeInTheDocument();
  });
});
