import Heading2 from "../ui/Heading2";
import ProjectCards from "./ProjectCards";

const ProjectsIndex = () => {
  const projectsMessage = [
    "A small collection of my projects.",
    "Click on the cards to view a larger example.",
    "Check out the githubs/live demos if you want a better idea. Better yet, get in touch and lets chat!",
  ];

  return (
    <div
      data-testid="PortfolioHeader"
      className="flex items-start w-[80%] flex-col"
    >
      <Heading2 inputString="Portfolio" />
      <div className="flex flex-col w-[70%] gap-3 items-start">
        {projectsMessage.map((message, index) => (
          <div key={index} className={`${index != 0 ? "text-gray-400" : ""}`}>
            {message}
          </div>
        ))}
      </div>
      <div className="pt-[3vh] w-full">
        <ProjectCards />
      </div>
    </div>
  );
};

export default ProjectsIndex;
