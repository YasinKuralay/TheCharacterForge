import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import Login from "./login.js";

it("renders the Login component without crashing", () => {
    const div = document.createElement("div");
    // The BrowserRouter is for eliminating the unnecessary error "Don't use Link outside Router" from Jest, which is caused by using an old version of the Router, and will be fixed
    ReactDOM.render(
        <BrowserRouter>
            <Login />
        </BrowserRouter>,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});

it("matches the previous snapshot of the Login Component", () => {
    const LoginComponentSnapshot = renderer
        .create(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        )
        .toJSON();
    expect(LoginComponentSnapshot).toMatchSnapshot();
});
