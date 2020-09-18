import React from "react";
import ReactDOM from "react-dom";
import ResetPassword from "./resetpassword.js";

it("renders the ResetPassword component without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ResetPassword />, div);
  ReactDOM.unmountComponentAtNode(div);
});
