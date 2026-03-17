import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ModalCard from "./ModalCard";

describe("ModalCard Component", () => {
  const mockToggleContactPopup = jest.fn();

  beforeEach(() => {
    mockToggleContactPopup.mockClear();
  });

  it("renders the modal header", () => {
    render(<ModalCard toggleContactPopup={mockToggleContactPopup} />);
    expect(screen.getByText("Contact Me")).toBeInTheDocument();
  });

  it("renders contact details", () => {
    render(<ModalCard toggleContactPopup={mockToggleContactPopup} />);
    expect(screen.getByText("Sydney, Australia")).toBeInTheDocument();
    expect(screen.getByText("mitchell.s.obrien@gmail.com")).toBeInTheDocument();
  });

  it("calls toggleContactPopup when the background is clicked", () => {
    render(<ModalCard toggleContactPopup={mockToggleContactPopup} />);
    const modalBackground = screen.getByTestId("modalBackground");
    fireEvent.click(modalBackground);
    expect(mockToggleContactPopup).toHaveBeenCalledTimes(1);
  });

  it("calls toggleContactPopup when the close button is clicked", () => {
    render(<ModalCard toggleContactPopup={mockToggleContactPopup} />);
    fireEvent.click(screen.getByText("Close"));
    expect(mockToggleContactPopup).toHaveBeenCalledTimes(1);
  });
});
