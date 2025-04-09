import { JSX, JSXElementConstructor, ReactNode, useState } from "react";
import ModalCard from "../../../lib/ModalCard";
import { BuildingOffice2Icon } from "@heroicons/react/24/outline";
export interface ModalContent {
  header: string;
  persoanlInformation: {
    title: string; // Changed from 'title' to 'title'
    messgae: string; // Changed from 'messgae' to 'message'
    symbol: JSX.Element | string; // Changed from 'symbol' to 'symbol'
  }[];
}

const FooterIndex = () => {
  const [showContact, setShowContact] = useState(false);

  const toggleContactPopup = () => {
    setShowContact(!showContact);
  };

  const modalContent: ModalContent = {
    header: "Contact Me",
    persoanlInformation: [
      {
        title: "Address",
        messgae: "Sydney, Australia",
        symbol: (
          <BuildingOffice2Icon
            aria-hidden="true"
            className="h-7 w-6 text-gray-400"
          />
        ),
      },
      {
        title: "Email",
        messgae: "mitchell.s.obrien@gmail.com",
        symbol: (
          <BuildingOffice2Icon
            aria-hidden="true"
            className="h-7 w-6 text-gray-400"
          />
        ),
      },
      {
        title: "Phone",
        messgae: "Email me and ask :)",
        symbol: (
          <BuildingOffice2Icon
            aria-hidden="true"
            className="h-7 w-6 text-gray-400"
          />
        ),
      },
    ],
    // body: ["Email: mitchell.s.obrien@gmail.com", "Phone: See Resume"],
  };

  return (
    <footer className="w-[70%] text-white py-1 h-full">
      <div className="container flex justify-between items-center h-full">
        <div id="socials" className="flex flex-col justify-center gap-2 h-full">
          <a
            href="https://github.com/OB-CODE"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/mitchellobriense01"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            LinkedIn
          </a>
        </div>
        <div className="flex flex-col gap-4">
          <button
            onClick={toggleContactPopup}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Contact Me
          </button>
          <div className="flex h-full items-end justify-end text-sm  text-gray-700 border-gray-700">
            2025 Mitch O'Brien
          </div>
        </div>
      </div>

      {showContact && (
        <ModalCard
          toggleContactPopup={toggleContactPopup}
          modalContent={modalContent}
        />
      )}
    </footer>
  );
};

export default FooterIndex;
