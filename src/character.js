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
  const [card1Info, setCard1Info] = useState({});
  const [renderCard2, setRenderCard2] = useState(false);
  const [card2Info, setCard2Info] = useState({});
  const [renderCard3, setRenderCard3] = useState(false);
  const [card3Info, setCard3Info] = useState({});

  useEffect(() => {
    axios.get(`/character${props.charactersId}`).then(({ data }) => {
      console.log("cardsInfo is: ", data.data[1].rows[0]);
      setCardsInfo(data.data[1].rows);
      setCharInfo(data.data[0].rows[0]);
      setRenderCard1(false);
      setRenderCard2(false);
      setRenderCard3(false);
    });
  }, []);

  useEffect(() => {
    console.log("second useeffect just ran!");
    if (!renderCard1 && cardId !== -10) {
      console.log("card number 1 rendered!");
      setCard1Info(cardsInfo[cardId]);
      setRenderCard1(true);
      setCardId(-10);
      return;
    } else if (!renderCard2 && cardId !== -10) {
      console.log("card number 2 rendered!");
      setCard2Info(cardsInfo[cardId]);
      setRenderCard2(true);
      setCardId(-10);
      return;
    } else if (!renderCard3 && cardId !== -10) {
      console.log("card number 3 rendered!");
      setCard3Info(cardsInfo[cardId]);
      setRenderCard3(true);
      setCardId(-10);
      return;
    }
  }, [cardId]);

  const closeCard = (cardId, obj) => {
    let cloneCardsInfo = [...cardsInfo];
    console.log("cardsInfo is: ", cardsInfo);
    console.log("cloneCardsInfo is: ", cloneCardsInfo);
    cloneCardsInfo[obj.cardId - 1].content_front = obj.content_front;
    cloneCardsInfo[obj.cardId - 1].content_back = obj.content_back;
    setCardsInfo(cloneCardsInfo);
    // console.log("cardsinfo after updating is: ", cardsInfo);
    if (cardId === 1) {
      setRenderCard1(false);
    } else if (cardId === 2) {
      setRenderCard2(false);
    } else if (cardId === 3) {
      setRenderCard3(false);
    }
  };

  const renderCardWithInfo = (cardIdArg) => {
    if (!cardsInfo[cardIdArg - 1]) {
      return;
    } else {
      setCardId(cardIdArg - 1);
    }
  };

  const refreshSidebarWithNewCard = () => {
    let cloneCardsInfo = [...cardsInfo];
    cloneCardsInfo.push({
      id: cardsInfo.length + 1,
      heading: "New Card",
      content_front: null,
      content_back: null,
    });
    setCardsInfo(cloneCardsInfo);
  };

  const refreshCharName = (value) => {
    let clonedState = [...charInfo]; //the spread operator was placed inside curly brackets instead of square brackets. Adding this note in case that was intentional.
    clonedState.name = value;
    setCharInfo(clonedState);
  };

  const refreshCardsName = (value, id) => {
    let clonedState = [...cardsInfo];
    clonedState[id - 1].heading = value;
    setCardsInfo(clonedState);
  };

  return (
    <div>
      <Sidebar
        cards={cardsInfo}
        char={charInfo}
        renderCard={renderCardWithInfo}
        refreshSidebar={refreshSidebarWithNewCard}
        refreshCharName={refreshCharName}
        refreshCardsName={refreshCardsName}
      />
      {renderCard1 && (
        <Card
          info={card1Info}
          char={charInfo}
          close={closeCard}
          cardId={1}
        />
      )}
      {renderCard2 && (
        <Card
          info={card2Info}
          char={charInfo}
          close={closeCard}
          cardId={2}
        />
      )}
      {renderCard3 && (
        <Card
          info={card3Info}
          char={charInfo}
          close={closeCard}
          cardId={3}
        />
      )}
    </div>
  );
}
