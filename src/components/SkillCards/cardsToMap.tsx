import {
  climbingSVG,
  frontEndSVG,
  leadershipSVG,
  moonlanderSVG,
  studentSVG,
  surfSVG,
  teacherSVG,
} from "./marqueeSVGs";

const surfDetailsObject = {
  logo: surfSVG,
  title: "Average Surfer",
  description:
    "'Not the finest swordsman in the world, but the most enthusiastic.' - The Big Knights",
};
const frontEndDetailsObject = {
  logo: frontEndSVG,
  title: "Front End Development",
  description:
    "Two years of industry experience in React, Next.js, and TypeScript.",
};
const keyboardDetailsObject = {
  logo: moonlanderSVG,
  title: "Moonlander astronaut",
  description:
    "FACT: Typing is cool and all, but typing on a moonlander is cooler.",
};
const leadershipDetailsObject = {
  logo: leadershipSVG,
  title: "Leadership / Management / Coach",
  description:
    "Years of experience in leading teams and facilitating group goals.",
};
const educationDetailsObject = {
  logo: teacherSVG,
  title: "Educator / Teacher",
  description:
    "Passionate about teaching / learning. Fostering analytical thinking / problem-solving.",
};
const studentDetailsObject = {
  logo: studentSVG,
  title: "Lifelong Learner",
  description:
    "Growth mindset. Student of everything with a passion for programming.",
};

const climbingDetailsObject = {
  logo: climbingSVG,
  title: "Climbing Novice",
  description: "Climbs for joy. Hangs around for the problem-solving.",
};

export const objsToMap = [
  surfDetailsObject,
  frontEndDetailsObject,
  keyboardDetailsObject,
  leadershipDetailsObject,
  studentDetailsObject,
  climbingDetailsObject,
  educationDetailsObject,
];
