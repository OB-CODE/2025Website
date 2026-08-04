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
              className="absolute inset-x-8 -bottom-6 top-6 z-0 rounded-2xl border border-zinc-800 bg-zinc-900/40"
            />
            <div
              aria-hidden="true"
              className="absolute inset-x-4 -bottom-3 top-4 z-0 rounded-2xl border border-zinc-700/70 bg-zinc-900/60"
            />
          </>
        )}

        {/* The trading-card frame: a band of card stock around the artwork, lit along the
            top edge. Its gradient has to stay opaque - the card inside is translucent, and
            anything less lets the deck underneath show straight through. */}
        <div className="relative z-10 rounded-2xl border border-zinc-700 bg-gradient-to-b from-zinc-800 via-zinc-900 to-zinc-950 p-2.5 shadow-2xl shadow-black/60 ring-1 ring-inset ring-white/5">
          <ProjectCard
            key={activeProject.name}
            project={activeProject}
            isTallCard={true}
          />
        </div>
      </div>

      {/* Deliberately louder than the arrows sitting over the screenshot: those step
          through one card's screens, these swap the card itself. Same shape at the same
          size would read as the same control. */}
      {hasDeck && (
        <div className="mt-9 flex items-center gap-3 rounded-full border border-zinc-700 bg-zinc-900 px-3 py-2 shadow-lg shadow-black/40">
          <button
            type="button"
            onClick={() => stepProject(-1)}
            aria-label="Previous project"
            className="flex items-center gap-1 rounded-full bg-zinc-800 py-2 pl-3 pr-4 text-sm font-medium text-zinc-100 transition-colors hover:bg-zinc-700"
          >
            <FiChevronLeft size={18} />
            Prev
          </button>

          <div className="flex items-center gap-2 px-1">
            {projectsToMap.map((project, index) => (
              <button
                key={project.name}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Show ${project.name}`}
                aria-current={index === activeIndex}
                className={`h-2.5 w-2.5 rounded-full transition-colors duration-200 ${
                  index === activeIndex
                    ? "bg-zinc-100"
                    : "bg-zinc-600 hover:bg-zinc-400"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => stepProject(1)}
            aria-label="Next project"
            className="flex items-center gap-1 rounded-full bg-zinc-800 py-2 pl-4 pr-3 text-sm font-medium text-zinc-100 transition-colors hover:bg-zinc-700"
          >
            Next
            <FiChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectCarousel;
