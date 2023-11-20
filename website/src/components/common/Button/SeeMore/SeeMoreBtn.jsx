import React from "react";
import { styled } from "@mui/material/styles";

const StyledSeeMoreBtn = styled("button")(() => ({
    border: "1px solid #0a68ff",
    backgroundColor: "transparent",
    width: "240px",
    height: "44px",
    cursor: "pointer",
    borderRadius: "5px",
    fontSize: "16px",
    fontFamily: "Inter, Helvetica, Arial, sans-serif !important",
    fontWeight: "400",
    color: "#0a68ff",
    "&:hover": {
        backgroundColor: "#d7e3fb",
    },
}));

export default function SeeMoreBtn({ text, onClick }) {
    return <StyledSeeMoreBtn onClick={onClick}>{text}</StyledSeeMoreBtn>;
}
