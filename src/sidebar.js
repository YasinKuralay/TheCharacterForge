import React from "react";

export default function Sidebar() {
    return (
        <div id="sidebar">
            <div className="sidebarCard">
                <i className="fas fa-file-alt"></i> Example
            </div>
            <div id="addBar">
                <i className="fas fa-folder-plus"></i>
                <i className="fas fa-plus-square"></i>
            </div>
        </div>
    );
}
