import Heading2 from "../ui/heading2";

const aboutMeBlurb = {
  1: "I'm Mitchell O'Brien. I am a Software Engineer and I have a passion for problem solving and working with others.",
  2: "When im not wearing my coding hat, I can be found chilling my my partner and dog, surrfing, working out, bouldering, eating and drinking too much coffee.",
};

const AboutMe = () => {
  return (
    <div className="min-h-[25vh] pt-[5vh] w-full pb-[5vh] flex flex-col items-center bg-gradient-to-b from-[#141516] to-[#08090A]">
      <div className="w-[80%] flex justify-center flex-col">
        <div className="w-full flex justify-start">
          <Heading2 inputString="About Me" />
        </div>
        <div className=" gap-3 flex flex-col justify-start text-left w-[60%] pt-6">
          <div>{aboutMeBlurb[1]}</div>
          <div>{aboutMeBlurb[2]}</div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
