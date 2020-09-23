import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import Character from "./character.js";

it("renders the character component without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Character />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it("matches the previous snapshot of the Character Component", () => {
    const CharacterComponentSnapshot = renderer.create(<Character />).toJSON();
    expect(CharacterComponentSnapshot).toMatchSnapshot();
});
