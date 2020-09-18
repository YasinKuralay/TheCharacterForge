import React from "react";
import ReactDOM from "react-dom";
import Card from "./card.js";

it("renders the Card component without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Card />, div);
  ReactDOM.unmountComponentAtNode(div);
});
