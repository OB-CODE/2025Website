import { useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import ModalCard from "../contact/ModalCard";
import Button from "../ui/Button";

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/OB-CODE",
    icon: <FaGithub size={16} />,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/mitchellobriense01",
    icon: <FaLinkedin size={16} />,
  },
];

const FooterIndex = () => {
  const [showContact, setShowContact] = useState(false);

  const toggleContactPopup = () => {
    setShowContact(!showContact);
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-800/80 bg-zinc-900/30">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-12 sm:flex-row sm:items-center sm:justify-between">
        <div id="socials" className="flex flex-row gap-6 sm:flex-col sm:gap-2">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-zinc-50"
            >
              {social.icon}
              {social.label}
            </a>
          ))}
        </div>
        <div className="flex flex-col items-start gap-3 sm:items-end">
          <Button onClick={toggleContactPopup}>Contact Me</Button>
          <div className="text-xs text-zinc-500">
            &copy; {currentYear} - Mitch O'Brien
          </div>
        </div>
      </div>

      {showContact && <ModalCard toggleContactPopup={toggleContactPopup} />}
    </footer>
  );
};

export default FooterIndex;
