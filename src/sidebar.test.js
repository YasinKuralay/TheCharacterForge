import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import Sidebar, { keyCheck, inputKeyCheck } from "./sidebar.js";

//Mocking the char prop of Sidebar
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

it("matches the previous snapshot of the Sidebar Component", () => {
    const SidebarSnapshot = renderer
        .create(<Sidebar char={charInfo} />)
        .toJSON();
    expect(SidebarSnapshot).toMatchSnapshot();
});
