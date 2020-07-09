import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";
// import App from "./app.js";

let elem;
// const userIsNotLoggedIn = location.pathname === "/welcome";

// if (userIsNotLoggedIn) {
elem = <Welcome />;
// } /* else {
// elem = <App />;
// } */

//reactDOM.render can only be called once per project.
ReactDOM.render(elem, document.querySelector("main"));
