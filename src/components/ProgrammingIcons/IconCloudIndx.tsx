import { IconCloud } from "../magicui/icon-cloud";
import { knownLanguagesToMap } from "./ProgrammingLanguagesHelper";

// marge all slugs stored on the programming list with the slugs listed below.
let slugs = [
  "css3",
  "express",
  "amazonaws",
  "postgresql",
  "vercel",
  "testinglibrary",
  "git",
  "github",
  "visualstudiocode",
];

function addExtraSlugs() {
  knownLanguagesToMap.forEach((language) => {
    slugs.push(language.slug);
  });
}

export function IconCloudIndex() {
  addExtraSlugs();

  const images = slugs.map(
    (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`
  );

  return (
    <div className="relative flex size-full items-center justify-center overflow-hidden">
      <IconCloud images={images} />
    </div>
  );
}
