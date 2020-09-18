import React from "react";
import ReactDOM from "react-dom";
import EntryPage from "./entrypage.js";

it("renders the EntryPage component without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<EntryPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});
