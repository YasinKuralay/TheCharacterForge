import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function Card(props) {
  const [flipCardFront, setFlipCardFront] = useState(true);
  const [offsetXOnClick, setOffsetXOnClick] = useState(0);
  const [offsetYOnClick, setOffsetYOnClick] = useState(0);
  const [dragMeNow, setDragMeNow] = useState(false);
  const [styleObject, setStyleObject] = useState({
    left: "650px",
    top: "200px",
  });

  //I have to add the event listeners with useEffect because useState is asynchronous,
  //and the mouse will jump to its previous clicked location on the div, everytime a click occurs
  useEffect(() => {
    if (dragMeNow) {
      document.addEventListener("mousemove", movingFunction);
      document.addEventListener("mouseup", removeTheEventListener);
    }
  }, [dragMeNow]);

  const dragMeToggleTrue = (e) => {
    setDragMeNow(true);
    setOffsetXOnClick(e.nativeEvent.offsetX);
    setOffsetYOnClick(e.nativeEvent.offsetY);
    // document.addEventListener("mousemove", movingFunction);
    // document.addEventListener("mouseup", removeTheEventListener);
  };

  const removeTheEventListener = () => {
    document.removeEventListener("mousemove", movingFunction);
    document.removeEventListener("mouseup", removeTheEventListener);
  };

  const dragMeToggleFalse = () => {
    setDragMeNow(false);
  };

  const movingFunction = (e) => {
    e.preventDefault();
    setStyleObject({
      left: e.pageX - offsetXOnClick,
      top: e.pageY - offsetYOnClick,
    });
  };

  const stopTheBubblingInCard = (e) => {
    e.stopPropagation();
  };

  const toggleFlipCard = (e) => {
    e.stopPropagation();
    setFlipCardFront(!flipCardFront);
  };

  const closeTheCard = () => {
    let frontText = document.getElementById("frontTextArea" + props.info.id)
      .value;
    let backText = document.getElementById("backTextArea" + props.info.id)
      .value;
    let obj = {
      content_front: frontText,
      content_back: backText,
      charId: props.char.id,
      cardId: props.info.id,
    };
    props.close(props.cardId, obj);
    axios.post(`/updateCharacterCard`, obj);
  };

  return (
    <div
      className="cardContainer"
      onMouseDown={dragMeToggleTrue}
      onMouseUp={dragMeToggleFalse}
      // onMouseOut={dragMeToggleFalse}
      // onMouseMove={dragMeNow && dragMe}
      style={styleObject}
    >
      <div
        className="innerCardContainer"
        id={!flipCardFront ? "innerCardFlipId" : undefined}
      >
        <div>
          <i
            onClick={toggleFlipCard}
            className="fas fa-undo-alt flipSign"
            onMouseDown={stopTheBubblingInCard}
          >
          </i>
          <i
            onClick={closeTheCard}
            className="fas fa-times cross"
          >
          </i>
          <h3
            className="titleOfCard"
            onMouseDown={stopTheBubblingInCard}
          >
            {(props.info && props.info.heading) || "Loading"}
          </h3>
          <section className="cardBetweenBorder"></section>
          <textarea
            name="frontTextArea"
            id={props.info && "frontTextArea" + props.info.id}
            cols="24"
            rows="18"
            className="cardTextarea"
            onMouseDown={stopTheBubblingInCard}
            placeholder="You can type your content here"
            spellCheck="false"
            defaultValue={(props.info && props.info.content_front) || ""}
          >
          </textarea>
        </div>
        <div className="backfaceOfCard">
          <i onClick={toggleFlipCard} className="fas fa-undo-alt"></i>
          {/* <i className="fas fa-times cross"></i> */}
          <h3
            className="titleOfCard"
            onMouseDown={stopTheBubblingInCard}
          >
            NOTES: {(props.info && props.info.heading) || "Loading"}
          </h3>
          {/* <section className="cardBetweenBorder"></section> */}
          <textarea
            name="backTextArea"
            id={props.info && "backTextArea" + props.info.id}
            cols="24"
            rows="18"
            className="cardTextarea"
            onMouseDown={stopTheBubblingInCard}
            placeholder="Take some notes here!"
            spellCheck="false"
            defaultValue={(props.info && props.info.content_back) || ""}
          >
          </textarea>
        </div>
      </div>
    </div>
  );
}
