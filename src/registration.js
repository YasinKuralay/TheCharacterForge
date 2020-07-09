import React, { useState, useEffect } from "react";
import axios from "./axios"; //the dot-slash is easily missed after configuring axios.js!!
import { Link } from "react-router-dom";

export default function Registration() {
    const handleChange = (e) => {
        console.log("e.target.value: ", e.target.value);
        console.log("e.target.name: ", e.target.name);
        this.setState(
            {
                [e.target.name]: e.target.value,
            }

            // () => console.log("this.state: ", this.state)
        );
    };
}
