import React, { useEffect } from "react";
import axios from "./axios";

export default function Sidebar(props) {
    // const preventThis = (e) => {
    //     e.preventDefault();
    // };

    // useEffect(() => {}, []);

    const addCard = () => {
        axios.post(`/addCardTo${props.char.id}`).then(() => {
            props.refreshSidebar();
        });
    };

    const keyCheck = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            console.log("our message: ", e.target.value);
            let charName = document.getElementById("charNameField");
            charName.blur();
            props.refreshCharName(charName.value);
            let obj = { name: charName.value, charId: props.char.id };
            axios.post("/refreshCharName", obj);
        }
    };

    return (
        <div id="sidebar">
            <div className="sidebarCard sidebarPersonName">
                <i className="fas fa-portrait"></i>{" "}
                <input
                    id="charNameField"
                    defaultValue={props.char.name}
                    onKeyDown={keyCheck}
                ></input>
            </div>
            {/* <div className="sidebarCard">
                <i className="fas fa-file-alt"></i> Example
            </div> */}
            {props.cards &&
                props.cards.map((elem) => {
                    return (
                        <div
                            key={elem.id + "wrapper"}
                            className="sidebarCardWrapper"
                        >
                            <div
                                key={elem.id}
                                className="sidebarCard"
                                //the argument has to be empty, because if the argument is filled with sth, then the argument becomes the event object
                                onClick={() => props.renderCard(elem.id)}
                            >
                                <i className="fas fa-file-alt"></i>{" "}
                                {elem.heading}
                                {/* <section className="sidebarBetweenBorder"></section> */}
                            </div>
                        </div>
                    );
                })}
            <div id="addBar">
                <i className="fas fa-folder-plus"></i>
                <i onClick={addCard} className="fas fa-plus-square"></i>
            </div>
        </div>
    );
}
