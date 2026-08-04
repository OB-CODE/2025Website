import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import ProjectCard from "./ProjectCard";
import type { IprojectsToMap } from "./ProjectCard";

/**
 * The phone projects as a deck: screenshots rotate inside a card, and the deck itself
 * rotates between projects. Only the top card of the deck is mounted - swapping it out
 * is what returns a project to its first screenshot.
 */
const ProjectCarousel = ({
  projectsToMap,
}: {
  projectsToMap: IprojectsToMap[];
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const projectCount = projectsToMap.length;
  const hasDeck = projectCount > 1;

  // step is +1 (next) or -1 (previous), wrapping at both ends
  const stepProject = (step: 1 | -1) =>
    setActiveIndex(
      (current) => (current + step + projectCount) % projectCount
    );

  const activeProject = projectsToMap[activeIndex];

  return (
    <div
      data-testid="projectCarousel"
      className="flex w-full flex-col items-center"
    >
      <div className="relative w-full max-w-md">
        {/* The cards waiting underneath. They only peek out at the sides and the foot,
            which is enough to say the deck has more in it than what's on top. */}
        {hasDeck && (
          <>
            <div
              aria-hidden="true"
              className="absolute inset-x-8 -bottom-6 top-6 z-0 rounded-xl border border-zinc-800 bg-zinc-900/40"
            />
            <div
              aria-hidden="true"
              className="absolute inset-x-4 -bottom-3 top-4 z-0 rounded-xl border border-zinc-700/70 bg-zinc-900/60"
            />
          </>
        )}

        {/* The card's own background is translucent, so it needs the page colour laid
            solid underneath it - otherwise the deck shows straight through the top card. */}
        <div className="relative z-10 rounded-xl bg-zinc-950">
          <ProjectCard
            key={activeProject.name}
            project={activeProject}
            isTallCard={true}
          />
        </div>
      </div>

      {hasDeck && (
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => stepProject(-1)}
            aria-label="Previous project"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-700 bg-zinc-950/70 text-zinc-400 transition-colors hover:border-zinc-500 hover:text-zinc-50"
          >
            <FiChevronLeft size={18} />
          </button>

          <div className="flex items-center gap-2">
            {projectsToMap.map((project, index) => (
              <button
                key={project.name}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Show ${project.name}`}
                aria-current={index === activeIndex}
                className={`h-2 w-2 rounded-full transition-colors duration-200 ${
                  index === activeIndex
                    ? "bg-zinc-200"
                    : "bg-zinc-700 hover:bg-zinc-500"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => stepProject(1)}
            aria-label="Next project"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-700 bg-zinc-950/70 text-zinc-400 transition-colors hover:border-zinc-500 hover:text-zinc-50"
          >
            <FiChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectCarousel;
