import { render, screen } from "@testing-library/react";
import PersonalHeading from "./PersonalHeading";
import { personalDetails } from "./personal-info";
import "@testing-library/jest-dom";

describe("Renders PersonalHeading component", () => {
  test("should show first and last name.", () => {
    render(<PersonalHeading />);

    // Check for the name heading
    const nameHeading = screen.getByText(
      `${personalDetails.firstName} ${personalDetails.lastName}`.trim()
    );
    expect(nameHeading).toBeInTheDocument();

    // Check for the job title heading
    const jobTitleHeading = screen.getByText(personalDetails.jobTitle);
    expect(jobTitleHeading).toBeInTheDocument();
  });
});
