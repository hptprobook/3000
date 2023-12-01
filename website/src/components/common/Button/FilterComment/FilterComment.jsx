"use client";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import CheckIcon from "@mui/icons-material/Check";

const StyledFilterComment = styled("button")(({ isActive }) => ({
    padding: "8px 16px",
    borderRadius: "40px",
    display: "flex",
    alignItems: "center",
    marginRight: "12px",
    cursor: "pointer",
    border: !isActive ? "1px solid var(--border-color)" : "1px solid #328be9",
    backgroundColor: !isActive ? "#fff" : "#f0f8ff",
}));

export default function FilterComment({ text, onClick }) {
    const [isActive, setActive] = useState(false);

    const handleClick = () => {
        setActive(!isActive);
        if (onClick) {
            onClick();
        }
    };

    return (
        <StyledFilterComment isActive={isActive} onClick={handleClick}>
            {isActive && (
                <CheckIcon
                    sx={{
                        fontSize: "16px",
                        marginRight: "8px",
                        color: "#328be9",
                    }}
                />
            )}
            {text}
        </StyledFilterComment>
    );
}
