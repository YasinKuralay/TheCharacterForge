import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import EntryPage from "./entrypage.js";

it("renders the EntryPage component without crashing", () => {
    const div = document.createElement("div");
    // The BrowserRouter is for eliminating the unnecessary error "Don't use Link outside Router" from Jest, which is caused by using an old version of the Router, and will be fixed
    ReactDOM.render(
        <BrowserRouter>
            <EntryPage />
        </BrowserRouter>,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});

it("matches the previous snapshot of the EntryPage Component", () => {
    const EntryPageComponentSnapshot = renderer
        .create(
            <BrowserRouter>
                <EntryPage />
            </BrowserRouter>
        )
        .toJSON();
    expect(EntryPageComponentSnapshot).toMatchSnapshot();
});
