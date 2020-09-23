import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import TopBar from "./topbar.js";

it("renders the TopBar component without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<TopBar />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it("matches the previous snapshot of the TopBar Component", () => {
    const TopBarComponentSnapshot = renderer.create(<TopBar />).toJSON();
    expect(TopBarComponentSnapshot).toMatchSnapshot();
});
