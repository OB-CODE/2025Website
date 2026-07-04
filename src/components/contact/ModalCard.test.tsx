import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ModalCard from "./ModalCard";

describe("ModalCard Component", () => {
  const mockToggleContactPopup = jest.fn();

  beforeEach(() => {
    mockToggleContactPopup.mockClear();
  });

  it("renders the modal with contact details", () => {
    const { getByText } = render(
      <ModalCard toggleContactPopup={mockToggleContactPopup} />
    );

    expect(getByText("Contact Me")).toBeInTheDocument();
    expect(getByText("Sydney, Australia")).toBeInTheDocument();
    expect(getByText("mitchell.s.obrien@gmail.com")).toBeInTheDocument();
  });

  it("calls toggleContactPopup when the background is clicked", () => {
    const { container } = render(
      <ModalCard toggleContactPopup={mockToggleContactPopup} />
    );
    const modalBackground = container.querySelector(
      '[data-testid="modalBackground"]'
    ) as HTMLElement;

    modalBackground.click();
    expect(mockToggleContactPopup).toHaveBeenCalled();
  });

  it("calls toggleContactPopup when the close button is clicked", () => {
    const { getByText } = render(
      <ModalCard toggleContactPopup={mockToggleContactPopup} />
    );

    fireEvent.click(getByText("Close"));
    expect(mockToggleContactPopup).toHaveBeenCalled();
  });
});
