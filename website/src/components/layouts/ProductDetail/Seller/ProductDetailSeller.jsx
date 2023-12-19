"use client";
import React from "react";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import Rating from "@/components/common/Rating/Rating";
import Link from "next/link";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CommingSoon from "../../../common/ComingSoon/ComingSoon";
import ProgressLoading from "@/components/common/Loading/ProgressLoading/ProgressLoading";

const StyledProductDetailSeller = styled("div")(() => ({
    width: "100%",
    overflow: "hidden",
    backgroundColor: "#fff",
    borderRadius: "5px",
    padding: "15px",
    marginTop: "12px",
    "& .container": {
        marginTop: "12px",
        display: "flex",
        justifyContent: "space-between",
        "& .avatar": {
            marginRight: "12px",
        },
        "& .info": {
            // marginTop: "8px",
        },
        "& .contact": {
            display: "flex",
            alignItems: "flex-start",
        },
    },
}));

export default function ProductDetailSeller({ data }) {
    return (
        <StyledProductDetailSeller>
            <h3>Thông tin người bán</h3>
            {data ? (
                <div className="container">
                    <div style={{ display: "flex" }}>
                        <div className="avatar">
                            <Image
                                width={40}
                                height={40}
                                src="https://vcdn.tikicdn.com/cache/w100/ts/seller/8a/b5/83/e59d9fb6e8aa356c79f56c9ef3ea778c.jpg.webp"
                                alt=""
                            />
                        </div>
                        <div className="info">
                            <Link href={"#"}>AMA Store</Link>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <Rating rate={4} size={15} /> |
                                <span
                                    style={{
                                        fontSize: "14px",
                                        marginLeft: "4px",
                                    }}
                                >
                                    5.000 Sản phẩm
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="contact">
                        <Link href={""}>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    fontSize: "14px",
                                    border: "1px solid #dddde3",
                                    borderRadius: "5px",
                                    padding: "4px 8px",
                                }}
                            >
                                <ArrowForwardIcon
                                    sx={{
                                        fontSize: "16px !important",
                                        paddingRight: "3px",
                                    }}
                                />
                                Ghé shop
                            </div>
                        </Link>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                fontSize: "14px",
                                border: "1px solid #dddde3",
                                borderRadius: "5px",
                                padding: "4px 8px",
                                marginLeft: "12px",
                                cursor: "pointer",
                            }}
                        >
                            <WhatsAppIcon
                                sx={{
                                    fontSize: "16px !important",
                                    paddingRight: "3px",
                                }}
                            />
                            Chat
                        </div>
                    </div>
                </div>
            ) : (
                <CommingSoon />
            )}
        </StyledProductDetailSeller>
    );
}
