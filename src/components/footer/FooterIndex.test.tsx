import { render, screen, fireEvent } from "@testing-library/react";
import FooterIndex from "./FooterIndex";
import "@testing-library/jest-dom";

describe("FooterIndex Component", () => {
  test("renders social links", () => {
    render(<FooterIndex />);

    // Check if GitHub link is rendered
    const githubLink = screen.getByText("GitHub");
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute("href", "https://github.com/OB-CODE");

    // Check if LinkedIn link is rendered
    const linkedInLink = screen.getByText("LinkedIn");
    expect(linkedInLink).toBeInTheDocument();
    expect(linkedInLink).toHaveAttribute(
      "href",
      "https://linkedin.com/in/mitchellobriense01"
    );
  });

  test("renders the 'Contact Me' button and toggles ModalCard", () => {
    render(<FooterIndex />);

    // Check if the "Contact Me" button is rendered
    const contactButton = screen.getByText("Contact Me");
    expect(contactButton).toBeInTheDocument();

    // Click the "Contact Me" button
    fireEvent.click(contactButton);

    // Check if the ModalCard is rendered
    const modal = screen.getByTestId("modalBackground"); // Ensure ModalCard has a test ID
    expect(modal).toBeInTheDocument();

    // Click the "Contact Me" button again to close the modal
    fireEvent.click(contactButton);
    expect(modal).not.toBeInTheDocument();
  });

  test("renders footer text", () => {
    render(<FooterIndex />);

    // Check if the footer text is rendered
    const footerText = screen.getByText("2025 Mitch O'Brien");
    expect(footerText).toBeInTheDocument();
  });
});
