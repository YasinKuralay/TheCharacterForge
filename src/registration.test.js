import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Registration from "./registration.js";

it("renders the Registration component without crashing", () => {
    const div = document.createElement("div");
    // The BrowserRouter is for eliminating the unnecessary error "Don't use Link outside Router" from Jest, which is caused by using an old version of the Router, and will be fixed
    ReactDOM.render(
        <BrowserRouter>
            <Registration />
        </BrowserRouter>,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});
