import Heading2 from "../ui/Heading2";
import CyberpunkGrid from "../magicui/cyberpunk-grid";
import { RetroTerminal } from "../magicui/retro-terminal";

const aboutMeBlurb = [
  "I have a passion for problem solving and working with others.",
  "When im not wearing my coding hat, I can be found chilling with my partner and dog, surfing, working out, bouldering, eating and drinking too much coffee.",
  "It's often said a good tradesman never blames their tools - That's why I decided to tool with a split Dvorak layout. It's a lot more believable to blame the tools when they look more complicated ;)",
];

const AboutMe = () => {
  return (
    <div className="w-[80%] flex justify-center flex-col pb-20 items-center relative">
      <div className="w-full flex justify-end z-content">
        <Heading2 inputString="About Me" className="text-glow" />
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between w-full pt-6 gap-6 z-content">
        <div className="w-full md:w-1/3">
          <RetroTerminal typingSpeed={20} className="hover-pulse">
            {`> Loading developer profile...
> Name: Mitchell O'Brien
> Occupation: Software Engineer
> Status: Coding in progress
> Advanced Projects:
 > Access denied... NDA Restricted...`}
          </RetroTerminal>
        </div>

        <div className="flex flex-col w-full md:w-[60%] gap-3 items-end text-right">
          {aboutMeBlurb.map((message, index) => (
            <div
              key={index}
              className={`${
                index !== 0 ? "text-gray-300" : "text-white"
              } content-box backdrop-blur-md text-enhanced`}
            >
              {message}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
