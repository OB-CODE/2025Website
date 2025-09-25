import { useState } from "react";
import { FaGlobe } from "react-icons/fa";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { TbStack } from "react-icons/tb";
import { Tooltip } from "react-tooltip";
import { knownLanguagesToMap } from "../ProgrammingIcons/ProgrammingLanguagesHelper";
import { DataGrid } from "../magicui/data-grid";
import { GlassCard } from "../ui/GlassCard";
import { OrbitingCircles } from "../ui/OrbitingCircles";

 export interface IprojectsToMap {
  name: string;
  description: string;
  mainImage?: string;
  images?: string[];
  github?: string;
  website?: string;
  techStack?: string[];
}

const ProjectCards = ({projectsToMap, isTallCard = false} : {projectsToMap: IprojectsToMap[], isTallCard?: boolean}) => {
  const [hoveringTechStackIndex, setHoveringTechStackIndex] = useState<
    null | number
  >(null);
  
  // State for tracking current image index for each project
  const [currentImageIndices, setCurrentImageIndices] = useState<number[]>(
    projectsToMap.map(() => 0)
  );
  
  // Helper functions for carousel navigation
  const nextImage = (projectIndex: number) => {
    setCurrentImageIndices(prevIndices => {
      const newIndices = [...prevIndices];
      const project = projectsToMap[projectIndex];
      
      // If no images array exists or contains only one item, do nothing
      if (!project.images || project.images.length <= 1) {
        return prevIndices;
      }
      
      const imageCount = project.images.length;
      newIndices[projectIndex] = (newIndices[projectIndex] + 1) % imageCount;
      return newIndices;
    });
  };
  
  const prevImage = (projectIndex: number) => {
    setCurrentImageIndices(prevIndices => {
      const newIndices = [...prevIndices];
      const project = projectsToMap[projectIndex];
      
      // If no images array exists or contains only one item, do nothing
      if (!project.images || project.images.length <= 1) {
        return prevIndices;
      }
      
      const imageCount = project.images.length;
      newIndices[projectIndex] = (newIndices[projectIndex] - 1 + imageCount) % imageCount;
      return newIndices;
    });
  };

  return (
    <div className={`w-full h-full flex   ${isTallCard ? "flex-col justify-center items-center" : "flex-wrap justify-between"}`}>
      {projectsToMap.map((project, index) => (
        <GlassCard
          key={index}
          variant="primary"
          glowColor="rgba(76, 97, 255, 0.5)"
          interactive={true}
          borderHighlight={true}
          className={`w-[90%] md:w-[48%] m-1 mb-5  flex flex-col ${isTallCard ? "min-h-[70vh]" : "min-h-[50vh]"}`}
        >
          {/* Header */}
          <div data-testid="projectContainer" className={`flex w-full px-1 pt-1 ${isTallCard ? "" : ""}`}>
            <div className="flex justify-between w-fit flex-grow-1 ">
              <div className="p-1 pl-4 w-fit flex justify-start items-center">
                <div
                  className="flex items-center"
                  onMouseEnter={() => setHoveringTechStackIndex(index)}
                  onMouseLeave={() => setHoveringTechStackIndex(null)}
                >
                  <TbStack className="cursor-help" />
                  <span className="text-gray-500 pl-2 cursor-help whitespace-nowrap">
                    Tech Stack
                  </span>
                </div>
              </div>
            </div>
            <div
              data-testid="projectHeaderTray"
              className="flex w-full justify-end p-1 pl-4 flex-grow-2"
            >
              <span className="text-gray-500 pl-2 cursor-help">
                website / Github
              </span>
              <div className="flex">
                <a href={project.website} target="_blank" rel="noreferrer">
                  <div className="border hover:cursor-pointer hover:bg-blue-500 hover:border-blue-500 w-6 h-6 flex items-center justify-center bg-gray-400 rounded-4xl mx-1">
                    <FaGlobe size={40} color="black" />
                  </div>
                </a>

                <div
                  className={`border ${
                    project.github
                      ? "hover:cursor-pointer hover:bg-blue-500 hover:border-blue-500"
                      : ""
                  } w-6 h-6 flex items-center justify-center bg-gray-400 rounded-4xl mx-1`}
                >
                  <a
                    data-tooltip-id={project.github ? "" : "my-tooltip"}
                    data-tooltip-content="This one's private - Sorry!"
                    data-tooltip-place="top"
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src={`https://cdn.simpleicons.org/github`}
                      alt="githubLogo"
                      height={40}
                      width={40}
                    />
                  </a>
                </div>
              </div>
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
            className="min-h-0 flex items-center justify-center flex-grow-2 relative z-10"
          >
            <div className={`w-full max-w-[700px]  relative ${isTallCard ? "max-h-[450px] h-[450px]" : "max-h-[315px] h-[315px]"}`}>
              {hoveringTechStackIndex === index ? (
                <div className="absolute inset-0 flex items-center justify-center text-white p-4 flex-col">
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
                    <div key={techIndex} className="text-gray-500">
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
                        prevImage(index);
                      }}
                      className="absolute left-2 z-20 bg-black/30 hover:bg-black/60 rounded-full p-2 text-white/70 hover:text-white/100 transition-opacity duration-200"
                      aria-label="Previous image"
                    >
                      <FiArrowLeft size={20} />
                    </button>
                  )}

                  {/* Image with transition effect */}
                  <div className="w-full h-full flex justify-center items-center overflow-hidden">
                    <img
                      src={project.images?.length ? 
                        project.images[currentImageIndices[index]] : 
                        project.mainImage
                      }
                      alt="Project"
                      className={`h-full opacity-70 p-4 transition-all duration-500 ease-in-out ${
                        isTallCard
                          ? "object-contain w-auto"  
                          : "object-cover w-full"
                      }`}
                    />
                  </div>

                  {/* Right arrow navigation - only show if there are multiple images */}
                  {project.images && project.images.length > 1 && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        nextImage(index);
                      }}
                      className="absolute right-2 z-20 bg-black/30 hover:bg-black/60 rounded-full p-2 text-white/70 hover:text-white/100 transition-opacity duration-200"
                      aria-label="Next image"
                    >
                      <FiArrowRight size={20} />
                    </button>
                  )}

                  {/* Image indicator dots - only show if there are multiple images */}
                  {project.images && project.images.length > 1 && (
                    <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                      {project.images.map((_, imgIndex) => (
                        <div 
                          key={imgIndex}
                          className={`w-2 h-2 rounded-full ${
                            currentImageIndices[index] === imgIndex ? 'bg-white' : 'bg-white/40'
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
            className="flex flex-col w-full items-center justify-start min-h-[12vh] pb-4"
          >
            <div className="w-[80%] text-left text-gray-500 text-xl">
              {project.name}
            </div>
            <div className="w-[80%] text-left text-gray-200">
              {project.description}
            </div>
          </div>
        </GlassCard>
      ))}
      <Tooltip id="my-tooltip" />
    </div>
  );
};

export default ProjectCards;
