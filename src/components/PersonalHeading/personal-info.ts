interface IPersonalDetails {
  firstName: string;
  nickname: string;
  lastName: string;
  jobTitle: string;
  tagline: string;
  company: string;
  companyDescription: string;
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
    "Software engineer building products end-to-end. From database to pixel.",
  company: "Liquidity Cube",
  companyDescription: "OTC trading platform for fixed income assets",
  role: "Principal, Strategy & Developer",
  roleShort: "Principal, Strategy & Dev",
  stack: ["TypeScript", "Next.js", ".NET", "SQL"],
  offClock: ["surf", "coffee", "gym"],
};
