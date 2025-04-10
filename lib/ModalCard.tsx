import React from "react";
import { ModalContent } from "../src/components/footer/FooterIndex";
import {
  BuildingOffice2Icon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import EmailFrom from "./EmailFrom";

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
        className="h-fit w-fit flex-col inset-0 z-30 bg-black text-white border-2 border-white flex items-center justify-center rounded shadow-lg p-4"
      >
        <div className="flex items-between justify-center mb-4 h-10 w-full">
          <div className="flex w-full items-center">
            <h2 className="text-xl  relative flex justify-center w-full font-bold">
              <div className="relative left-[20px]">{modalContent.header}</div>
            </h2>
          </div>
          <button
            onClick={toggleContactPopup}
            className=" w-20  px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Close
          </button>
        </div>

        <div className="flex justify-between gap-x-4 mb-4 w-full text-gray-400 ">
          <div className="flex flex-col w-[50%]" id="details">
            {modalContent.persoanlInformation.map((line, index) => (
              <div
                key={index}
                className="flex mb-2 py-2 items-center w-full gap-2"
              >
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
            <EmailFrom />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalCard;
