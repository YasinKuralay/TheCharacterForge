import React, { useEffect } from "react";
import axios from "./axios";

export const keyCheck = (e, props) => {
    if (e.key === "Enter") {
        e.preventDefault();
        console.log("our message: ", e.target.value);
        let charName = document.getElementById("charNameField");
        charName.blur();
        props.refreshCharName(charName.value);
        let obj = { name: charName.value, charId: props.char.id };
        axios.post("/refreshCharName", obj);
        return "success";
    }
};

export const inputKeyCheck = (e, elemId, props) => {
    let elem = document.getElementById("input" + elemId);
    if (e.key === "Enter") {
        e.preventDefault();
        elem.blur();
        props.refreshCardsName(elem.value, elemId);
        let obj = {
            cardId: elemId,
            heading: elem.value,
            charId: props.char.id,
        };
        axios.post("/refreshCardName", obj);
    }
};

export default function Sidebar(props) {
    const addCard = () => {
        axios.post(`/addCardTo${props.char.id}`).then(() => {
            props.refreshSidebar();
        });
    };

    return (
        <div id="sidebar">
            <div className="sidebarCard sidebarPersonName">
                <i className="fas fa-portrait"></i>{" "}
                <input
                    autoComplete="off"
                    id="charNameField"
                    defaultValue={props.char.name}
                    onKeyDown={(e) => {
                        keyCheck(e, props);
                    }}
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
                                <input
                                    autoComplete="off"
                                    className="sidebarInput"
                                    defaultValue={elem.heading}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                    }}
                                    onKeyDown={(e) =>
                                        inputKeyCheck(e, elem.id, props)
                                    }
                                    id={"input" + elem.id}
                                ></input>
                            </div>
                            {/* input def val=elem.heading id=elem.id+"input"
                            onKeyDown={() => keyCheck(elem.id)} */}
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
