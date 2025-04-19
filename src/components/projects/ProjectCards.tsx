import { useState } from "react";
import { FaGlobe } from "react-icons/fa";
import { TbStack } from "react-icons/tb";
import GlowCard from "../ui/GlowCard";
import { Tooltip } from "react-tooltip";
import { OrbitingCircles } from "../ui/OrbitingCircles";

interface IprojectsToMap {
  name: string;
  description: string;
  mainImage?: string;
  github?: string;
  website?: string;
  techStack?: string[];
}

const ProjectCards = () => {
  const projectsToMap: IprojectsToMap[] = [
    {
      name: "indigo",
      description: "The best drinks company ever? IYKYK.",
      mainImage: "/IndigoMainImage.png",
      website: "https://drinkindigo.com.au/",
      techStack: ["Liquid", "Shopify", "css3", "JavaScript"],
    },
    {
      name: "Pokemon Remastered",
      description:
        "A Pokemon battle simulator - Redo from an old project with some new features and a different stack. How quick can you catch the 151?",
      mainImage: "/PokemonRemasteredMainImage.png",
      website: "https://poke-battles-remastered.vercel.app/",
      github: "https://github.com/OB-CODE/PokeBattlesRemastered",
      techStack: [
        "React",
        "Nodejs",
        "Nextjs",
        "TypeScript",
        "TailwindCSS",
        "DynamoDB",
      ],
    },
    {
      name: "Home Harvest",
      description:
        "A weather / gardening application to show multi api consumption for a interactive user experience. Now get planting.",
      mainImage: "/HomeHarvestMainImage.png",
      website: "https://mitchell-home-harvest.surge.sh/",
      github: "https://github.com/OB-CODE/Home-Harvest",
      techStack: ["React", "Nodejs", "surge", "css3"],
    },
    {
      name: "Original Website",
      description: "My original website - showcasing some older projects.",
      mainImage: "/OldWebsiteMainImage.png",
      website: "https://www.mitch-obrien.com/",
      github: "https://github.com/OB-CODE/Personal-Website",
      techStack: ["React", "Nodejs", "AWS Amplify"],
    },
  ];

  const [hoveringTechStackIndex, setHoveringTechStackIndex] = useState<
    null | number
  >(null);

  return (
    <div className="w-full h-full flex flex-wrap justify-between">
      {projectsToMap.map((project, index) => (
        <GlowCard
          key={index}
          glowSize={250}
          glowColor="#444444"
          className="w-[90%] md:w-[48%] m-1 mb-5 min-h-[50vh] flex flex-col"
        >
          {/* Header */}
          <div data-testid="projectContainer" className="flex w-full">
            <div className="flex justify-between w-full">
              <div className="p-1 pl-4 w-full flex justify-start items-center">
                <div
                  className="flex items-center"
                  onMouseEnter={() => setHoveringTechStackIndex(index)}
                  onMouseLeave={() => setHoveringTechStackIndex(null)}
                >
                  <TbStack className="cursor-help" />
                  <span className="text-gray-500 pl-2 cursor-help">
                    Tech Stack
                  </span>
                </div>
              </div>
            </div>
            <div
              data-testid="projectHeaderTray"
              className="flex w-full justify-end p-1 px-3 pt-3"
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

          {/* Body - Expands to fill remaining space */}
          <div
            data-testid="projectBody"
            className="min-h-0 flex items-center justify-center flex-grow-2"
          >
            <div className="w-full max-w-[700px] max-h-[315px] h-[315px] relative">
              {hoveringTechStackIndex === index ? (
                <div className="absolute inset-0 flex items-center justify-center text-white p-4 flex-col">
                  <OrbitingCircles iconSize={80}>
                    {project.techStack?.map((tech, techIndex) => (
                      <div
                        key={techIndex}
                        className="flex flex-col items-center"
                      >
                        <img
                          src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${tech.toLowerCase()}/${tech.toLowerCase()}-original.svg`}
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
                <img
                  src={project.mainImage}
                  className="absolute inset-0 w-full h-full object-cover opacity-70 p-4"
                  alt="Project Main"
                />
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
        </GlowCard>
      ))}
      <Tooltip id="my-tooltip" />
    </div>
  );
};

export default ProjectCards;
