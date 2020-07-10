import React from "react";

export default function topbar(props) {
    const goToHomepage = () => {
        props.history.push("/");
    };
    return (
        <div>
            <div id="topBarPlaceholder"></div>
            <div id="topBar">
                <div className="topBarComponent" onClick={goToHomepage}>
                    <i className="fas fa-home fa-lg"></i>
                    <span> Home</span>
                </div>
                <a href="/logout">
                    <div className="topBarComponent" id="logout">
                        <i className="fas fa-sign-out-alt fa-lg"></i>
                        <span> Logout</span>
                    </div>
                </a>
            </div>
        </div>
    );
}
