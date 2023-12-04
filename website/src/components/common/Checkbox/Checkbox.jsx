import React from "react";
import "./style.css";

export default function Checkbox() {
    return (
        <label class="checkbox-container">
            <input class="custom-checkbox" checked="" type="checkbox" />
            <span class="checkmark"></span>
        </label>
    );
}
