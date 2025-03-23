import Heading2 from "../ui/heading2";

const aboutMeBlurb = {
  1: "I have a passion for problem solving and working with others.",
  2: "When im not wearing my coding hat, I can be found chilling my my partner and dog, surrfing, working out, bouldering, eating and drinking too much coffee.",
  3: "It's often said a good tradesman never blames their tools - That's why I decided to tool with a split Dvorak layout. It's a lot more believable to blame the tools when they look more complicated ;)",
};

const AboutMe = () => {
  return (
    <div className="w-[80%] flex justify-center flex-col pb-5">
      <div className="w-full flex justify-end">
        <Heading2 inputString="About Me" />
      </div>
      <div className="flex flex-col items-end text-right w-full pt-6">
        <div className="flex flex-col w-[70%] gap-3 items-end">
          <div className="">{aboutMeBlurb[1]}</div>
          <div className=" text-gray-400">{aboutMeBlurb[2]}</div>
          <div className="text-gray-400">{aboutMeBlurb[3]}</div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
