import React from "react";
import ReactDOM from "react-dom";
import CreateCharacter from "./createcharacter.js";

it("renders the CreateCharacter component without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<CreateCharacter />, div);
  ReactDOM.unmountComponentAtNode(div);
});
