import { render, screen } from "@testing-library/react";
import Moonlander from "./Moonlander";
import "@testing-library/jest-dom";

describe("Moonlander Component", () => {
  test("renders the Moonlander component", () => {
    render(<Moonlander />);

    // Check if the iframe is rendered
    const iframe = screen.getByTitle("Moonlander Configuration");
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute(
      "src",
      "https://configure.zsa.io/embed/moonlander/layouts/gdxrX/latest/0?theme=dark"
    );
  });
});
