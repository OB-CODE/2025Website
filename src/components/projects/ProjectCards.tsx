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
  ];

  return (
    <div className="w-full h-full flex flex-row">
      <GlowCard className={`w-full`} glowColor="#825D8D" glowSize={100}>
        test
        <div className="bg-black">No Hover?</div>
      </GlowCard>
    </div>
  );
};

export default ProjectCards;
