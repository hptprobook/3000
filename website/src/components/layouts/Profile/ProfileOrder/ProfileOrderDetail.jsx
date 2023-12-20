"use client";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import ProgressLoading from "@/components/common/Loading/ProgressLoading/ProgressLoading";
import { Grid } from "@mui/material";
import Link from "next/link";
import { generateProductHref } from "@/utils/generateHref";
import RatingProduct from "@/components/common/Rating/RatingProduct";
import CloseIcon from "@mui/icons-material/Close";

const StyledProfileOrderDetail = styled("div")(() => ({
    "& .top": {
        marginTop: "12px",
        "& .info": {
            width: "100%",
            "& .item": {
                width: "100%",
                height: "120px",
                backgroundColor: "#fff",
                borderRadius: "5px",
                padding: "12px 20px",
                "& p": {
                    fontSize: "13px",
                    marginTop: "4px",
                },
            },
        },
    },
    "& .list": {
        marginTop: "12px",
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: "5px",
        padding: "12px",
        "& .detail__item": {
            margin: "24px 0",
            width: "100%",
            display: "flex",
            alignItems: "center",
            "& .img": {
                width: "80px",
                height: "72px",
                overflow: "hidden",
                borderRadius: "3px",
            },
            "& .info": {
                width: "100%",
                marginLeft: "12px",
                "& .name": {
                    fontSize: "14px",
                    color: "#808089",
                },
                "& .quantity": {
                    fontSize: "14px",
                    color: "#808089",
                },
                "& .price": {
                    fontWeight: "500",
                },
            },
        },
        "& .btn": {
            padding: "6px 10px",
            borderRadius: "4px",
            border: "none",
            outline: "none",
            cursor: "pointer",
            backgroundColor: "#fff",
            color: "#189eff",
            fontSize: "13px",
            marginRight: "8px",
            border: "1px solid #189eff",
        },
    },
    "& .review_modal": {
        position: "fixed",
        top: "0",
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        "& .modal": {
            padding: "20px",
            width: "400px",
            height: "400px",
            backgroundColor: "#fff",
            borderRadius: "5px",
            "& .rating": {
                marginTop: "24px",
                width: "100%",
            },
            "& .comment": {
                marginTop: "12px",
                "& textarea": {
                    width: "100%",
                    fontFamily: "var(--font-family)",
                    border: "1px solid #888",
                    borderRadius: "5px",
                    outline: "none",
                    padding: "8px",
                    marginTop: "12px",
                },
            },
            "& button": {
                width: 80,
                height: 32,
                border: "1px solid #189eff",
                borderRadius: "3px",
                color: "#189eff",
                backgroundColor: "#fff",
                marginTop: "12px",
                cursor: "pointer",
            },
        },
    },
}));

export default function ProfileOrderDetail({ data }) {
    if (!data || data === {}) {
        return <ProgressLoading />;
    }

    const [rate, setRate] = useState(3);
    const [comment, setComment] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmitReview = () => {
        console.log("submit");
    };
    const handleRatingChange = (newRating) => {
        setRate(newRating);
    };

    function truncateString(str, num) {
        if (str) {
            if (str.length > num) {
                return str.slice(0, num) + "...";
            } else {
                return str;
            }
        }
    }

    const statusConvert = (status) => {
        const statusConversion = {
            pending: { text: "Chờ xác nhận", class: "pending" },
            processing: { text: "Đang xử lý", class: "processing" },
            shipping: { text: "Đang giao hàng", class: "shipping" },
            delivered: { text: "Đã nhận hàng", class: "delivered" },
            cancelled: { text: "Đã hủy", class: "cancelled" },
            refunded: { text: "Đã hoàn tiền", class: "refunded" },
            all: { text: "Tất cả", class: "" },
        };

        return statusConversion[status] || { text: status, class: "" };
    };

    return (
        <StyledProfileOrderDetail>
            <div
                className="review_modal flex-c"
                style={{ display: isModalOpen ? "flex" : "none" }}
                onClick={closeModal}
            >
                <div className="modal" onClick={(e) => e.stopPropagation()}>
                    <CloseIcon
                        sx={{
                            float: "right",
                            cursor: "pointer",
                        }}
                        onClick={closeModal}
                    />
                    <div className="rating">
                        <p style={{ marginBottom: "8px" }}>Đánh giá</p>
                        <RatingProduct onRatingChange={handleRatingChange} />
                    </div>
                    <div className="comment">
                        <p>Điều gì làm bạn hài lòng?</p>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            type="text"
                            rows={10}
                            placeholder="Hãy chia sẻ cảm nhận, đánh giá của bạn về sản phẩm này nhé"
                        />
                    </div>
                    <button onClick={handleSubmitReview}>Gửi đi</button>
                </div>
            </div>
            <p>
                Chi tiết đơn hàng #{data?.id} -{" "}
                {statusConvert(data?.status).text}
            </p>
            <Grid container spacing={1} className="top">
                <Grid item xs={4}>
                    <div className="info">
                        <p
                            style={{
                                margin: "12px 0",
                                fontSize: "14px",
                            }}
                        >
                            ĐỊA CHỈ NGƯỜI NHẬN
                        </p>
                        <div className="address item">
                            <b>{data?.address?.name}</b>
                            <p>Địa chỉ: {data?.address?.address_info}</p>
                            <p>Điện thoại: {data?.address?.phone}</p>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={4}>
                    <div className="info">
                        <p
                            style={{
                                margin: "12px 0",
                                fontSize: "14px",
                            }}
                        >
                            HÌNH THỨC GIAO HÀNG
                        </p>
                        <div className="ship item">
                            <b>Giao hàng tiết kiệm</b>
                            <p>Giao thứ 5, ngày 21/12</p>
                            <p>Phí vận chuyển: {data?.ship_fee}đ</p>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={4}>
                    <div className="info">
                        <p
                            style={{
                                margin: "12px 0",
                                fontSize: "14px",
                            }}
                        >
                            HÌNH THỨC THANH TOÁN
                        </p>
                        <div className="payment item">
                            <p>Thanh toán bằng tiền mặt khi nhận hàng</p>
                        </div>
                    </div>
                </Grid>
            </Grid>
            <div className="list">
                <p>Danh sách sản phẩm</p>
                {data &&
                    data?.order_details?.map((detail) => (
                        <div
                            style={{
                                borderBottom: "1px solid #888",
                                paddingBottom: "12px",
                                marginTop: "12px",
                            }}
                        >
                            <div className="detail__item" key={detail?.id}>
                                <div className="img">
                                    <img
                                        className="img-c"
                                        src={detail?.product?.thumbnail}
                                        alt=""
                                    />
                                </div>
                                <div className="info">
                                    <Link
                                        href={generateProductHref(
                                            detail?.product?.name,
                                            detail?.product?.id
                                        )}
                                        className="name"
                                    >
                                        {truncateString(
                                            detail?.product?.name,
                                            100
                                        )}
                                    </Link>
                                    <div
                                        className="jc-sb"
                                        style={{ marginTop: "8px" }}
                                    >
                                        <p className="quantity">
                                            SL: x{detail?.quantity}
                                        </p>
                                        <p className="price">
                                            {detail?.product?.price.toLocaleString()}
                                            đ
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {data.status == "delivered" && (
                                <button
                                    className="btn"
                                    onClick={() => setIsModalOpen(true)}
                                >
                                    Nhận xét
                                </button>
                            )}
                        </div>
                    ))}
            </div>
        </StyledProfileOrderDetail>
    );
}
