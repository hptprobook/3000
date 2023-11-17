import React from "react";
import { styled } from "@mui/material/styles";
const PrimaryButton = styled("button")(() => ({
    display: "flex",
    justifyContent: "center",
    textAlign: "left",
    lineHeight: "22px",
    alignItems: "center",
    padding: "8px 14px",
    border: "none",
    outline: "none",
    backgroundColor: "transparent",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: 500,
    fontFamily: "Inter, Helvetica, Arial, sans-serif !important",
    color: "#808089",
    borderRadius: "8px",
    "&:hover": {
        backgroundColor: "#e5e5e5",
    },
    "&.active": {
        color: "rgb(10, 104, 255)",
        "&:hover": {
            backgroundColor: "#e0ecff",
        },
    },
}));

export default function PrimaryBtn({
    icon,
    text,
    isActive = false,
    fullWidth = false,
}) {
    const activeClass = isActive ? "active" : "";

    return (
        <PrimaryButton
            sx={{
                ...(fullWidth ? { width: "100%" } : {}),
                ...(fullWidth ? { justifyContent: "flex-start" } : "center"),
            }}
            className={activeClass}
        >
            {icon} <span style={{ paddingLeft: "6px" }}>{text}</span>
        </PrimaryButton>
    );
}
