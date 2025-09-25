import { render, screen, waitFor } from "@testing-library/react";
import ProjectCards from "./ProjectCards";

// filepath: src/components/projects/ProjectCards.test.tsx
const projectsToMap = [
  {
    name: "indigo",
    description: "Tnhe best drinks company ever? IYKYK.",
    mainImage: "/IndigoMainImage.png",
    techStack: ["Liquid", "Shopify", "css3", "JavaScript"],
  },
]


describe("ProjectCards component", () => {
  test("renders the correct number of projects", () => {
    render(<ProjectCards projectsToMap={projectsToMap} />);
    const projectContainers = screen.getAllByTestId("projectContainer");
    expect(projectContainers.length).toBe(3); // Based on the `projectsToMap` array
  });

  test("renders project names and descriptions correctly", () => {
    render(<ProjectCards projectsToMap={projectsToMap} />);
    const projectNames = ["indigo", "plant one", "plant two"];
    const projectDescriptions = [
      "Tnhe best drinks company ever? IYKYK.",
      "A simple application to show multi api consumption for an informaative visual representation.",
      "A simple application to show multi api consumption for an informaative visual representation 2.",
    ];

    projectNames.forEach((name) => {
      const nameElement = screen.getAllByText(name);
      waitFor(() => {
        expect(nameElement).toBeInTheDocument();
      });
    });

    projectDescriptions.forEach((description) => {
      const descriptionElement = screen.getAllByText(description);
      waitFor(() => {
        expect(descriptionElement).toBeInTheDocument();
      });
    });
  });

  test("renders all required sections for each project", () => {
    render(<ProjectCards projectsToMap={projectsToMap} />);
    const projectContainers = screen.getAllByTestId("projectContainer");
    const projectBodies = screen.getAllByTestId("projectBody");
    const projectFooters = screen.getAllByTestId("projectFooter");

    expect(projectContainers.length).toBe(3);
    expect(projectBodies.length).toBe(3);
    expect(projectFooters.length).toBe(3);
  });
});
