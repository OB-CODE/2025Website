import { objsToMap } from "./cardsToMap";

describe("objsToMap contains all expected objects", () => {
  test("should include all defined detail objects", () => {
    // Define the expected objects
    const expectedObjects = [
      "surfDetailsObject",
      "frontEndDetailsObject",
      "keyboardDetailsObject",
      "leadershipDetailsObject",
      "studentDetailsObject",
      "climbingDetailsObject",
      "educationDetailsObject",
    ];

    // Check that all expected objects are in objsToMap
    expect(objsToMap.length).toBe(expectedObjects.length);
  });
});
