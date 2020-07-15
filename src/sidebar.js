import React, { useEffect } from "react";
import axios from "axios";

export default function Sidebar() {
    // const preventThis = (e) => {
    //     e.preventDefault();
    // };

    useEffect(() => {
        axios.get("/getCharacterName");
    }, []);

    return (
        <div id="sidebar">
            <div className="sidebarCard sidebarPersonName">
                <i className="fas fa-portrait"></i>{" "}
                <input defaultValue="Alicia"></input>
            </div>
            <div className="sidebarCard">
                <i className="fas fa-file-alt"></i> Example
            </div>
            <div id="addBar">
                <i className="fas fa-folder-plus"></i>
                <i className="fas fa-plus-square"></i>
            </div>
        </div>
    );
}
