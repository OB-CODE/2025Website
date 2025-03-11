// import viteLogo from "../../vite.svg";
import reactLogo from "../../assets/react.svg";

interface ILanguages {
  language: string;
  logo: string | undefined;
  alt: string;
  additionalClassname?: string; // used to add specific classnames to mapping.
}

export const knownLanguagesToMap: ILanguages[] = [
  {
    language: "JavaScript",
    logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg",
    alt: "JavaScript Logo",
  },
  {
    language: "NodeJS",
    logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg",
    alt: "Node JS Logo",
  },
  {
    language: "HTML5",
    logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg",
    alt: "HTML5 Logo",
  },
  {
    language: "React",
    logo: reactLogo,
    alt: "React Logo",
    additionalClassname: "logoRotate",
  },
  {
    language: "Jest",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jest/jest-plain.svg",
    alt: "Jest Logo",
  },
  {
    language: "Postman",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg",
    alt: "Postman Logo",
  },
  {
    language: "TypeScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
    alt: "TypeScript Logo",
  },
  {
    language: "Next.JS",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
    alt: "Next.JS Logo",
  },
  {
    language: "Tailwind",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original-wordmark.svg",
    alt: "tailwind Logo",
  },
  {
    language: "C#",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg",
    alt: "C# Logo",
  },
];
