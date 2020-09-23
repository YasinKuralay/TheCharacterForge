import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import CreateCharacter from "./createcharacter.js";

it("renders the CreateCharacter component without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<CreateCharacter />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it("matches the previous snapshot of the CreateCharacter Component", () => {
    const CreateCharacterComponentSnapshot = renderer
        .create(<CreateCharacter />)
        .toJSON();
    expect(CreateCharacterComponentSnapshot).toMatchSnapshot();
});
