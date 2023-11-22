import { Grid } from "@mui/material";
import React from "react";
import "./style.css";
import Link from "next/link";
import Image from "next/image";

export default function Banner() {
    const fakeData = [
        {
            href: "/",
            alt: "",
            src: "https://salt.tikicdn.com/cache/w750/ts/tikimsp/68/e8/70/9404daa43e395a88d782e06760ce2062.jpg.webp",
        },
        {
            href: "/",
            alt: "",
            src: "https://salt.tikicdn.com/cache/w750/ts/tikimsp/68/e8/70/9404daa43e395a88d782e06760ce2062.jpg.webp",
        },
        {
            href: "/",
            alt: "",
            src: "https://salt.tikicdn.com/cache/w750/ts/tikimsp/68/e8/70/9404daa43e395a88d782e06760ce2062.jpg.webp",
        },
        {
            href: "/",
            alt: "",
            src: "https://salt.tikicdn.com/cache/w750/ts/tikimsp/68/e8/70/9404daa43e395a88d782e06760ce2062.jpg.webp",
        },
        {
            href: "/",
            alt: "",
            src: "https://salt.tikicdn.com/cache/w750/ts/tikimsp/68/e8/70/9404daa43e395a88d782e06760ce2062.jpg.webp",
        },
        {
            href: "/",
            alt: "",
            src: "https://salt.tikicdn.com/cache/w750/ts/tikimsp/68/e8/70/9404daa43e395a88d782e06760ce2062.jpg.webp",
        },
        {
            href: "/",
            alt: "",
            src: "https://salt.tikicdn.com/cache/w750/ts/tikimsp/68/e8/70/9404daa43e395a88d782e06760ce2062.jpg.webp",
        },
        {
            href: "/",
            alt: "",
            src: "https://salt.tikicdn.com/cache/w750/ts/tikimsp/68/e8/70/9404daa43e395a88d782e06760ce2062.jpg.webp",
        },
    ];

    return (
        <Grid container className="appContainer__banner" rowSpacing={0}>
            <Grid item xs={4} className="appContainer__banner--main">
                <Link href={"/"}>
                    <img
                        style={{
                            borderRadius: "8px",
                            width: "100%",
                            height: "100%",
                        }}
                        alt=""
                        src={
                            "https://salt.tikicdn.com/cache/w750/ts/tikimsp/68/e8/70/9404daa43e395a88d782e06760ce2062.jpg.webp"
                        }
                    />
                </Link>
            </Grid>
            <Grid
                item
                xs={8}
                container
                className=""
                columnSpacing={1.5}
                rowSpacing={1.5}
            >
                {fakeData.map((data, i) => (
                    <Grid key={i} item xs={3}>
                        <Link href={data.href}>
                            <img
                                alt={data.alt}
                                src={data.src}
                                style={{
                                    objectFit: "cover",
                                    width: "100%",
                                    height: "100%",
                                    borderRadius: "8px",
                                }}
                            />
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </Grid>
    );
}
