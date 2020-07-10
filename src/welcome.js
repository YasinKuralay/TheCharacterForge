import React from "react";

import { HashRouter, Route } from "react-router-dom";
import Registration from "./registration";
import Login from "./login";
import ResetPassword from "./resetpassword";

export default function Welcome() {
    return (
        <div id="entrancePage">
            <img src="/logo.png" id="welcomeLogo" />
            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route exact path="/login" component={Login} />
                    <Route
                        exact
                        path="/resetpassword"
                        component={ResetPassword}
                    />
                </div>
            </HashRouter>
        </div>
    );
}
