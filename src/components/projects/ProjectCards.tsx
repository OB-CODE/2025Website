import ProjectCard from "./ProjectCard";
import type { IprojectsToMap } from "./ProjectCard";

export type { IprojectsToMap };

/** The grid of portfolio cards. One card per project, all on screen at once. */
const ProjectCards = ({
  projectsToMap,
}: {
  projectsToMap: IprojectsToMap[];
}) => {
  return (
    <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
      {projectsToMap.map((project) => (
        <ProjectCard key={project.name} project={project} />
      ))}
    </div>
  );
};

export default ProjectCards;
