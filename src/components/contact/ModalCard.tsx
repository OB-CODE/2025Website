import {
  BuildingOffice2Icon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { JSX } from "react";
import Button from "../ui/Button";
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
            className="h-5 w-5 text-zinc-500"
          />
        ),
      },
      {
        title: "Email",
        message: "mitchell.s.obrien@gmail.com",
        symbol: (
          <EnvelopeIcon aria-hidden="true" className="h-5 w-5 text-zinc-500" />
        ),
      },
      {
        title: "Phone",
        message: "Email me and ask :)",
        symbol: (
          <PhoneIcon aria-hidden="true" className="h-5 w-5 text-zinc-500" />
        ),
      },
    ],
  };

  return (
    <div className="fixed inset-0 z-[10001] flex h-full w-full items-center justify-center p-4">
      <div
        data-testid="modalBackground"
        onClick={toggleContactPopup}
        className="fixed inset-0 z-20 cursor-pointer bg-zinc-950/80 backdrop-blur-sm"
      ></div>

      <div
        id="messageContainer"
        className="relative z-30 flex max-h-[90vh] w-full max-w-3xl flex-col overflow-y-auto rounded-xl border border-zinc-800 bg-zinc-950 p-6 text-zinc-50 shadow-2xl"
      >
        <div className="mb-6 flex w-full items-center justify-between gap-4">
          <h2 className="text-xl font-semibold tracking-tight">
            {modalContent.header}
          </h2>
          <Button variant="outline" size="sm" onClick={toggleContactPopup}>
            Close
          </Button>
        </div>

        <div className="flex w-full flex-col gap-6 text-zinc-300 md:flex-row md:gap-8">
          <div
            className="flex w-full flex-col gap-1 border-b border-zinc-800 pb-6 md:w-1/2 md:border-b-0 md:border-r md:pb-0 md:pr-8"
            id="details"
          >
            {modalContent.personalInformation.map((line, index) => (
              <div key={index} className="flex w-full items-center gap-3 py-2">
                {line.symbol}
                <div className="flex flex-col items-start text-left">
                  <span className="text-xs uppercase tracking-wider text-zinc-500">
                    {line.title}
                  </span>
                  <span className="break-words text-sm">{line.message}</span>
                </div>
              </div>
            ))}
            <img
              className="mt-4 max-h-56 w-auto rounded-lg border border-zinc-800 object-cover md:max-h-72"
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
