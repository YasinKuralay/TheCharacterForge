import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import Card from "./card.js";

it("renders the Card component without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Card />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it("matches the previous snapshot of the Card Component", () => {
    const CardComponentSnapshot = renderer.create(<Card />).toJSON();
    expect(CardComponentSnapshot).toMatchSnapshot();
});
