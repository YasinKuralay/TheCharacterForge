import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Entrypage from "./entrypage";
import CreateCharacter from "./createcharacter";
import TopBar from "./topbar";

export default function App() {
    return (
        <BrowserRouter>
            <Route
                exact
                path="*"
                render={(props) => <TopBar history={props.history} />}
            />
            <Route exact path="/" component={Entrypage} />
            <Route exact path="/createcharacter" component={CreateCharacter} />
        </BrowserRouter>
    );
}
