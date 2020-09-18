import React from "react";
import ReactDOM from "react-dom";
import Sidebar from "./sidebar.js";

it("renders the Sidebar component without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Sidebar />, div);
  ReactDOM.unmountComponentAtNode(div);
});
