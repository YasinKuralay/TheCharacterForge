import React from "react";
import ReactDOM from "react-dom";
import TopBar from "./topbar.js";

it("renders the TopBar component without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<TopBar />, div);
  ReactDOM.unmountComponentAtNode(div);
});
