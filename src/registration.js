// import React, { useState, useEffect } from "react";
// import axios from "./axios"; //the dot-slash is easily missed after configuring axios.js!!
// import { Link } from "react-router-dom";

// export default function Registration() {
//     const [firstname, setFirstname] = useState({});
//     const [lastname, setLastname] = useState({});
//     const [email, setEmail] = useState({});
//     // const [password, setPassword] = useState({});

//     const setFirstname2 = (e) => {
//         setFirstname({
//             [e.target.name]: e.target.value,
//         });
//     };

//     const setLastname2 = (e) => {
//         setLastname({
//             [e.target.name]: e.target.value,
//         });
//     };

//     const setLastname2 = (e) => {
//         setLastname({
//             [e.target.name]: e.target.value,
//         });
//     };

//     const setLastname2 = (e) => {
//         setLastname({
//             [e.target.name]: e.target.value,
//         });
//     };

import React, { Component } from "react";
import axios from "./axios"; //the dot-slash is easily missed after configuring axios.js!!
import { BrowserRouter, Link } from "react-router-dom";

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange(e) {
    this.setState(
      {
        [e.target.name]: e.target.value,
      },
      () => console.log("this.state: ", this.state),
    );
  }

  submit() {
    console.log("about to suuuuuubmiiiiiiiiiiiiiitttttttttt!!!!!!");
    axios
      .post("/register", this.state)
      .then(({ data }) => {
        console.log("data from server: ", data);
        if (data.success) {
          //log the user into our app
          location.replace("/");
        } else {
          this.setState({
            error: true,
          });
          // this.state.value;
        }
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div id="register">
        <h2>Register</h2>
        {this.state.error && (
          <div id="errormsg">
            Oops, sth went wrong... Please try again!
          </div>
        )}
        <input
          name="firstname"
          placeholder="firstname"
          onChange={(e) => this.handleChange(e)}
          autoComplete="off"
        />
        <input
          name="lastname"
          placeholder="lastname"
          onChange={(e) => this.handleChange(e)}
          autoComplete="off"
        />
        <input
          name="email"
          placeholder="email"
          type="email"
          onChange={(e) => this.handleChange(e)}
          autoComplete="off"
        />
        <input
          name="password"
          placeholder="password"
          type="password"
          onChange={(e) => this.handleChange(e)}
          autoComplete="off"
        />
        <button onClick={() => this.submit()}>Register</button>

        <p id="ifYou">
          If you already have an account, please{" "}
          <BrowserRouter>
            <Link id="textDecoration" to="/login">
              log in
            </Link>
          </BrowserRouter>
          .
        </p>
      </div>
    );
  }
}

export default Registration;
