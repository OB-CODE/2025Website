import { useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import ModalCard from "../../../lib/ModalCard";
import CyberButton from "../ui/CyberButton";

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
    <footer className="w-[85%] md:w-[70%] text-white py-6 h-full border-t border-white/10">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-6 h-full">
        <div id="socials" className="flex flex-row sm:flex-col justify-center gap-4 sm:gap-2">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-300 hover:text-aurora transition-colors"
            >
              <span className="text-nebula">{social.icon}</span>
              {social.label}
            </a>
          ))}
        </div>
        <div className="flex flex-col items-center sm:items-end gap-3">
          <CyberButton onClick={toggleContactPopup}>Contact Me</CyberButton>
          <div className="text-sm text-gray-500">
            &copy; {currentYear} - Mitch O'Brien
          </div>
        </div>
      </div>

      {showContact && <ModalCard toggleContactPopup={toggleContactPopup} />}
    </footer>
  );
};

export default FooterIndex;
