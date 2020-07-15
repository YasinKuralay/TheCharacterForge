import React, { useState, useEffect } from "react";

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

    // useEffect(() => {
    //     console.log("props.info is: ", props.info);
    // }, []);

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
        // e.preventDefault();
    };

    const toggleFlipCard = () => {
        setFlipCardFront(!flipCardFront);
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
                id={!flipCardFront && "innerCardFlipId"}
            >
                <div>
                    <i
                        onClick={toggleFlipCard}
                        className="fas fa-undo-alt flipSign"
                        onMouseDown={stopTheBubblingInCard}
                    ></i>
                    <i className="fas fa-times cross"></i>
                    <h3
                        className="titleOfCard"
                        onMouseDown={stopTheBubblingInCard}
                        // onMouseMove={preventDefault}
                    >
                        {(props.info && props.info.heading) || "Loading"}
                        {/* {props.info || "Loading"} */}
                    </h3>
                    <section className="cardBetweenBorder"></section>
                    <textarea
                        name="defaultTextArea"
                        cols="24"
                        rows="18"
                        className="cardTextarea"
                        onMouseDown={stopTheBubblingInCard}
                        placeholder="You can type your content here"
                        spellCheck="false"
                        defaultValue={
                            (props.info && props.info.content_front) || ""
                        }
                    ></textarea>
                </div>
                <div className="backfaceOfCard">
                    <i
                        onClick={toggleFlipCard}
                        className="fas fa-undo-alt"
                        onMouseDown={stopTheBubblingInCard}
                    ></i>
                    {/* <i className="fas fa-times cross"></i> */}
                    <h3
                        className="titleOfCard"
                        onMouseDown={stopTheBubblingInCard}
                        // onMouseMove={preventDefault}
                    >
                        NOTES: {(props.info && props.info.heading) || "Loading"}
                    </h3>
                    {/* <section className="cardBetweenBorder"></section> */}
                    <textarea
                        name="defaultTextArea"
                        cols="24"
                        rows="18"
                        className="cardTextarea"
                        onMouseDown={stopTheBubblingInCard}
                        placeholder="Take some notes here!"
                        spellCheck="false"
                        defaultValue={
                            (props.info && props.info.content_back) || ""
                        }
                    ></textarea>
                </div>
            </div>
        </div>
    );
}
