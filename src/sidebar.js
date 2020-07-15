import React, { useEffect } from "react";
import axios from "axios";

export default function Sidebar(props) {
    // const preventThis = (e) => {
    //     e.preventDefault();
    // };

    useEffect(() => {}, []);

    return (
        <div id="sidebar">
            <div className="sidebarCard sidebarPersonName">
                <i className="fas fa-portrait"></i>{" "}
                <input defaultValue={props.char.name}></input>
            </div>
            <div className="sidebarCard">
                <i className="fas fa-file-alt"></i> Example
            </div>
            {props.cards &&
                props.cards.map((elem) => {
                    return (
                        <div
                            key={elem.id}
                            className="sidebarCard"
                            //the argument has to be empty, because if the argument is filled with sth, then the argument becomes the event object
                            onClick={() => props.renderCard(elem.id)}
                        >
                            <i className="fas fa-file-alt"></i> {elem.heading}
                            <section className="sidebarBetweenBorder"></section>
                        </div>
                    );
                })}
            <div id="addBar">
                <i className="fas fa-folder-plus"></i>
                <i className="fas fa-plus-square"></i>
            </div>
        </div>
    );
}
