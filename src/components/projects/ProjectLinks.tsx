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
    className={`flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/10 text-gray-300 transition-all duration-200 ${
      href
        ? "hover:border-nebula hover:bg-nebula/30 hover:text-white hover:shadow-[0_0_12px_rgba(76,97,255,0.6)]"
        : "cursor-help opacity-50"
    }`}
  >
    {children}
  </a>
);

const TextLink = ({
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
    data-tooltip-id={href ? "" : "my-tooltip"}
    data-tooltip-content={missingMessages[kind]}
    data-tooltip-place="top"
    className={
      href ? "hover:text-nebula transition-colors" : "cursor-help opacity-60"
    }
  >
    {children}
  </a>
);

/** Website + GitHub links for a project card, with tooltips when a link is unavailable. */
const ProjectLinks = ({ website, github }: ProjectLinksProps) => {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-400">
        <TextLink kind="website" href={website}>
          website
        </TextLink>
        {" / "}
        <TextLink kind="github" href={github}>
          Github
        </TextLink>
      </span>
      <LinkBadge kind="website" href={website}>
        <FaGlobe size={16} />
      </LinkBadge>
      <LinkBadge kind="github" href={github}>
        <FaGithub size={16} />
      </LinkBadge>
    </div>
  );
};

export default ProjectLinks;
