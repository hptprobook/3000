import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

const BootstrapButton = styled(Button)(({ bg }) => ({
    boxShadow: "none",
    marginRight: "12px",
    textTransform: "none",
    height: "auto",
    fontSize: 14,
    padding: "6px 18px",
    borderRadius: "12px",
    backgroundColor: bg ? "rgb(99, 102, 241)" : "transparent", // Use the provided bg prop or the default value
    "&:hover": {
        backgroundColor: bg ? "#4338ca" : "#19212f",
        borderColor: "#0062cc",
        boxShadow: "none",
    },
    "&:active": {
        boxShadow: "none",
        backgroundColor: bg ? "rgb(99, 102, 241)" : "transparent", // Use the provided bg prop or the default value
        borderColor: "#005cbf",
    },
}));

export default function ButtonNormal({ label, bg, onClick, type, icon, name }) {
    return (
        <BootstrapButton
            name={name}
            endIcon={icon ? icon : ""}
            type={type ? type : "button"}
            variant="contained"
            onClick={onClick}
            bg={bg}
        >
            {label}
        </BootstrapButton>
    );
}
