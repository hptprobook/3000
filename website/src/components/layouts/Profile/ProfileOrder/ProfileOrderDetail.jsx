"use client";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import ProgressLoading from "@/components/common/Loading/ProgressLoading/ProgressLoading";
import { Grid } from "@mui/material";
import Link from "next/link";
import { generateProductHref } from "@/utils/generateHref";
import RatingProduct from "@/components/common/Rating/RatingProduct";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { addReview } from "@/redux/slices/reviewSlice";
import { toast } from "react-toastify";
import { clearPutOrder, updateOrder } from "@/redux/slices/orderSlice";

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
        "& .total": {
            display: "flex",
            justifyContent: "flex-end",
            margin: "16px 0",
            "& .left p": {
                fontSize: "14px",
                textAlign: "end",
                marginRight: "24px",
                marginTop: "8px",
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
                "&.cancelled": {
                    border: "1px solid red",
                    "&:hover": {
                        backgroundColor: "red",
                        color: "#fff",
                        borderColor: "transparent",
                    },
                },
                "&.receipt": {
                    border: "1px solid green",
                    "&:hover": {
                        backgroundColor: "green",
                        color: "#fff",
                        borderColor: "transparent",
                    },
                },
            },
        },
    },
}));

export default function ProfileOrderDetail({ data }) {
    if (!data || data === {}) {
        return <ProgressLoading />;
    }

    const calculateShippingDate = () => {
        const today = new Date();
        const shippingDate = new Date(today);
        shippingDate.setDate(shippingDate.getDate() + 3);

        const weekday = shippingDate.toLocaleDateString("vi-VN", {
            weekday: "long",
        });

        const day = shippingDate.getDate();
        const month = shippingDate.getMonth() + 1;

        return `Giao ${weekday}, ${day}/${month}`;
    };

    const [rate, setRate] = useState(3);
    const dispatch = useDispatch();
    const reviews = useSelector((state) => state.reviews);
    const [comment, setComment] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const openModal = (productId) => {
        setIsModalOpen(true);
        setSelectedProductId(productId);
    };

    const handleSubmitReview = () => {
        dispatch(
            addReview({
                product_id: selectedProductId,
                rating: rate,
                comment: comment,
            })
        )
            .then(() => {
                toast.success("Đánh giá đã được gửi đi", {
                    autoClose: 1500,
                });
                setIsModalOpen(false);
                setRate(3);
                setComment("");
            })
            .catch(() => {
                toast.error("Có lỗi khi gửi đánh giá", { autoClose: 1500 });
                setIsModalOpen(false);
            });
    };

    const handleRatingChange = (newRating) => {
        setRate(newRating);
    };

    const cancelOrder = (orderId) => {
        const confirmDelete = confirm(
            "Bạn có chắc muốn hủy đơn hàng này không?"
        );
        if (!confirmDelete) return;

        dispatch(
            updateOrder({
                data: { status: "cancelled" },
                id: orderId,
            })
        )
            .then(() => {
                toast.success("Hủy đơn thành công", { autoClose: 1500 });
            })
            .catch(() => {
                toast.error("Có lỗi xảy ra, vui lòng thử lại", {
                    autoClose: 1500,
                });
            });
        dispatch(clearPutOrder());
    };

    const confirmReceipt = (orderId) => {
        const confirmDelete = confirm("Xác nhận đã nhận được đơn hàng này?");
        if (!confirmDelete) return;

        dispatch(
            updateOrder({
                data: { status: "delivered" },
                id: orderId,
            })
        )
            .then(() => {
                toast.success("Xác nhận thành công", { autoClose: 1500 });
            })
            .catch(() => {
                toast.error("Có lỗi xảy ra, vui lòng thử lại", {
                    autoClose: 1500,
                });
            });
        dispatch(clearPutOrder());
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

    function convertVariants(variantsJson) {
        if (variantsJson) {
            const variantsArray = JSON.parse(variantsJson);

            return variantsArray.join(" - ");
        }
    }

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
                            <p>{calculateShippingDate()}</p>
                            <p>
                                Phí vận chuyển:{" "}
                                {data?.ship_fee?.toLocaleString()}đ
                            </p>
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
                                        , {convertVariants(detail?.variants)}
                                    </Link>
                                    <div
                                        className="jc-sb"
                                        style={{ marginTop: "8px" }}
                                    >
                                        <p className="quantity">
                                            SL: x{detail?.quantity}
                                        </p>
                                        <p className="price">
                                            {detail?.price.toLocaleString()}đ
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {data.status == "delivered" && (
                                <button
                                    className="btn"
                                    onClick={() =>
                                        openModal(detail?.product?.id)
                                    }
                                >
                                    Nhận xét
                                </button>
                            )}
                        </div>
                    ))}
                <div className="total">
                    <div className="left">
                        <p>Phí vận chuyển</p>
                        <p>Khuyến mãi</p>
                        <p>Tổng cộng</p>
                    </div>
                    <div className="left">
                        <p>{data?.ship_fee?.toLocaleString()} đ</p>
                        <p>-{data?.discount?.toLocaleString()} đ</p>
                        <p
                            style={{
                                color: "red",
                            }}
                        >
                            {data?.total_amount?.toLocaleString()} đ
                        </p>
                    </div>
                </div>
                <div
                    className="handle"
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginRight: "16px",
                    }}
                >
                    {data?.status === "pending" ||
                    data?.status === "processing" ? (
                        <button
                            className="btn cancelled"
                            onClick={() => cancelOrder(data?.id)}
                        >
                            Hủy
                        </button>
                    ) : data?.status === "shipping" ? (
                        <button
                            className="btn receipt"
                            onClick={() => confirmReceipt(item.id)}
                        >
                            Đã nhận được hàng
                        </button>
                    ) : null}
                </div>
            </div>
            <div
                style={{
                    marginTop: "20px",
                    color: "var(--link-color)",
                    fontSize: "14px",
                }}
            >
                <Link href={"/profile/orders"}>Quay lại</Link>
            </div>
        </StyledProfileOrderDetail>
    );
}
