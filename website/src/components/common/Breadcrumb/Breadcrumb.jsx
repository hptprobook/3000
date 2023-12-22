import { Breadcrumbs, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

export default function Breadcrumb({ link = "/", text1, text2 = null }) {
    return (
        <div
            role="presentation"
            style={{
                width: "var(--max-width)",
                margin: "auto",
                padding: "15px 0",
            }}
        >
            <Breadcrumbs
                aria-label="breadcrumb"
                sx={{
                    "& p": {
                        fontFamily: "var(--font-family)",
                    },
                    "& li": {
                        fontFamily: "var(--font-family)",
                    },
                }}
            >
                <Link
                    underline="hover"
                    color="inherit"
                    href={link}
                    style={{
                        fontSize: "14px",
                    }}
                >
                    {text1}
                </Link>
                <Typography sx={{ fontSize: "14px" }} color="text.primary">
                    {text2}
                </Typography>
            </Breadcrumbs>
        </div>
    );
}
