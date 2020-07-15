import React, { useEffect, useState } from "react";
import axios from "./axios";
import Sidebar from "./sidebar";
import Card from "./card";

export default function Character(props) {
    useEffect(() => {
        axios.get(`/character${props.charactersId}`);
    }, []);

    return (
        <div>
            <Sidebar />
            <Card />
        </div>
    );
}
