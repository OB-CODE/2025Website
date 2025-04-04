import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PersonalHeading from "./PersonalHeading";
import { personalDetails } from "./personal-info";

describe("Renders PersonalHeading component", () => {
  test("should show first and last name.", () => {
    render(<PersonalHeading />);

    // Check for the name heading
    const nameHeading = screen.getByText(
      `${personalDetails.firstName} ${personalDetails.lastName}`.trim()
    );
    expect(nameHeading).toBeInTheDocument();

    // Check for the job title heading
    const jobTitleHeading = screen.getByTestId("jobTitle"); // look for test id
    expect(jobTitleHeading).toBeInTheDocument();
  });
});
