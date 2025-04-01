import { useEffect } from "react";
import "./App.css";
import AboutMe from "./components/About/AboutMe";
import CardsIndexLeftScroll from "./components/MarqueeCards/CardsIndexLeftScroll";
import CardsIndexRightScroll from "./components/MarqueeCards/CardsIndexRightScroll";
import Moonlander from "./components/moonlander/Moonlander";
import { ParticlesBackgroundDisplay } from "./components/PersonalHeading/ParticlesBackgroundDisplay";
import PersonalHeading from "./components/PersonalHeading/PersonalHeading";
import ProgrammingLanguages from "./components/ProgrammingIcons/ProgrammingLanguages";
import ProjectsIndex from "./components/projects/ProjectsIndex";

function App() {
  useEffect(() => {
    const iframe = document.querySelector("#iFrameContainer");
    if (iframe) {
      iframe.setAttribute("scrolling", "no"); // Disable scrolling
    }
  }, []);
  return (
    <div className="bg-[black] w-full p-0 m-0 min-h-screen text-white text-center flex items-center flex-col justify-center">
      <div className="bg-repeat-x w-full">
        <ParticlesBackgroundDisplay />
      </div>
      <PersonalHeading />
      <div className="overflow-hidden flex flex-col gap-4 w-full">
        <CardsIndexLeftScroll />
        <CardsIndexRightScroll />
      </div>
      <div className="w-full">
        <ProgrammingLanguages />
      </div>
      <div className="min-h-[25vh] pt-[5vh] w-full pb-[5vh] flex flex-col items-center bg-gradient-to-b from-[#141516] to-[#08090A]">
        <AboutMe />
        {/* <div className="relative w-64 h-64 flex items-center justify-center border border-gray-900"> */}
        <div className="w-full min-h-[600px] pb-[10vh] flex justify-center !overflow-hidden">
          <Moonlander />
        </div>
      </div>
      <div
        id="projectsIndexContainer"
        className="min-h-[25vh] pt-[5vh] w-full pb-[5vh] flex flex-col items-center bg-gradient-to-b from-[#141516] to-[#08090A]"
      >
        <ProjectsIndex />
      </div>
    </div>
  );
}

export default App;
