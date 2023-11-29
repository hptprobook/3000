import React, { useState } from "react";
import { styled } from "@mui/material/styles";

const StyledVariant = styled("span")(({ isActive }) => ({
    padding: "6px 12px",
    border: isActive ? "1px solid #d9d7d7" : "1px solid transparent",
    outline: isActive ? "none" : "2px solid #0a68ff",
    borderRadius: "8px",
    color: "#2b2440",
    fontSize: "14px",
    fontWeight: 500,
    cursor: "pointer",
    position: "relative",
    overflow: "hidden",
    marginRight: "12px",
    marginTop: "20px",
    "&:hover": {
        outline: "2px solid #0a68ff",
        borderColor: "transparent", // Sử dụng box-shadow để tạo viền
    },
    "& img": {
        position: "absolute",
        top: "-2px",
        right: "-2px",
        width: "13px",
        height: "13px",
    },
}));

export default function Variant({ text, onClick, isActive }) {
    console.log("🚀 ~ file: Variant.jsx:31 ~ Variant ~ isActive:", isActive);
    return (
        <>
            <StyledVariant onClick={onClick} isActive={!isActive}>
                {text}
                {isActive && (
                    <img
                        src="https://salt.tikicdn.com/ts/upload/6d/62/b9/ac9f3bebb724a308d710c0a605fe057d.png"
                        alt=""
                    />
                )}
            </StyledVariant>
        </>
    );
}
