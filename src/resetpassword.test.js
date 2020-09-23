import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import ResetPassword from "./resetpassword.js";

it("renders the ResetPassword component without crashing", () => {
    const div = document.createElement("div");
    // The BrowserRouter is for eliminating the unnecessary error "Don't use Link outside Router" from Jest, which is caused by using an old version of the Router, and will be fixed
    ReactDOM.render(
        <BrowserRouter>
            <ResetPassword />
        </BrowserRouter>,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});

it("matches the previous snapshot of the ResetPassword Component", () => {
    const ResetPasswordComponentSnapshot = renderer
        .create(
            <BrowserRouter>
                <ResetPassword />
            </BrowserRouter>
        )
        .toJSON();
    expect(ResetPasswordComponentSnapshot).toMatchSnapshot();
});
