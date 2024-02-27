import React from "react";
import { styled } from "@mui/material/styles";
import Link from "next/link";

const StyledProfileLinkButton = styled("li")(({ isActive }) => ({
    width: "100%",
    height: "38px",
    display: "flex",
    alignItems: "center",
    "& a": {
        padding: "0 12px",
    },
    "&:hover": {
        backgroundColor: "#ebebf0",
    },
    ...(isActive && {
        backgroundColor: "#ebebf0",
    }),
    "&.active": {
        backgroundColor: "#ebebf0",
    },
}));

export default function ProfileLinkButton({
    icon,
    text,
    url,
    isActive,
    onClick,
}) {
    return (
        <StyledProfileLinkButton
            isActive={isActive}
            className={isActive && "active"}
            onClick={onClick}
        >
            <Link href={url} className="css-link">
                <span
                    style={{
                        color: "#9b9b9b",
                    }}
                >
                    {icon}
                </span>
                <span
                    style={{
                        marginLeft: "12px",
                        fontSize: "13px",
                    }}
                >
                    {text}
                </span>
            </Link>
        </StyledProfileLinkButton>
    );
}
