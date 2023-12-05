import React from "react";
import { styled } from "@mui/material/styles";

const StyledLoginButton = styled("button")(() => ({
    outline: "none",
    width: "100%",
    height: "48px",
    border: "none",
    backgroundColor: "#ff424e",
    borderRadius: "4px",
    marginTop: "24px",
    cursor: "pointer",
    color: "#fff",
    fontFamily: "var(--font-family)",
    fontSize: "20px",
    transition: ".2s ease",
    "&:hover": {
        opacity: "0.8",
    },
}));

export default function LoginButton({ text }) {
    return (
        <>
            <StyledLoginButton type="submit">{text}</StyledLoginButton>
        </>
    );
}
