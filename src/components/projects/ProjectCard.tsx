import { useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import ProjectLinks from "./ProjectLinks";

export interface IprojectsToMap {
  name: string;
  description: string;
  mainImage?: string;
  images?: string[];
  github?: string;
  /** Tooltip shown on the disabled GitHub badge, e.g. for confidential company repos. */
  githubNote?: string;
  website?: string;
  techStack?: string[];
}

/** One portfolio card: header, screenshot carousel, description and tech stack. */
const ProjectCard = ({
  project,
  isTallCard = false,
}: {
  project: IprojectsToMap;
  isTallCard?: boolean;
}) => {
  const [imageIndex, setImageIndex] = useState(0);

  // A lone image isn't a carousel - the arrows and dots only earn their place from two up.
  const images = project.images && project.images.length > 1 ? project.images : null;

  // step is +1 (next) or -1 (previous), wrapping at both ends
  const stepImage = (step: 1 | -1) => {
    if (!images) return;
    setImageIndex((current) => (current + step + images.length) % images.length);
  };

  return (
    <div
      className={`flex w-full flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/40 transition-colors duration-200 hover:border-zinc-700 ${
        isTallCard ? "max-w-md shadow-xl shadow-black/40" : ""
      }`}
    >
      {/* Header */}
      <div
        data-testid="projectContainer"
        className="flex w-full flex-wrap items-center justify-between gap-2 border-b border-zinc-800/80 px-5 py-3"
      >
        <div className="text-base font-medium text-zinc-50">{project.name}</div>
        <div data-testid="projectHeaderTray">
          <ProjectLinks
            website={project.website}
            github={project.github}
            githubNote={project.githubNote}
          />
        </div>
      </div>

      {/* Body */}
      <div
        data-testid="projectBody"
        className="relative flex items-center justify-center bg-zinc-950/60"
      >
        <div
          className={`relative flex w-full items-center justify-center ${
            isTallCard ? "h-[26rem]" : "h-[16rem]"
          }`}
        >
          {images && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                stepImage(-1);
              }}
              className="absolute left-3 z-20 rounded-full border border-zinc-700 bg-zinc-950/70 p-2 text-zinc-400 backdrop-blur-sm transition-colors hover:border-zinc-500 hover:text-zinc-50"
              aria-label="Previous image"
            >
              <FiArrowLeft size={16} />
            </button>
          )}

          <img
            src={images ? images[imageIndex] : project.mainImage}
            alt={`${project.name} preview`}
            loading="lazy"
            className={`h-full transition-opacity duration-300 ${
              isTallCard ? "w-auto object-contain py-4" : "w-full object-cover"
            }`}
          />

          {images && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                stepImage(1);
              }}
              className="absolute right-3 z-20 rounded-full border border-zinc-700 bg-zinc-950/70 p-2 text-zinc-400 backdrop-blur-sm transition-colors hover:border-zinc-500 hover:text-zinc-50"
              aria-label="Next image"
            >
              <FiArrowRight size={16} />
            </button>
          )}

          {images && (
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
              {images.map((_, dotIndex) => (
                <div
                  key={dotIndex}
                  className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                    imageIndex === dotIndex ? "bg-zinc-200" : "bg-zinc-700"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div
        data-testid="projectFooter"
        className={`flex w-full flex-grow flex-col gap-3 border-t border-zinc-800/80 px-5 py-4 ${
          // Rotating between cards shouldn't bounce the page, so a tall card's footer
          // holds the height of the longest description in the deck.
          isTallCard ? "min-h-[9.5rem]" : ""
        }`}
      >
        <div className="text-left text-sm text-zinc-400">
          {project.description}
        </div>
        {project.techStack && (
          <div className="mt-auto flex flex-wrap gap-1.5">
            {project.techStack.map((tech, techIndex) => (
              <span
                key={techIndex}
                className="rounded-md border border-zinc-800 bg-zinc-900 px-2 py-0.5 font-mono text-xs text-zinc-400"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
