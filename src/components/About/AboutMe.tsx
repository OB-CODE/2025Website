import { RetroTerminal } from "../magicui/retro-terminal";
import Heading2 from "../ui/Heading2";

const aboutMeBlurb = [
  "I have a passion for problem solving and working with others.",
  "When I'm not wearing my coding hat, I can be found chilling with my partner and dog, surfing, working out, bouldering, eating and drinking too much coffee.",
  "It's often said a good tradesman never blames their tools - That's why I decided to tool with a split Dvorak layout. It's a lot more believable to blame the tools when they look more complicated ;)",
];

const AboutMe = () => {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col px-6">
      <Heading2 inputString="About Me" />

      <div className="mt-8 grid items-start gap-8 md:grid-cols-[2fr_3fr]">
        <RetroTerminal typingSpeed={20}>
          {`> Loading developer profile...
> Name: Mitchell O'Brien
> Occupation: Software Engineer
> Status: Coding in progress
> Advanced Projects:
 > Access denied... NDA Restricted...`}
        </RetroTerminal>

        <div className="flex flex-col gap-4">
          {aboutMeBlurb.map((message, index) => (
            <p
              key={index}
              className={`text-sm leading-relaxed md:text-base ${
                index !== 0 ? "text-zinc-400" : "text-zinc-100"
              }`}
            >
              {message}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
