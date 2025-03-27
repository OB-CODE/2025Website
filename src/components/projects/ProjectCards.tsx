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
            className={`w-[90%] md:w-[48%] m-1 mb-5 h-[40vh]`}
            glowColor="#825D8D"
            glowSize={300}>
            {project.name}
            <div className="bg-black">{project.description}</div>
          </GlowCard>
        );
      })}
    </div>
  );
};

export default ProjectCards;
