import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ConfettiWrapper from "./ConfettiWrapper";

describe("ConfettiWrapper Component", () => {
  const mockSetToggleForRightBorder = jest.fn();
  const mockSetshowConfetti = jest.fn();
  const mockSetDimensions = jest.fn();

  const mockProps = {
    setToggleForRightBorder: mockSetToggleForRightBorder,
    setshowConfetti: mockSetshowConfetti,
    setDimensions: mockSetDimensions,
    dimensions: { width: 800, height: 600 },
    showConfetti: false,
    countdown: 5,
  };

  test("renders the ConfettiWrapper component", () => {
    render(<ConfettiWrapper {...mockProps} />);

    // Check if the button is rendered
    const button = screen.getByRole("button", { name: /start party/i });
    expect(button).toBeInTheDocument();

    // Check if the rocket is rendered
    const rocket = screen.getByTestId("rocket");
    expect(rocket).toBeInTheDocument();
  });
});
