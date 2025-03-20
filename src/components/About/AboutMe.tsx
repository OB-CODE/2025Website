import Heading2 from "../ui/heading2";

const aboutMeBlurb = {
  1: "I'm Mitchell O'Brien. I am a Software Engineer and I have a passion for problem solving and working with others.",
  2: "When im not wearing my coding hat, I can be found chilling my my partner and dog, surrfing, working out, bouldering, eating and drinking too much coffee.",
};

const AboutMe = () => {
  return (
    <div className="min-h-[25vh] pt-[10vh] pb-[5vh] flex flex-col items-center">
      <Heading2 inputString="About Me" />
      <div className="w-[60%] md:w-[80%] gap-3 flex flex-col pt-2">
        <div>{aboutMeBlurb[1]}</div>
        <div>{aboutMeBlurb[2]}</div>
      </div>
    </div>
  );
};

export default AboutMe;
