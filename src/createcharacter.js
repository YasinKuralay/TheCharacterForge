import React, { useEffect, useState } from "react";
import axios from "./axios";
import Card from "./card";
import Character from "./character";

export default function CreateCharacter() {
    const [charactersId, setCharacterId] = useState(0);
    //on component mount, creates a new character table
    useEffect(() => {
        axios.post("/createcharacter").then(({ data }) => {
            console.log("data.characterId is: ", data.characterId);
            setCharacterId(data.characterId);
        });
    }, []);

    return (
        <div>{charactersId && <Character charactersId={charactersId} />}</div>
    );
}

//direct launch of workspace
//pre-named empty cards: physical appearance etc.
//need sidebar for this to work

//STEPS

//create a mock of the functionality first

//db query createNewCharacter. Use session.userid for it. Creates a row for users' characters table, and creates a table for the users' character
//then adds a couple rows to the character table.

//Sidebar. Does a query for the specific character, and creates a couple divs representing the cards.
