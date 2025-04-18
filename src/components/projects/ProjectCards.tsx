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
    },
    {
      name: "plant one",
      description:
        "A simple application to show multi api consumption for an informaative visual representation.",
    },
    {
      name: "plant two",
      description:
        "A simple application to show multi api consumption for an informaative visual representation 2.",
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
                      data-tooltip-content="This ones a private - Sorry!"
                      data-tooltip-place="top"
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
              {project.mainImage ? (
                <img
                  src={project.mainImage}
                  className="w-full h-full p-4"
                  alt=""
                />
              ) : (
                "img"
              )}
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
