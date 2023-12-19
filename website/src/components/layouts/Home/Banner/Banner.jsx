"use client";
import { Grid, Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./style.css";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllSettings } from "@/redux/slices/settingSlice";
import CirLoading from "@/components/common/Loading/CircularLoading/CirLoading";

export default function Banner() {
    const dispatch = useDispatch();
    const { loading, settings, error } = useSelector((state) => state.setting);
    const [loadData, setLoadData] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        if (!loadData && settings.length === 0) {
            dispatch(fetchAllSettings());
            setLoadData(true);
        }
    }, [loadData, settings]);

    if (loading) {
        return <CirLoading />;
    }

    const mainBannerSetting = settings.find((s) => s.name === "main_banner");
    const childBannerSetting = settings.find((s) => s.name === "child_banner");
    let childBanners = [];

    if (childBannerSetting && childBannerSetting.value) {
        childBanners = childBannerSetting.value.split(",").map((url) => {
            return { href: "/", alt: "", src: url.slice(1, -1) };
        });
    }

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
                        src={mainBannerSetting?.value}
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
                {childBanners.map((data, i) => (
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
                                    display: imageLoaded ? "block" : "none",
                                }}
                                onLoad={() => setImageLoaded(true)}
                            />
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </Grid>
    );
}
