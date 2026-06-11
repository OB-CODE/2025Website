import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
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
    expect(projectContainers.length).toBe(projectsToMap.length);
  });

  test("renders project names and descriptions correctly", () => {
    render(<ProjectCards projectsToMap={projectsToMap} />);

    projectsToMap.forEach((project) => {
      expect(screen.getByText(project.name)).toBeInTheDocument();
      expect(screen.getByText(project.description)).toBeInTheDocument();
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
});
