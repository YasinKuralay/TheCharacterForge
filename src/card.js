import React, { useState, useEffect } from "react";

export default function Card() {
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

    return (
        <div
            id="card"
            onMouseDown={dragMeToggleTrue}
            onMouseUp={dragMeToggleFalse}
            // onMouseOut={dragMeToggleFalse}
            // onMouseMove={dragMeNow && dragMe}
            style={styleObject}
        >
            {" "}
            <h3
                className="titleOfCard"
                onMouseDown={stopTheBubblingInCard}
                // onMouseMove={preventDefault}
            >
                The Title
            </h3>
            <textarea
                name="defaultTextArea"
                cols="24"
                rows="18"
                className="cardTextarea"
                onMouseDown={stopTheBubblingInCard}
            ></textarea>
        </div>
    );
}
