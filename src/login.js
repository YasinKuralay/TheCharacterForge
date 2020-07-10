import React, { Component } from "react";
import axios from "./axios"; //the dot-slash is easily missed after configuring axios.js!!
import { Link } from "react-router-dom";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    submit() {
        axios
            .post("/login", this.state)
            .then(({ data }) => {
                console.log("data from server: ", data);
                if (data.success) {
                    //log the user into our app
                    location.replace("/");
                } else {
                    this.setState({
                        error: true,
                    });
                    this.state.value;
                }
            })
            .catch((err) => console.log(err));
    }

    render() {
        return (
            <div id="register">
                <h2>Login If You Have an Account</h2>
                {this.state.error && (
                    <div id="errormsg">
                        Oops, sth went wrong... Please try again!
                    </div>
                )}
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
                <button onClick={() => this.submit()}>Login</button>

                <p id="forgotPassword">
                    <Link to="/ResetPassword">Forgot your password?</Link>
                </p>

                <p id="ifYou">
                    If you don&apos;t have an account, please{" "}
                    <Link to="/">register</Link> first.
                </p>
            </div>
        );
    }
}

export default Login;
