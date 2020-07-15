import React, { useEffect, useState } from "react";
import axios from "./axios";
import Sidebar from "./sidebar";
import Card from "./card";

export default function Character(props) {
    // const [runthis, setRunthis] = useState(false);
    const [cardsInfo, setCardsInfo] = useState([]);
    const [charInfo, setCharInfo] = useState([]);
    const [cardId, setCardId] = useState(null);
    const [renderCard1, setRenderCard1] = useState(false);
    const [renderCard2, setRenderCard2] = useState(false);
    const [renderCard3, setRenderCard3] = useState(false);

    useEffect(() => {
        axios.get(`/character${props.charactersId}`).then(({ data }) => {
            setCardsInfo(data.data[1].rows);
            setCharInfo(data.data[0].rows[0]);
            setRenderCard1(false);
            setRenderCard2(false);
            setRenderCard3(false);
        });
    }, []);

    useEffect(() => {
        console.log("second useeffect just ran!");
        if (!renderCard1) {
            console.log("card number 1 rendered!");
            setRenderCard1(true);
            return;
        } else if (!renderCard2) {
            console.log("card number 2 rendered!");
            setRenderCard2(true);
            return;
        } else if (!renderCard3) {
            console.log("card number 3 rendered!");
            setRenderCard3(true);
            return;
        }
    }, [cardId]);

    const renderCardWithInfo = (cardIdArg) => {
        console.log("rendercards just ran!!!!!!", cardsInfo[cardIdArg - 1]);
        console.log("rendercards just ran2", cardId);
        if (!cardsInfo[cardIdArg - 1]) {
            return;
        } else {
            setCardId(cardIdArg - 1);
        }
    };

    return (
        <div>
            <Sidebar
                cards={cardsInfo}
                char={charInfo}
                renderCard={renderCardWithInfo}
            />
            {renderCard1 && <Card info={cardsInfo[cardId]} />}
            {renderCard2 && <Card info={cardsInfo[cardId]} />}
            {renderCard3 && <Card info={cardsInfo[cardId]} />}
        </div>
    );
}
