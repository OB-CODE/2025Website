import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PixelWalker from "./PixelWalker";
import {
  DOG_HEIGHT,
  DOG_SIT_FRAMES,
  DOG_WALK_FRAMES,
  DOG_WIDTH,
  MAN_HEIGHT,
  MAN_TYPE_FRAMES,
  MAN_WALK_FRAMES,
  MAN_WIDTH,
  PALETTE,
  frameToRuns,
} from "./pixelSprites";

const spriteSets = [
  ["man walk", MAN_WALK_FRAMES, MAN_WIDTH, MAN_HEIGHT],
  ["man type", MAN_TYPE_FRAMES, MAN_WIDTH, MAN_HEIGHT],
  ["dog walk", DOG_WALK_FRAMES, DOG_WIDTH, DOG_HEIGHT],
  ["dog sit", DOG_SIT_FRAMES, DOG_WIDTH, DOG_HEIGHT],
] as const;

describe("pixel sprite data", () => {
  test.each(spriteSets)(
    "%s frames are all the declared size",
    (_name, frames, width, height) => {
      frames.forEach((frame) => {
        expect(frame).toHaveLength(height);
        frame.forEach((row) => expect(row).toHaveLength(width));
      });
    }
  );

  test.each(spriteSets)("%s frames only use known colours", (_name, frames) => {
    frames.forEach((frame) => {
      frame.forEach((row) => {
        [...row].forEach((char) => {
          if (char !== ".") expect(PALETTE[char]).toBeDefined();
        });
      });
    });
  });

  test("frameToRuns merges neighbouring pixels of the same colour", () => {
    const runs = frameToRuns(["..ttt.", "s..ss."]);

    expect(runs).toEqual([
      { x: 2, y: 0, width: 3, fill: PALETTE.t },
      { x: 0, y: 1, width: 1, fill: PALETTE.s },
      { x: 3, y: 1, width: 2, fill: PALETTE.s },
    ]);
  });
});

describe("Renders PixelWalker component", () => {
  test("draws the man and the dog, hidden from assistive tech", () => {
    render(<PixelWalker />);

    const track = screen.getByTestId("pixelWalker");
    expect(track).toHaveAttribute("aria-hidden", "true");
    expect(track.querySelectorAll("svg")).toHaveLength(2);
  });
});
