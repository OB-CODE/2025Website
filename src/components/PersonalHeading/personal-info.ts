interface IPersonalDetails {
  firstName: string;
  nickname: string;
  lastName: string;
  jobTitle: string;
  tagline: string;
  company: string;
  role: string;
  roleShort: string;
  stack: string[];
  offClock: string[];
}

export const personalDetails: IPersonalDetails = {
  firstName: "Mitchell",
  nickname: "Mitch",
  lastName: "O'Brien",
  jobTitle: "Software Engineer",
  tagline:
    "Software engineer building products end-to-end — from database to pixel.",
  company: "Liquidity Cube",
  role: "Principal, Strategy & Developer",
  roleShort: "Principal, Strategy & Dev",
  stack: ["TypeScript", "Next.js", ".NET", "SQL"],
  offClock: ["surf", "coffee", "gym"],
};
