import * as React from "react";
import Box from "@mui/material/Box";
import "./style.css";

export default function Loading() {
    return (
        <Box className="dots-container">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
        </Box>
    );
}
