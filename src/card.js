import React, { useState } from "react";

export default function Card() {
    const [offsetXOnClick, setOffsetXOnClick] = useState(0);
    const [offsetYOnClick, setOffsetYOnClick] = useState(0);
    const [dragMeNow, setDragMeNow] = useState(false);
    const [styleObject, setStyleObject] = useState({
        left: "650px",
        top: "200px",
    });

    const dragMeToggleTrue = (e) => {
        setDragMeNow(true);
        setOffsetXOnClick(e.nativeEvent.offsetX);
        setOffsetYOnClick(e.nativeEvent.offsetY);
    };

    const dragMeToggleFalse = () => {
        setDragMeNow(false);
    };

    const dragMe = (e) => {
        console.log("HERE: ", offsetXOnClick);
        setStyleObject({
            left: e.pageX - offsetXOnClick,
            top: e.pageY - offsetYOnClick,
        });
    };

    return (
        <div
            id="card"
            onMouseDown={dragMeToggleTrue}
            onMouseUp={dragMeToggleFalse}
            onMouseOut={dragMeToggleFalse}
            onMouseMove={dragMeNow && dragMe}
            style={styleObject}
        ></div>
    );
}
