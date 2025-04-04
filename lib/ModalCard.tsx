import { ModalContent } from "../src/components/footer/FooterIndex";

const ModalCard = ({
  toggleContactPopup,
  modalContent,
}: {
  toggleContactPopup: () => void;
  modalContent: ModalContent;
}) => {
  return (
    <div>
      <div
        data-testid="modalBackground"
        onClick={toggleContactPopup}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }} // Explicit semi-transparent black background
        className="fixed inset-0 z-20 bg-black flex items-center justify-center"
      >
        <div
          id="messageContainer"
          className="bg-white text-black p-6 rounded shadow-lg"
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
    </div>
  );
};

export default ModalCard;
