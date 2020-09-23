import React from "react";
import ReactDOM from "react-dom";
import Sidebar, { keyCheck, inputKeyCheck } from "./sidebar.js";

let charInfo = { name: "Some random placeholder name" };

it("renders the Sidebar component without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Sidebar char={charInfo} />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it("returns nothing if the key pressed is not Enter", () => {
    expect(keyCheck("a")).toBeUndefined();
    expect(keyCheck("A")).toBeUndefined();
    expect(keyCheck("k")).toBeUndefined();
    expect(keyCheck("l")).toBeUndefined();
});

it("returns nothing if the key pressed is not Enter", () => {
    expect(inputKeyCheck("T")).toBeUndefined();
    expect(inputKeyCheck("d")).toBeUndefined();
    expect(inputKeyCheck("x")).toBeUndefined();
    expect(inputKeyCheck("i")).toBeUndefined();
});
