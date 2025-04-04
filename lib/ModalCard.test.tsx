import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ModalCard from "./ModalCard";

describe("ModalCard Component", () => {
  const mockToggleContactPopup = jest.fn();
  const mockModalContent = {
    header: "Test Header",
    body: ["Line 1", "Line 2"],
  };

  it("renders the modal with content", () => {
    const { getByText } = render(
      <ModalCard
        toggleContactPopup={mockToggleContactPopup}
        modalContent={mockModalContent}
      />
    );

    expect(getByText("Test Header")).toBeInTheDocument();
    expect(getByText("Line 1")).toBeInTheDocument();
    expect(getByText("Line 2")).toBeInTheDocument();
  });

  it("calls toggleContactPopup when the background is clicked", () => {
    const { container } = render(
      <ModalCard
        toggleContactPopup={mockToggleContactPopup}
        modalContent={mockModalContent}
      />
    );
    const modalBackground = container.querySelector(
      '[data-testid="modalBackground"]'
    ) as HTMLElement;

    modalBackground.click();
    // fireEvent.click(container.firstChild as HTMLElement);
    expect(mockToggleContactPopup).toHaveBeenCalled();
  });

  it("calls toggleContactPopup when the close button is clicked", () => {
    const { getByText } = render(
      <ModalCard
        toggleContactPopup={mockToggleContactPopup}
        modalContent={mockModalContent}
      />
    );

    fireEvent.click(getByText("Close"));
    expect(mockToggleContactPopup).toHaveBeenCalled();
  });
});
