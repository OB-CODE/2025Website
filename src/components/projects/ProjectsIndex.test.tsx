import { render, screen } from "@testing-library/react";
import ProjectsIndex from "./ProjectsIndex";

describe("ProjectsIndex component renders", () => {
  test("should render the title `projects` in the components", () => {
    render(<ProjectsIndex />);

    // Check if the heading with the test ID "PortfolioHeader" contains "Portfolio"
    const headerElement = screen.getByTestId("PortfolioHeader");
    expect(headerElement).toBeInTheDocument();
    expect(headerElement).toHaveTextContent("Portfolio");
  });
});
