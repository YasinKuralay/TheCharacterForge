import React from "react";
import ReactDOM from "react-dom";
import BrowseCharacters from "./browsecharacters.js";

it("renders the BrowseCharacters component without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<BrowseCharacters />, div);
  ReactDOM.unmountComponentAtNode(div);
});
