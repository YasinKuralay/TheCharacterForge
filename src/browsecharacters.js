import React, { useState, useEffect } from "react";
import axios from "./axios";
import Character from "./character";

export default function BrowseCharacters() {
    const [characters, setCharacters] = useState([]);
    const [clickedCharacterId, setClickedCharacterId] = useState(0);

    useEffect(() => {
        axios.get("/getUsersCharacters").then(({ data }) => {
            console.log("data.rows in browseCharacters is: ", data.data);
            setCharacters(data.data);
            setClickedCharacterId(0);
        });
    }, []);

    const randomAvatar = () => {
        let randomNumber = Math.floor(Math.random() * 10);
        let src = "/avatar" + randomNumber + ".png";
        console.log("src is :", src);
        return src;
    };
    // const randomAvatar = () => {
    //     return "/avatar1.png";
    // };

    const renderCharacter = (charId) => {
        console.log("charId is: ", charId);
        setClickedCharacterId(charId);
    };

    return (
        <div>
            {!clickedCharacterId && characters && (
                <div id="browseCharactersGrid">
                    {characters &&
                        characters.map((elem) => {
                            return (
                                <div
                                    key={elem.id}
                                    onClick={() => renderCharacter(elem.id)}
                                    className="flip-card"
                                >
                                    <div className="flip-card-inner">
                                        <div className="flip-card-front">
                                            <h2>{elem.name}</h2>
                                            <img
                                                src={randomAvatar()}
                                                width="180px"
                                                height="200px"
                                            />
                                        </div>
                                        <div className="flip-card-back">
                                            <h2>{elem.name}</h2>
                                            <p>{elem.description}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            )}
            {clickedCharacterId && (
                <Character charactersId={clickedCharacterId} />
            )}
        </div>
    );
}
