import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import App from "./app.js";

it("renders the App component without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it("matches the previous snapshot", () => {
    const AppComponentSnapshot = renderer.create(<App />).toJSON();
    expect(AppComponentSnapshot).toMatchSnapshot();
});
