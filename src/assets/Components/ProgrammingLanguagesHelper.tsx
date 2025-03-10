// import viteLogo from "../../vite.svg";
import reactLogo from "../../assets/react.svg";

interface ILanguages {
  language: string;
  logo: string | undefined;
  alt: string;
}

export const knownLanguagesToMap: ILanguages[] = [
  { language: "React", logo: reactLogo, alt: "React Logo" },
  //   { language: "Vite", logo: viteLogo },
  { language: "Tailwind", logo: "tst", alt: "tailwind Logo" },
];
