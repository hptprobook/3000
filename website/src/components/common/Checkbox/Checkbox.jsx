import React from "react";
import "./style.css";

export default function Checkbox() {
    return (
        <label className="checkbox-container">
            <input className="custom-checkbox" checked="" type="checkbox" />
            <span className="checkmark"></span>
        </label>
    );
}
