import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Entrypage from "./entrypage";
import CreateCharacter from "./createcharacter";

export default function App() {
    return (
        <BrowserRouter>
            <Route exact path="/" component={Entrypage} />
            <Route exact path="/createcharacter" component={CreateCharacter} />
        </BrowserRouter>
    );
}
