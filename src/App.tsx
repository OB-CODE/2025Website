import { useState } from "react";
import "./App.css";
import PersonalHeading from "./components/PersonalHeading/PersonalHeading";
import ProgrammingLanguages from "./components/ProgrammingIcons/ProgrammingLanguages";
import { ParticlesBackgroundDisplay } from "./components/PersonalHeading/ParticlesBackgroundDisplay";
import CardsIndexLeftScroll from "./components/MarqueeCards/CardsIndexLeftScroll";
import CardsIndexRightScroll from "./components/MarqueeCards/CardsIndexRightScroll";
import AboutMe from "./components/About/AboutMe";
import Moonlander from "./components/moonlander/Moonlander";

function App() {
  return (
    <div className="bg-[black] w-full p-0 m-0 min-h-screen text-white text-center flex items-center flex-col justify-center">
      <div className="bg-repeat-x">
        <ParticlesBackgroundDisplay />
      </div>
      <PersonalHeading />
      <div className="max-w-[calc(100vw)] md:max-w-[calc(100vw-30px)] overflow-hidden flex flex-col gap-4">
        <CardsIndexLeftScroll />
        <CardsIndexRightScroll />
      </div>

      <ProgrammingLanguages />
      <div className="w-full mt-[10vh]">
        <AboutMe />
        <div className="w-full min-h-[500px] pb-[10vh] flex justify-center">
          <Moonlander />
        </div>
      </div>
    </div>
  );
}

export default App;
