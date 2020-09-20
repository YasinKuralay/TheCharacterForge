import React from "react";
import ReactDOM from "react-dom";
import BrowseCharacters, { randomAvatar } from "./browsecharacters.js";

it("renders the BrowseCharacters component without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<BrowseCharacters />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("returns src in the correct format /avatar{number}.png", () => {
  expect(randomAvatar()).toMatch(/\/avatar\d+\.png/);
});
