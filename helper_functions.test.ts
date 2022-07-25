import { convertObjToArray } from "./helper_functions";

describe("helper functions", () => {
  it("convertObjToArray", () => {
    expect(convertObjToArray({ cod1: { name: "value" }, cod2: { name: "value2" } })).toEqual([
      { name: "value" },
      { name: "value2" },
    ]);
  });
});
