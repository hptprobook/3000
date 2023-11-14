import styled from "@emotion/styled";
import React from "react";
import "./style.css";

const CountButton = styled("button")(() => ({
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "8px 10px",
    border: "none",
    outline: "none",
    backgroundColor: "transparent",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: 500,
    fontFamily: "Inter, Helvetica, Arial, sans-serif !important",
    color: "rgb(10, 104, 255)",
    borderRadius: "8px",
    "&:hover": {
        backgroundColor: "#e0ecff",
    },
}));

export default function CountBtn({ icon, count }) {
    return (
        <CountButton>
            <span className="CountBtn__count">{count}</span>
            {icon}
        </CountButton>
    );
}
