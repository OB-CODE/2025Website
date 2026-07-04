import { useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { Tooltip } from "react-tooltip";
import ProjectLinks from "./ProjectLinks";

export interface IprojectsToMap {
  name: string;
  description: string;
  mainImage?: string;
  images?: string[];
  github?: string;
  website?: string;
  techStack?: string[];
}

const ProjectCards = ({
  projectsToMap,
  isTallCard = false,
}: {
  projectsToMap: IprojectsToMap[];
  isTallCard?: boolean;
}) => {
  // State for tracking current image index for each project
  const [currentImageIndices, setCurrentImageIndices] = useState<number[]>(
    projectsToMap.map(() => 0)
  );

  // Helper for carousel navigation; step is +1 (next) or -1 (previous)
  const stepImage = (projectIndex: number, step: 1 | -1) => {
    setCurrentImageIndices((prevIndices) => {
      const project = projectsToMap[projectIndex];

      // If no images array exists or contains only one item, do nothing
      if (!project.images || project.images.length <= 1) {
        return prevIndices;
      }

      const imageCount = project.images.length;
      const newIndices = [...prevIndices];
      newIndices[projectIndex] =
        (newIndices[projectIndex] + step + imageCount) % imageCount;
      return newIndices;
    });
  };

  return (
    <>
      <div
        className={`w-full ${
          isTallCard
            ? "flex flex-col items-center"
            : "grid grid-cols-1 gap-6 md:grid-cols-2"
        }`}
      >
        {projectsToMap.map((project, index) => (
          <div
            key={index}
            className={`flex w-full flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/40 transition-colors duration-200 hover:border-zinc-700 ${
              isTallCard ? "max-w-md" : ""
            }`}
          >
            {/* Header */}
            <div
              data-testid="projectContainer"
              className="flex w-full flex-wrap items-center justify-between gap-2 border-b border-zinc-800/80 px-5 py-3"
            >
              <div className="text-base font-medium text-zinc-50">
                {project.name}
              </div>
              <div data-testid="projectHeaderTray">
                <ProjectLinks website={project.website} github={project.github} />
              </div>
            </div>

            {/* Body */}
            <div
              data-testid="projectBody"
              className="relative flex items-center justify-center bg-zinc-950/60"
            >
              <div
                className={`relative flex w-full items-center justify-center ${
                  isTallCard ? "h-[26rem]" : "h-[16rem]"
                }`}
              >
                {/* Left arrow navigation - only show if there are multiple images */}
                {project.images && project.images.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      stepImage(index, -1);
                    }}
                    className="absolute left-3 z-20 rounded-full border border-zinc-700 bg-zinc-950/70 p-2 text-zinc-400 backdrop-blur-sm transition-colors hover:border-zinc-500 hover:text-zinc-50"
                    aria-label="Previous image"
                  >
                    <FiArrowLeft size={16} />
                  </button>
                )}

                <img
                  src={
                    project.images?.length
                      ? project.images[currentImageIndices[index]]
                      : project.mainImage
                  }
                  alt={`${project.name} preview`}
                  loading="lazy"
                  className={`h-full transition-opacity duration-300 ${
                    isTallCard
                      ? "w-auto object-contain py-4"
                      : "w-full object-cover"
                  }`}
                />

                {/* Right arrow navigation - only show if there are multiple images */}
                {project.images && project.images.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      stepImage(index, 1);
                    }}
                    className="absolute right-3 z-20 rounded-full border border-zinc-700 bg-zinc-950/70 p-2 text-zinc-400 backdrop-blur-sm transition-colors hover:border-zinc-500 hover:text-zinc-50"
                    aria-label="Next image"
                  >
                    <FiArrowRight size={16} />
                  </button>
                )}

                {/* Image indicator dots - only show if there are multiple images */}
                {project.images && project.images.length > 1 && (
                  <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
                    {project.images.map((_, imgIndex) => (
                      <div
                        key={imgIndex}
                        className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                          currentImageIndices[index] === imgIndex
                            ? "bg-zinc-200"
                            : "bg-zinc-700"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div
              data-testid="projectFooter"
              className="flex w-full flex-grow flex-col gap-3 border-t border-zinc-800/80 px-5 py-4"
            >
              <div className="text-left text-sm text-zinc-400">
                {project.description}
              </div>
              {project.techStack && (
                <div className="mt-auto flex flex-wrap gap-1.5">
                  {project.techStack.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="rounded-md border border-zinc-800 bg-zinc-900 px-2 py-0.5 font-mono text-xs text-zinc-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <Tooltip id="my-tooltip" />
    </>
  );
};

export default ProjectCards;
