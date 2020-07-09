import React from "react";

import { BrowserRouter, Route } from "react-router-dom";
import Registration from "./registration";
// import Login from "./login";
// import ResetPassword from "./resetpassword";

export default function Welcome() {
    return (
        <div id="entrancePage">
            <img src="/logo.png" id="welcomeLogo" />
            <BrowserRouter>
                <div>
                    <Route path="/" component={Registration} />
                    {/* <Route exact path="/login" component={Login} />
                    <Route
                        exact
                        path="/resetpassword"
                        component={ResetPassword}
                    /> */}
                </div>
            </BrowserRouter>
            {/* <Registration /> */}
        </div>
    );
}
