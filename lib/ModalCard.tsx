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
        {modalContent.body.map((line, index) => (
          <p key={index} className="mb-2">
            {line}
          </p>
        ))}
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
