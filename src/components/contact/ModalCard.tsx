import {
  BuildingOffice2Icon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { JSX } from "react";
import CyberButton from "../ui/CyberButton";
import EmailFrom from "./EmailFrom";

interface ModalContent {
  header: string;
  personalInformation: {
    title: string;
    message: string;
    symbol: JSX.Element | string;
  }[];
}

const ModalCard = ({
  toggleContactPopup,
}: {
  toggleContactPopup: () => void;
}) => {
  const modalContent: ModalContent = {
    header: "Contact Me",
    personalInformation: [
      {
        title: "Address",
        message: "Sydney, Australia",
        symbol: (
          <BuildingOffice2Icon
            aria-hidden="true"
            className="h-6 w-6 text-nebula"
          />
        ),
      },
      {
        title: "Email",
        message: "mitchell.s.obrien@gmail.com",
        symbol: (
          <EnvelopeIcon aria-hidden="true" className="h-6 w-6 text-nebula" />
        ),
      },
      {
        title: "Phone",
        message: "Email me and ask :)",
        symbol: (
          <PhoneIcon aria-hidden="true" className="h-6 w-6 text-nebula" />
        ),
      },
    ],
  };

  return (
    <div className="w-full h-full flex items-center justify-center fixed inset-0 z-[10001] p-4">
      <div
        data-testid="modalBackground"
        onClick={toggleContactPopup}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }} // Explicit semi-transparent black background
        className="fixed inset-0 z-20 bg-black flex items-center justify-center cursor-pointer backdrop-blur-sm"
      ></div>

      <div
        id="messageContainer"
        className="relative z-30 flex max-h-[90vh] w-full max-w-3xl flex-col overflow-y-auto rounded-2xl border border-nebula/30 bg-space-900/95 p-4 md:p-6 text-white shadow-[0_0_40px_rgba(76,97,255,0.25)] backdrop-blur-xl"
      >
        <div className="mb-4 flex w-full items-center justify-between gap-4">
          <h2 className="font-display text-xl md:text-2xl font-bold tracking-wide bg-gradient-to-r from-white to-aurora bg-clip-text text-transparent">
            {modalContent.header}
          </h2>
          <CyberButton variant="danger" onClick={toggleContactPopup}>
            Close
          </CyberButton>
        </div>

        <div className="flex w-full flex-col gap-6 md:flex-row md:gap-8 text-gray-300">
          <div
            className="flex w-full flex-col items-center gap-2 border-b border-white/10 pb-6 md:w-1/2 md:border-b-0 md:border-r md:pb-0 md:pr-6"
            id="details"
          >
            {modalContent.personalInformation.map((line, index) => (
              <div
                key={index}
                className="flex w-full items-center gap-3 py-2"
              >
                {line.symbol}
                <div className="flex flex-col items-start text-left">
                  <span className="font-bold text-gray-400">
                    {line.title}:
                  </span>
                  <span className="break-words">{line.message}</span>
                </div>
              </div>
            ))}
            <img
              className="mt-3 max-h-56 w-auto rounded-xl border border-white/10 object-cover md:max-h-72"
              src="/Me.webp"
              alt="Photo of Mitchell with surfboard."
            />
          </div>
          <div className="flex w-full flex-col text-left md:w-1/2" id="blurb">
            <EmailFrom toggleContactPopup={toggleContactPopup} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalCard;
