import type { ReactNode } from "react";
import { FaGlobe, FaGithub } from "react-icons/fa";

interface ProjectLinksProps {
  website?: string;
  github?: string;
}

const missingMessages = {
  website: "Currently not hosted.",
  github: "This one's private - Sorry!",
};

const LinkBadge = ({
  kind,
  href,
  children,
}: {
  kind: "website" | "github";
  href?: string;
  children: ReactNode;
}) => (
  <a
    href={href || undefined}
    target="_blank"
    rel="noreferrer"
    aria-label={`Project ${kind}`}
    data-tooltip-id={href ? "" : "my-tooltip"}
    data-tooltip-content={missingMessages[kind]}
    data-tooltip-place="top"
    className={`flex h-8 w-8 items-center justify-center rounded-md border border-zinc-800 text-zinc-400 transition-colors duration-200 ${
      href
        ? "hover:border-zinc-600 hover:bg-zinc-900 hover:text-zinc-50"
        : "cursor-help opacity-40"
    }`}
  >
    {children}
  </a>
);

/** Website + GitHub links for a project card, with tooltips when a link is unavailable. */
const ProjectLinks = ({ website, github }: ProjectLinksProps) => {
  return (
    <div className="flex items-center gap-2">
      <LinkBadge kind="website" href={website}>
        <FaGlobe size={14} />
      </LinkBadge>
      <LinkBadge kind="github" href={github}>
        <FaGithub size={14} />
      </LinkBadge>
    </div>
  );
};

export default ProjectLinks;
