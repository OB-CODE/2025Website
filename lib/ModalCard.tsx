import {
  BuildingOffice2Icon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { JSX } from "react";
import EmailFrom from "./EmailFrom";

interface ModalContent {
  header: string;
  persoanlInformation: {
    title: string; // Changed from 'title' to 'title'
    messgae: string; // Changed from 'messgae' to 'message'
    symbol: JSX.Element | string; // Changed from 'symbol' to 'symbol'
  }[];
}

const ModalCard = ({
  toggleContactPopup,
}: {
  toggleContactPopup: () => void;
}) => {
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
          <EnvelopeIcon aria-hidden="true" className="h-7 w-6 text-gray-400" />
        ),
      },
      {
        title: "Phone",
        messgae: "Email me and ask :)",
        symbol: (
          <PhoneIcon aria-hidden="true" className="h-7 w-6 text-gray-400" />
        ),
      },
    ],
    // body: ["Email: mitchell.s.obrien@gmail.com", "Phone: See Resume"],
  };

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

        <div className="flex justify-between gap-x-4 mb-4 w-full h-full  text-gray-400 ">
          <div
            className="flex flex-col h-full border-r border-gray-800 pr-5 py-2 items-center w-[50%]"
            id="details"
          >
            {/* <div className="w-full text-white text-xl">My details</div> */}

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
            <img
              className="rounded-xl"
              src="/Me.png"
              alt="Photo of Mitchell with surfboard."
            />
          </div>
          <div className="flex flex-col w-[50%] px-8 text-left" id="blurb">
            <EmailFrom toggleContactPopup={toggleContactPopup} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalCard;
