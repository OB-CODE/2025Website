import React from "react";
import { ModalContent } from "../src/components/footer/FooterIndex";
import {
  BuildingOffice2Icon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";

const ModalCard = ({
  toggleContactPopup,
  modalContent,
}: {
  toggleContactPopup: () => void;
  modalContent: ModalContent;
}) => {
  return (
    <div className="w-full h-full flex items-center justify-center fixed inset-0 z-10">
      <div
        data-testid="modalBackground"
        onClick={toggleContactPopup}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }} // Explicit semi-transparent black background
        className="fixed inset-0 z-20 bg-black flex items-center justify-center"
      ></div>

      <div
        id="messageContainer"
        className="h-fit w-fit flex-col inset-0 z-30 bg-white text-black flex items-center justify-center rounded shadow-lg p-4"
      >
        <h2 className="text-xl font-bold mb-4">{modalContent.header}</h2>

        <div className="flex gap-x-4 mb-4 w-full">
          <div className="flex flex-col  w-[45%]" id="details">
            {modalContent.persoanlInformation.map((line, index) => (
              <div key={index} className="flex mb-2 items-center w-full gap-2">
                <div className="flex items-center gap-2">
                  {line.symbol && ( // Ensure symbol is rendered correctly
                    <span className="ml-2">{line.symbol}</span> // Adjusted to render symbol correctly
                  )}
                </div>
                <div className="flex items-center gap-2 justify-between w-full">
                  <span className="text-gray-700 font-bold">{line.title}:</span>
                  {line.messgae}
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col w-[40%] px-8 text-left" id="blurb">
            Shoot me a message on any of the platforms below:
          </div>
        </div>

        <button
          onClick={toggleContactPopup}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ModalCard;
