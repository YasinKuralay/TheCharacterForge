import React, { Component } from "react";
import axios from "./axios"; //the dot-slash is easily missed after configuring axios.js!!
import { BrowserRouter, Link } from "react-router-dom";

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.setState({ step: 1 });
  }

  getCurrentDisplay() {
    const step = this.state.step;
    if (step == 1) {
      return (
        <div id="register">
          <h2>Please enter your email</h2>
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
            key="email"
          />

          <button onClick={() => this.sendEmail()}>Submit</button>

          <p id="ifYou">
            If you don&apos;t have an account, please{" "}
            {/* <BrowserRouter> */}
            <Link id="textDecoration" to="/">
              register
            </Link>
            {/* </BrowserRouter> */}
            {" "}
            first.
          </p>
        </div>
      );
    } else if (step == 2) {
      return (
        <div id="register">
          <h2>Please enter your code here</h2>
          {this.state.error && (
            <div id="errormsg">
              Oops, sth went wrong... Please try again!
            </div>
          )}
          <input
            name="code"
            placeholder="code"
            type="text"
            onChange={(e) => this.handleChange(e)}
            autoComplete="off"
            key="code"
          />
          <h2>Please enter your new password</h2>
          <input
            name="password"
            placeholder="password"
            type="password"
            onChange={(e) => this.handleChange(e)}
            autoComplete="off"
          />

          <button onClick={() => this.sendNewPassword()}>Send</button>

          <p id="ifYou">
            If you don&apos;t have an account, please{" "}
            {/* <BrowserRouter> */}
            <Link id="textDecoration" to="/">
              register
            </Link>
            {/* </BrowserRouter> */}
            {" "}
            first.
          </p>
        </div>
      );
    } else if (step == 3) {
      return (
        <div id="register">
          <h2>Reset Password</h2>
          <h3>Success!</h3>
          <p>
            You can now{" "}
            {/* <BrowserRouter> */}
            <Link id="textDecoration" to="/login">
              log in
            </Link>
            {/* </BrowserRouter> */}
            {" "}
            with your new password
          </p>
        </div>
      );
    }
  }

  sendEmail() {
    axios.post("/sendemail", this.state).then(({ data }) => {
      if (data.success) {
        console.log("successfull");
        this.setState({ step: 2 });
      } else {
        console.log("data.success: ", data.success);
        this.setState({
          error: true,
        });
        this.state.value;
      }
    });
  }

  sendNewPassword() {
    axios.post("/matchcode", this.state).then(({ data }) => {
      if (data.success) {
        console.log("successfull");
        this.setState({ step: 3 });
      } else {
        console.log("data.success: ", data.success);
        this.setState({
          error: true,
        });
        this.state.value;
      }
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    return <div>{this.getCurrentDisplay()}</div>;
  }
}

export default ResetPassword;
