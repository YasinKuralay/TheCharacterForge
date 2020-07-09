import React, { useState, useEffect } from "react";
import axios from "./axios"; //the dot-slash is easily missed after configuring axios.js!!
// import { Link } from "react-router-dom";

export default function Registration() {
    // const [firstname, setFirstname] = useState({});
    // const [lastname, setLastname] = useState({});
    // const [email, setEmail] = useState({});
    // const [password, setPassword] = useState({});

    // const

    // const handleChange = (e) => {
    //     console.log("e.target.value: ", e.target.value);
    //     console.log("e.target.name: ", e.target.name);

    //     this.setState(
    //         {
    //             [e.target.name]: e.target.value,
    //         }

    //         // () => console.log("this.state: ", this.state)
    //     );
    // };

    return (
        <div id="register">
            <h2>Register</h2>
            {/* {this.state.error && (
                    <div id="errormsg">
                        Oops, sth went wrong... Please try again!
                    </div>
                )} */}
            <input
                name="firstname"
                placeholder="firstname"
                // onChange={(e) => this.handleChange(e)}
                autoComplete="off"
            />
            <input
                name="lastname"
                placeholder="lastname"
                // onChange={(e) => this.handleChange(e)}
                autoComplete="off"
            />
            <input
                name="email"
                placeholder="email"
                type="email"
                // onChange={(e) => this.handleChange(e)}
                autoComplete="off"
            />
            <input
                name="password"
                placeholder="password"
                type="password"
                // onChange={(e) => this.handleChange(e)}
                autoComplete="off"
            />
            <button /* onClick={() => this.submit()} */>Register</button>

            <p id="ifYou">
                If you already have an account, please{" "}
                {/* <Link to="/login">log in</Link>. */}
            </p>
        </div>
    );
}
