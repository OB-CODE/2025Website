import { FaGlobe } from "react-icons/fa";

import GlowCard from "../ui/GlowCard";
import { Tooltip } from "react-tooltip";

interface IprojectsToMap {
  name: string;
  description: string;
  mainImage?: string;
  github?: string;
  website?: string;
}

const ProjectCards = () => {
  const projectsToMap: IprojectsToMap[] = [
    {
      name: "indigo",
      description: "The best drinks company ever? IYKYK.",
      mainImage: "/IndigoMainImage.png",
      website: "https://drinkindigo.com.au/",
      // no Github - Private.
    },
    {
      name: "Pokemon Remastered",
      description:
        "A Pokemon battle simulator - Redo from an old project with some new features and a different stack. How quick can you catch the 151?",
      mainImage: "/PokemonRemasteredMainImage.png",
      website: "https://poke-battles-remastered.vercel.app/",
      github: "https://github.com/OB-CODE/PokeBattlesRemastered",
    },
    {
      name: "Home Harvest",
      description:
        "A weather / gardening application to show multi api consumption for a interactive user experience. Now get planting.",
      mainImage: "/HomeHarvestMainImage.png",
      website: "https://mitchell-home-harvest.surge.sh/",
      github: "https://github.com/OB-CODE/Home-Harvest",
    },

    {
      name: "Original Website",
      description: "My original website - showcasing some older projects.",
      mainImage: "/OldWebsiteMainImage.png",
      website: "https://www.mitch-obrien.com/",
      github: "https://github.com/OB-CODE/Personal-Website",
    },
  ];

  return (
    <div className="w-full h-full flex flex-wrap justify-between">
      {projectsToMap.map((project, index) => {
        return (
          <GlowCard
            key={index}
            glowSize={250}
            glowColor="#444444"
            className="w-[90%] md:w-[48%] m-1 mb-5 min-h-[50vh] flex flex-col"
          >
            {/* Header */}
            <div data-testid="projectContainer" className="flex w-full ">
              <div
                data-testid="projectHeaderTray"
                className="flex w-full justify-end p-1 px-3 pt-3"
              >
                {/* <div>x</div> */}
                <div className="flex">
                  <a href={project.website} target="_blank" rel="noreferrer">
                    <div className="border hover:cursor-pointer hover:bg-blue-500 hover:border-blue-500 w-6 h-6 flex items-center justify-center bg-gray-400 rounded-4xl mx-1">
                      <FaGlobe size={40} color="black" />
                    </div>
                  </a>

                  <div
                    className={`border ${
                      project.github
                        ? "hover:cursor-pointer hover:bg-blue-500 hover:border-blue-500 "
                        : ""
                    } w-6 h-6 flex items-center justify-center bg-gray-400 rounded-4xl mx-1`}
                  >
                    <a
                      data-tooltip-id={project.github ? "" : "my-tooltip"}
                      data-tooltip-content="This ones private - Sorry!"
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
              <div className="flex w-full h-full items-center justify-center">
                {project.mainImage ? (
                  <img
                    src={project.mainImage}
                    className="opacity-70 w-full max-w-[700px] max-h-[315px] p-4"
                    alt=""
                  />
                ) : (
                  "img"
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
        );
      })}
      <Tooltip id="my-tooltip" />
    </div>
  );
};

export default ProjectCards;
