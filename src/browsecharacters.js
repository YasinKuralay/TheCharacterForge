import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function BrowseCharacters() {
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        axios.get("/getUsersCharacters").then(({ data }) => {
            console.log("data.rows in browseCharacters is: ", data.data);
            setCharacters(data.data);
        });
    }, []);

    return (
        <div id="browseCharactersGrid">
            {characters &&
                characters.map((elem) => {
                    return <div key={elem.id}>{elem.name}</div>;
                })}
        </div>
    );
}
