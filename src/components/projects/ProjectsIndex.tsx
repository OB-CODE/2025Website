import Heading2 from "../ui/heading2";
import ProjectCards from "./ProjectCards";

const ProjectsIndex = () => {
  return (
    <div className="flex items-start w-[80%] flex-col">
      <Heading2 data-testid="PortfolioHeader" inputString="Portfolio" />
      <div className="pt-[3vh] w-full">
        <ProjectCards />
      </div>
    </div>
  );
};

export default ProjectsIndex;
