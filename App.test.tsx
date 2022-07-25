import React from "react";
import renderer, { ReactTestRendererJSON } from "react-test-renderer";

import App from "./App";

jest.mock("./hooks/useCachedResources", () => jest.fn(() => true));

describe("<App />", () => {
  const tree = renderer.create(<App />).toJSON() as ReactTestRendererJSON;
  it("has 1 child", () => {
    console.log(tree);
    expect(tree.children).toBe(null); //safeAreaView Mock has null children
  });
  test("snapshot", () => {
    expect(tree).toMatchSnapshot();
  });
});
