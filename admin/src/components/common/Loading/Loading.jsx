import * as React from "react";
import Box from "@mui/material/Box";
import "./style.css";

export default function Loading() {
    return (
        <Box class="dots-container">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
        </Box>
    );
}
