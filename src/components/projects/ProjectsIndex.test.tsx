import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom"; // Ensure jest-dom matchers are included
import ProjectsIndex from "./ProjectsIndex";

describe("ProjectsIndex component renders", () => {
  test("should render the title `Portfolio` in the component", async () => {
    render(<ProjectsIndex />);

    // Check if the heading with the test ID "Heading2" is in the document
    await waitFor(() => {
      const headingElement = screen.getByTestId("Heading2");
      expect(headingElement).toBeInTheDocument();
      expect(headingElement).toBeVisible(); // Ensure it's visible
    });

    // Alternatively, check for the text "Portfolio"
    await waitFor(() => {
      const headingElement = screen.getByText(/portfolio/i); // Case-insensitive match
      expect(headingElement).toBeInTheDocument();
    });
  });

  test("should render projectsMessage first sentence", () => {
    render(<ProjectsIndex />);

    const firstSentence = screen.getByText(
      /a small collection of my projects/i
    ); // Case-insensitive match
    expect(firstSentence).toBeInTheDocument();
  });

  test("should render projectsMessage second sentence", () => {
    render(<ProjectsIndex />);

    const firstSentence = screen.getByText(/Click on the cards /i); // Case-insensitive match
    expect(firstSentence).toBeInTheDocument();
  });

  test("should render projectsMessage third sentence", () => {
    render(<ProjectsIndex />);

    const firstSentence = screen.getByText(/Check out the githubs/i); // Case-insensitive match
    expect(firstSentence).toBeInTheDocument();
  });
});
