import "react-tooltip/dist/react-tooltip.css";
import "./App.css";
import AboutMe from "./components/About/AboutMe";
import Confetticomponent from "./components/Confetticomponent";
import ExperienceSection from "./components/experience/ExperienceSection";
import FooterIndex from "./components/footer/FooterIndex";
import SiteHeader from "./components/header/SiteHeader";
import Moonlander from "./components/moonlander/Moonlander";
import NowSection from "./components/now/NowSection";
import PersonalHeading from "./components/PersonalHeading/PersonalHeading";
import ProgrammingLanguages from "./components/ProgrammingIcons/ProgrammingLanguages";
import ProjectsIndex from "./components/projects/ProjectsIndex";
import SkillCards from "./components/SkillCards/SkillCards";

function App() {
  return (
    <div className="min-h-screen w-full bg-zinc-950 text-zinc-50">
      <SiteHeader />

      <main className="pt-16">
        <div id="personalHeading">
          <PersonalHeading />
        </div>

        {/* Placeholder: a short "what's happening now" strip */}
        <NowSection />

        <section className="border-t border-zinc-800/80 py-20 md:py-24">
          <SkillCards />
        </section>

        <section className="border-t border-zinc-800/80 py-20 md:py-24">
          <ProgrammingLanguages />
        </section>

        <section
          id="projectsIndexContainer"
          className="border-t border-zinc-800/80 py-20 md:py-24"
        >
          <ProjectsIndex />
        </section>

        {/* Placeholder: professional history */}
        <section
          id="experienceSection"
          className="border-t border-zinc-800/80 py-20 md:py-24"
        >
          <ExperienceSection />
        </section>

        <section
          id="aboutMeSection"
          className="border-t border-zinc-800/80 py-20 md:py-24"
        >
          <AboutMe />
          <div className="mx-auto mt-12 w-full max-w-5xl px-6">
            <Moonlander />
          </div>
          <div className="mt-12 flex w-full justify-center">
            <Confetticomponent />
          </div>
        </section>

        <div id="contactSection">
          <FooterIndex />
        </div>
      </main>
    </div>
  );
}

export default App;
