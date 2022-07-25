import React from "react";
import renderer, { ReactTestRendererJSON } from "react-test-renderer";

import App from "./App";

describe("<App />", () => {
  it("has 1 child", () => {
    console.log("inizio test");
    const tree = renderer.create(<App />).toJSON() as ReactTestRendererJSON;
    console.log(tree);
    expect(tree.children?.length).toBe(1);
  });
});
