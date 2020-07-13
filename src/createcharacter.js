import React from "react";
import Sidebar from "./sidebar";
import Card from "./card";

export default function CreateCharacter() {
    return (
        <div>
            This is CreateCharacter
            <Sidebar />
            <Card />
        </div>
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
