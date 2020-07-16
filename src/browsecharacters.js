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

    const randomAvatar = () => {
        let randomNumber = Math.floor(Math.random() * 10);
        let src = "/avatar" + randomNumber + ".png";
        console.log("src is :", src);
        return src;
    };
    // const randomAvatar = () => {
    //     return "/avatar1.png";
    // };

    return (
        <div id="browseCharactersGrid">
            {characters &&
                characters.map((elem) => {
                    return (
                        <div key={elem.id} className="flip-card">
                            <div className="flip-card-inner">
                                <div className="flip-card-front">
                                    <img
                                        src={randomAvatar()}
                                        width="200px"
                                        height="200px"
                                    />
                                </div>
                                <div className="flip-card-back">
                                    {elem.name}
                                </div>
                            </div>
                        </div>
                    );
                })}
        </div>
    );
}
