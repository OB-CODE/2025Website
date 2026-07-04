import { useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { TbStack } from "react-icons/tb";
import { Tooltip } from "react-tooltip";
import { knownLanguagesToMap } from "../ProgrammingIcons/ProgrammingLanguagesHelper";
import { DataGrid } from "../magicui/data-grid";
import { GlassCard } from "../ui/GlassCard";
import { OrbitingCircles } from "../ui/OrbitingCircles";
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
  const [hoveringTechStackIndex, setHoveringTechStackIndex] = useState<
    null | number
  >(null);

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
        <GlassCard
          key={index}
          variant="primary"
          glowColor="rgba(76, 97, 255, 0.5)"
          interactive={true}
          borderHighlight={true}
          className={`flex w-full flex-col ${
            isTallCard ? "max-w-md min-h-[38rem]" : "min-h-[30rem]"
          }`}
        >
          {/* Header */}
          <div
            data-testid="projectContainer"
            className="flex w-full flex-wrap items-center justify-between gap-2 px-4 pt-3"
          >
            <div
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-gray-400 cursor-help transition-colors hover:border-aurora/50 hover:text-gray-200"
              onMouseEnter={() => setHoveringTechStackIndex(index)}
              onMouseLeave={() => setHoveringTechStackIndex(null)}
            >
              <TbStack />
              <span className="whitespace-nowrap">Tech Stack</span>
            </div>
            <div data-testid="projectHeaderTray">
              <ProjectLinks website={project.website} github={project.github} />
            </div>
          </div>

          {/* Data grid background */}
          <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
            <DataGrid
              columns={30}
              rows={15}
              cellSize={15}
              color={index % 2 === 0 ? "#4c61ff" : "#ba71ff"}
              density={0.1}
              speed={0.5}
              interactive={false}
              className="w-full h-full opacity-30"
            />
          </div>

          {/* Body - Expands to fill remaining space */}
          <div
            data-testid="projectBody"
            className="relative z-10 flex min-h-0 flex-grow items-center justify-center"
          >
            <div
              className={`relative w-full max-w-[700px] ${
                isTallCard ? "h-[26rem]" : "h-[18rem]"
              }`}
            >
              {hoveringTechStackIndex === index ? (
                // pointer-events-none: orbiting icons sweep under the cursor and
                // would steal hover from the Tech Stack chip, flickering the view
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-white p-4 flex-col">
                  <OrbitingCircles iconSize={80}>
                    {project.techStack?.map((tech, techIndex) => (
                      <div
                        key={techIndex}
                        className="flex flex-col items-center"
                      >
                        <img
                          src={
                            knownLanguagesToMap.find(
                              (language) => language.internalStackCode == tech
                            )?.logo || "useFallback"
                          }
                          className="rounded-xl border-rounded p-2 logo w-12 h-12"
                          alt={tech}
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display =
                              "none"; // Hide the image if it fails to load
                            const fallbackText = document.createElement("div");
                            fallbackText.textContent = tech;
                            fallbackText.className = "text-gray-500 text-sm";
                            (
                              e.target as HTMLImageElement
                            ).parentElement?.appendChild(fallbackText);
                          }}
                        />
                      </div>
                    ))}
                  </OrbitingCircles>
                  {project.techStack?.map((tech, techIndex) => (
                    <div key={techIndex} className="text-gray-400">
                      {tech}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="w-full h-full flex justify-center items-center text-center relative">
                  {/* Left arrow navigation - only show if there are multiple images */}
                  {project.images && project.images.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        stepImage(index, -1);
                      }}
                      className="absolute left-2 z-20 rounded-full border border-white/10 bg-black/40 p-2 text-white/70 backdrop-blur-sm transition-all duration-200 hover:border-nebula hover:bg-black/70 hover:text-white"
                      aria-label="Previous image"
                    >
                      <FiArrowLeft size={20} />
                    </button>
                  )}

                  {/* Image with transition effect */}
                  <div className="w-full h-full flex justify-center items-center overflow-hidden">
                    <img
                      src={
                        project.images?.length
                          ? project.images[currentImageIndices[index]]
                          : project.mainImage
                      }
                      alt={`${project.name} preview`}
                      loading="lazy"
                      className={`h-full p-4 opacity-80 transition-all duration-500 ease-in-out ${
                        isTallCard
                          ? "object-contain w-auto"
                          : "object-cover w-full rounded-3xl"
                      }`}
                    />
                  </div>

                  {/* Right arrow navigation - only show if there are multiple images */}
                  {project.images && project.images.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        stepImage(index, 1);
                      }}
                      className="absolute right-2 z-20 rounded-full border border-white/10 bg-black/40 p-2 text-white/70 backdrop-blur-sm transition-all duration-200 hover:border-nebula hover:bg-black/70 hover:text-white"
                      aria-label="Next image"
                    >
                      <FiArrowRight size={20} />
                    </button>
                  )}

                  {/* Image indicator dots - only show if there are multiple images */}
                  {project.images && project.images.length > 1 && (
                    <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
                      {project.images.map((_, imgIndex) => (
                        <div
                          key={imgIndex}
                          className={`h-2 w-2 rounded-full transition-all duration-300 ${
                            currentImageIndices[index] === imgIndex
                              ? "bg-aurora shadow-[0_0_6px_rgba(186,113,255,0.9)]"
                              : "bg-white/30"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div
            data-testid="projectFooter"
            className="z-10 flex min-h-28 w-full flex-col items-center justify-start gap-1 pb-5"
          >
            <div className="w-[85%] border-t border-white/10 pt-3 text-left font-display text-lg tracking-wide text-white">
              {project.name}
            </div>
            <div className="w-[85%] text-left text-sm text-gray-300">
              {project.description}
            </div>
          </div>
        </GlassCard>
      ))}
    </div>
    <Tooltip id="my-tooltip" />
    </>
  );
};

export default ProjectCards;
