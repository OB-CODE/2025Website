import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProjectCards from "./ProjectCards";

const projectsToMap = [
  {
    name: "indigo",
    description: "The best drinks company ever? IYKYK.",
    mainImage: "/IndigoMainImage.png",
    techStack: ["Liquid", "Shopify", "css3", "JavaScript"],
  },
  {
    name: "plant one",
    description:
      "A simple application to show multi api consumption for an informative visual representation.",
    mainImage: "/PlantOne.png",
    techStack: ["React", "TypeScript"],
  },
];

describe("ProjectCards component", () => {
  test("renders the correct number of projects", () => {
    render(<ProjectCards projectsToMap={projectsToMap} />);
    const projectContainers = screen.getAllByTestId("projectContainer");
    expect(projectContainers.length).toBe(projectsToMap.length);
  });

  test("renders project names correctly", () => {
    render(<ProjectCards projectsToMap={projectsToMap} />);
    projectsToMap.forEach((project) => {
      const nameElements = screen.getAllByText(project.name);
      expect(nameElements.length).toBeGreaterThan(0);
    });
  });

  test("renders project descriptions correctly", () => {
    render(<ProjectCards projectsToMap={projectsToMap} />);
    projectsToMap.forEach((project) => {
      const descriptionElement = screen.getByText(project.description);
      expect(descriptionElement).toBeInTheDocument();
    });
  });

  test("renders all required sections for each project", () => {
    render(<ProjectCards projectsToMap={projectsToMap} />);
    const projectContainers = screen.getAllByTestId("projectContainer");
    const projectBodies = screen.getAllByTestId("projectBody");
    const projectFooters = screen.getAllByTestId("projectFooter");

    expect(projectContainers.length).toBe(projectsToMap.length);
    expect(projectBodies.length).toBe(projectsToMap.length);
    expect(projectFooters.length).toBe(projectsToMap.length);
  });

  test("renders project screenshots with descriptive alt text", () => {
    render(<ProjectCards projectsToMap={projectsToMap} />);
    projectsToMap.forEach((project) => {
      const img = screen.getByAltText(`${project.name} screenshot`);
      expect(img).toBeInTheDocument();
    });
  });
});
