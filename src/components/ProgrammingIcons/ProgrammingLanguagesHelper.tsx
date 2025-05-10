interface ILanguages {
  language: string;
  internalStackCode: string;
  logo: string | undefined;
  alt: string;
  slug: string;
  additionalClassname?: string; // used to add specific classnames to mapping.
}

export const knownLanguagesToMap: ILanguages[] = [
  {
    language: "JavaScript",
    internalStackCode: "JavaScript",
    logo: "/logos/javascript-original.svg",
    //"https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg",
    alt: "JavaScript Logo",
    slug: "javascript",
  },
  {
    language: "NodeJS",
    internalStackCode: "Nodejs",
    logo: "/logos/nodejs-original-wordmark.svg", //"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg",
    alt: "Node JS Logo",
    slug: "nodedotjs",
  },
  {
    language: "HTML5",
    internalStackCode: "HTML5",
    logo: "/logos/html5-original-wordmark.svg", //"https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg",
    alt: "HTML5 Logo",
    slug: "html5",
  },
  {
    language: "React",
    internalStackCode: "React",
    logo: "/logos/react-original.svg", //"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
    alt: "React Logo",
    additionalClassname: "logoRotate",
    slug: "react",
  },
  {
    language: "Jest",
    internalStackCode: "Jest",
    logo: "/logos/jest-plain.svg", // "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jest/jest-plain.svg",
    alt: "Jest Logo",
    slug: "jest",
  },
  {
    language: "Postman",
    internalStackCode: "Postman",
    logo: "/logos/postman-original.svg", // "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg",
    alt: "Postman Logo",
    slug: "postman",
  },
  {
    language: "TypeScript",
    internalStackCode: "TypeScript",
    logo: "/logos/typescript-original.svg", // "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
    alt: "TypeScript Logo",
    slug: "typescript",
  },

  {
    language: "Next.JS",
    internalStackCode: "Nextjs",
    logo: "/logos/nextjs-original.svg", // "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
    alt: "Next.JS Logo",
    slug: "nextdotjs",
  },
  {
    language: "Tailwind",
    internalStackCode: "TailwindCSS",
    logo: "/logos/tailwindcss-original.svg", // "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
    alt: "tailwind Logo",
    slug: "tailwindcss",
  },
  {
    language: "C#",
    internalStackCode: "CSharp",
    logo: "/logos/csharp-original.svg", // "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg",
    alt: "C# Logo",
    slug: "",
  },
  {
    language: "Vite",
    internalStackCode: "Vite",
    logo: "/logos/vitejs-original.svg", // "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg",
    alt: "Vite Logo",
    slug: "vite",
  },
  // used for project cards
  {
    language: "Shopify",
    internalStackCode: "Shopify",
    logo: "/logos/shopify.svg",
    alt: "Shopify Logo",
    slug: "Shopify",
  },
  {
    language: "css3",
    internalStackCode: "css3",
    logo: "/logos/css3.svg",
    alt: "css3 Logo",
    slug: "css3",
  },
  {
    language: "awsDynamodb",
    internalStackCode: "DynamoDB",
    logo: "/logos/awsDynamodb.svg",
    alt: "awsDynamodb Logo",
    slug: "awsDynamodb",
  },
  {
    language: "aws",
    internalStackCode: "AWS Amplify",
    logo: "/logos/aws-2.svg",
    alt: "aws Logo",
    slug: "aws",
  },
];
