import React from "react";
import ReactDOM from "react-dom";
import Login from "./login.js";

it("renders the Login component without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Login />, div);
  ReactDOM.unmountComponentAtNode(div);
});
