interface ILanguages {
  language: string;
  logo: string | undefined;
  alt: string;
  slug: string;
  additionalClassname?: string; // used to add specific classnames to mapping.
}

export const knownLanguagesToMap: ILanguages[] = [
  {
    language: "JavaScript",
    logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg",
    alt: "JavaScript Logo",
    slug: "javascript",
  },
  {
    language: "NodeJS",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg",
    alt: "Node JS Logo",
    slug: "nodedotjs",
  },
  {
    language: "HTML5",
    logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg",
    alt: "HTML5 Logo",
    slug: "html5",
  },
  {
    language: "React",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
    alt: "React Logo",
    additionalClassname: "logoRotate",
    slug: "react",
  },
  {
    language: "Jest",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jest/jest-plain.svg",
    alt: "Jest Logo",
    slug: "jest",
  },
  {
    language: "Postman",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg",
    alt: "Postman Logo",
    slug: "postman",
  },
  {
    language: "TypeScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
    alt: "TypeScript Logo",
    slug: "typescript",
  },
  {
    language: "Next.JS",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
    alt: "Next.JS Logo",
    slug: "nextdotjs",
  },
  {
    language: "Tailwind",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
    alt: "tailwind Logo",
    slug: "tailwindcss",
  },
  {
    language: "C#",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg",
    alt: "C# Logo",
    slug: "",
  },
  {
    language: "Vite",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg",
    alt: "Vite Logo",
    slug: "vite",
  },
];
