// import viteLogo from "../../vite.svg";
import reactLogo from "../../assets/react.svg";

interface ILanguages {
  language: string;
  logo: string | undefined;
  alt: string;
  additionalClassname: string | null; // used to add specific classnames to mapping.
}

export const knownLanguagesToMap: ILanguages[] = [
  {
    language: "React",
    logo: reactLogo,
    alt: "React Logo",
    additionalClassname: "logoRotate",
  },
  //   { language: "Vite", logo: viteLogo },
  {
    language: "Tailwind",
    logo: "tst",
    alt: "tailwind Logo",
    additionalClassname: null,
  },
];
