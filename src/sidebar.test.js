import React from "react";
import ReactDOM from "react-dom";
import Sidebar from "./sidebar.js";

let charInfo = { name: "Some random placeholder name" };

it("renders the Sidebar component without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Sidebar char={charInfo} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
