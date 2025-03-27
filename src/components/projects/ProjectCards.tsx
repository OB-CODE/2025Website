import React from "react";
import GlowCard from "../ui/GlowCard";

const ProjectCards = () => {
  const projectsToMap = [
    {
      name: "indigo",
      description: "the best drinks company ever? IYKYK.",
    },
    {
      name: "plant one",
      description:
        "A simple application to show multi api consumption for an informaative visual representation.",
    },
    {
      name: "plant one",
      description:
        "A simple application to show multi api consumption for an informaative visual representation.",
    },
  ];

  return (
    <div className="w-full h-full flex flex-wrap justify-between">
      {projectsToMap.map((project) => {
        return (
          <GlowCard
            glowSize={250}
            glowColor="#444444"
            className="w-[90%] md:w-[48%] m-1 mb-5 min-h-[40vh] flex flex-col">
            {/* Header */}
            <div data-testid="projectContainer" className="flex w-full ">
              <div
                data-testid="projectHeaderTray"
                className="flex w-full justify-between p-1 px-3">
                <div>x</div>
                <div className="flex">
                  <div className="px-1">web</div>
                  <div className="px-1">git</div>
                </div>
              </div>
            </div>

            {/* Body - Expands to fill remaining space */}
            <div
              data-testid="projectBody"
              className="min-h-0 flex items-center justify-center flex-grow-2">
              img
            </div>

            {/* Footer */}
            <div
              data-testid="projectFooter"
              className="flex flex-col w-full items-center justify-start min-h-[12vh] pb-4">
              <div className="w-[80%] text-left text-gray-500 text-xl">
                {project.name}
              </div>
              <div className="w-[80%] text-left text-gray-200">
                {project.description}
              </div>
            </div>
          </GlowCard>
        );
      })}
    </div>
  );
};

export default ProjectCards;
