import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import CardsScroll from "./CardsScroll";
import { objsToMap } from "./cardsToMap";

// Mock ResizeObserver
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizeObserver;

describe("CardsScroll Component", () => {
  test("renders the correct number of cards", () => {
    console.log("objsToMap:", objsToMap); // Log the array

    render(<CardsScroll direction="left" />);
    const cards = screen.getAllByTestId("cardleft"); // Use getAllByTestId
    expect(cards).toHaveLength(objsToMap.length * 2);
  });

  // Test for the marquee element RENDERING LEFT

  objsToMap.forEach((obj) => {
    test(`renders the title of ${obj.title}`, () => {
      render(<CardsScroll direction="left" />);
      const cardTitleHeading = screen.getAllByText(obj.title); // look for test id
      cardTitleHeading.forEach((heading) => {
        expect(heading).toBeInTheDocument();
      });
    });
  });

  objsToMap.forEach((obj) => {
    test(`renders the title of ${obj.description}`, () => {
      render(<CardsScroll direction="left" />);
      const cardDescription = screen.getAllByText(obj.description); // look for test id
      cardDescription.forEach((description) => {
        expect(description).toBeInTheDocument();
      });
    });
  });
  // Test for the marquee element RENDERING RIGHT

  objsToMap.forEach((obj) => {
    test(`renders the title of ${obj.title}`, () => {
      render(<CardsScroll direction="right" />);
      const cardTitleHeading = screen.getAllByText(obj.title); // look for test id
      cardTitleHeading.forEach((heading) => {
        expect(heading).toBeInTheDocument();
      });
    });
  });

  objsToMap.forEach((obj) => {
    test(`renders the title of ${obj.description}`, () => {
      render(<CardsScroll direction="right" />);
      const cardDescription = screen.getAllByText(obj.description); // look for test id
      cardDescription.forEach((description) => {
        expect(description).toBeInTheDocument();
      });
    });
  });
});
