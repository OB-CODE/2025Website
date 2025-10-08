import { useEffect } from "react";
import "react-tooltip/dist/react-tooltip.css";
import "./App.css";
import "./components/header/header-spacing.css"; // Import header spacing CSS
import AboutMe from "./components/About/AboutMe";
import FooterIndex from "./components/footer/FooterIndex";
import SpaceHeader from "./components/header/SpaceHeader";
import { CosmicBackground } from "./components/magicui/cosmic-background";
import { StarBackground } from "./components/magicui/star-background";
import CardsScroll from "./components/MarqueeCards/CardsScroll";
import Moonlander from "./components/moonlander/Moonlander";
import PersonalHeading from "./components/PersonalHeading/PersonalHeading";
import ProgrammingLanguages from "./components/ProgrammingIcons/ProgrammingLanguages";
import ProjectsIndex from "./components/projects/ProjectsIndex";
import "./futuristic.css";
import Confetticomponent from "./components/Confetticomponent";

function App() {
  useEffect(() => {
    const iframe = document.querySelector("#iFrameContainer");
    if (iframe) {
      iframe.setAttribute("scrolling", "no"); // Disable scrolling
    }
  }, []);
  return (
    <div
      id="mainAppWrapper"
      className="bg-[black] w-full p-0 m-0 min-h-screen text-white text-center flex flex-col scan-line-wrapper"
    >
      {/* Fixed header at the top - no additional SpaceHeader should be rendered elsewhere */}
      <SpaceHeader />
      
      {/* Main content with padding to account for fixed header height */}
      <div className="header-padding-top w-full"> {/* Using the header-padding-top class for consistent spacing */}
        <div className="scan-line"></div>
        <div className="bg-repeat-x w-full">
          <CosmicBackground />
        </div>
        <div id="personalHeading">
          <PersonalHeading />
        </div>
        <div className="overflow-hidden flex flex-col gap-4 w-full">
          <CardsScroll direction="left" />
          <CardsScroll direction="right" />
        </div>
        <div className="w-full">
          <ProgrammingLanguages />
        </div>
        <div
          id="projectsIndexContainer"
          className="min-h-[25vh] pt-[5vh] w-full pb-[5vh] flex flex-col items-center"
        >
          <StarBackground />
          <div className="text-visible flex justify-center w-full">
            <ProjectsIndex />
          </div>
        </div>
        <div className="min-h-[25vh] pt-[5vh] w-full pb-[5vh] flex flex-col items-center justify-center bg-gradient-to-b from-[#141516] to-[#08090A]">
          <StarBackground />
          <div id="aboutMeSection" className="text-visible flex justify-center flex-col w-full items-center">
            <AboutMe />
            {/* <div className="relative w-64 h-64 flex items-center justify-center border border-gray-900"> */}
            <div className="w-full min-h-[600px] pb-[10vh] flex flex-col items-center justify-center !overflow-hidden">
              <Moonlander />
              <Confetticomponent />
            </div>
          </div>
        </div>

        <div
          id="footerContainer"
          className="min-h-[20vh] pt-[1vh] w-full pb-[1vh] flex flex-col items-center justify-center bg-black"
        >
          <StarBackground color="rgba(0, 0, 0, 0.9)" />
          <div className="text-visible w-full flex flex-col items-center">
            <div id="contactSection" className="w-full flex justify-center items-center">
              <FooterIndex />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
