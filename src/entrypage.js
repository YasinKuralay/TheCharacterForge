import React from "react";
import { Link } from "react-router-dom";

export default function Entrypage() {
    return (
        <div>
            <div id="browseCharacters">
                <h2>Browse Your Characters</h2>
                <i className="fas fa-search fa-3x"></i>
            </div>

            <Link to="/createcharacter">
                <div id="createCharacters">
                    <h2>Create New Character</h2>
                    <i className="fas fa-hat-wizard fa-3x"></i>
                </div>
            </Link>
        </div>
    );
}
