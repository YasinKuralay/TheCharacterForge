import React, { useEffect, useState } from "react";
import axios from "./axios";
import Sidebar from "./sidebar";
import Card from "./card";

export default function Character(props) {
    const [cardsInfo, setCardsInfo] = useState([]);
    const [charInfo, setCharInfo] = useState([]);

    useEffect(() => {
        axios.get(`/character${props.charactersId}`).then(({ data }) => {
            console.log(data.data[1].rows.map);
            setCardsInfo(data.data[1].rows);
            setCharInfo(data.data[0].rows[0]);
        });
    }, []);

    const renderCardWithInfo = (cardId) => {
        console.log("rendercards just ran!!!!!!", cardId);
    };

    return (
        <div>
            <Sidebar
                cards={cardsInfo}
                char={charInfo}
                renderCard={renderCardWithInfo}
            />
            <Card />
        </div>
    );
}
