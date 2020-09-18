import React from "react";
import ReactDOM from "react-dom";
import Registration from "./registration.js";

it("renders the Registration component without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Registration />, div);
  ReactDOM.unmountComponentAtNode(div);
});
