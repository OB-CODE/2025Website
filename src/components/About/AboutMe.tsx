import Heading2 from "../ui/heading2";

const aboutMeBlurb = {
  1: "I'm Mitchell O'Brien. I am a Software Engineer and I have a passion for problem solving and working with others.",
  2: "When im not wearing my coding hat, I can be found chilling my my partner and dog, surrfing, working out, bouldering, eating and drinking too much coffee.",
};

const AboutMe = () => {
  return (
    <div className="w-[80%] flex justify-center flex-col pb-10">
      <div className="w-full flex justify-end">
        <Heading2 inputString="About Me" />
      </div>
      <div className="flex flex-col items-end text-right w-full pt-6">
        <div className="flex flex-col w-[50%] gap-3">
          <div>{aboutMeBlurb[1]}</div>
          <div>{aboutMeBlurb[2]}</div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
