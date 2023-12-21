import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import {
    addCoupon,
    checkCoupon,
    clearCouponUsage,
    getAllCoupons,
} from "@/redux/slices/couponSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCouponContext } from "@/provider/CouponContext";
import { Modal } from "@mui/material";

const StyledOrderCoupon = styled("div")(() => ({
    padding: "20px 16px",
    borderRadius: "5px",
    backgroundColor: "#fff",
    marginLeft: "12px",
    marginTop: "12px",
    "& .couponInput": {
        marginTop: "10px",
        position: "relative",
        width: "100%",
        height: "40px",
        border: "1px solid #999",
        borderRadius: "4px",
        overflow: "hidden",
        display: "flex",
        justifyContent: "space-between",
        "& input": {
            border: "none",
            outline: "none",
            width: "75%",
            height: "100%",
            padding: "0 12px",
        },
        "& button": {
            border: "none",
            outline: "none",
            backgroundColor: "#fff",
            padding: "0 12px",
            borderLeft: "1px solid #999",
            color: "#0a68ff",
            cursor: "pointer",
            "&:hover": {
                backgroundColor: "#448afa",
                color: "#fff",
            },
        },
    },
    "& .modalCoupon": {
        zIndex: 10000,
        backgroundColor: "#fff",
        "& ul": {
            listStyle: "none",
            marginTop: "12px",
            fontSize: "14px",
            "& li": {
                padding: "2px 0",
                "& .card": {
                    width: "100%",
                    maxWidth: "100%",
                    height: "70px",
                    background: "#fff",
                    border: "1px solid #eaeaea",
                    borderRadius: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "left",
                    backdropFilter: "blur(10px)",
                    transition: "0.3s ease-in-out",
                    "&:hover": {
                        border: "1px solid #0c6cf1",
                        cursor: "pointer",
                        "& .img": {
                            transition: "0.5s ease-in-out",
                            backgroundImage:
                                "url('/3000i_logo_transparent_100x100.png')",
                            backgroundSize: "cover",
                        },
                    },
                },
                "& .img": {
                    width: "50px",
                    height: "50px",
                    marginLeft: "10px",
                    borderRadius: "10px",
                    background: "linear-gradient(#055af4, #9198e5)",
                },
                "& .textBox": {
                    width: "calc(100% - 90px)",
                    marginLeft: "10px",
                    color: "#333",
                },
                "& .textContent": {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                },
                "& .span": {
                    fontSize: "10px",
                },
                "& .h1": {
                    fontSize: "16px",
                    fontWeight: "bold",
                },
                "& .p": {
                    fontSize: "13px",
                },
            },
        },
    },
}));

const couponSchema = Yup.object().shape({
    code: Yup.string()
        .required("Mã giảm giá không được để trống")
        .max(50, "Mã giảm giá không vượt quá 50 ký tự"),
});

export default function OrderCoupon() {
    const dispatch = useDispatch();
    const couponUsage = useSelector((state) => state.coupons.checkCoupon);
    const status = useSelector((state) => state.coupons.status);
    const error = useSelector((state) => state.coupons.error);
    const { addContextCoupon, clearCoupon, coupon } = useCouponContext();
    const formik = useFormik({
        initialValues: {
            code: "",
        },
        validationSchema: couponSchema,
        onSubmit: (value) => {
            dispatch(checkCoupon(value));
        },
    });

    useEffect(() => {
        if (couponUsage) {
            toast.success("Thêm mã giảm giá thành công", {
                autoClose: 2000,
            });
            addContextCoupon(couponUsage.data);
            dispatch(clearCouponUsage());
        }
    }, [couponUsage]);

    useEffect(() => {
        if (error == "Mã giảm giá không chính xác") {
            formik.setErrors({ code: "Mã giảm giá không chính xác" });
        } else if (error == "Mã đã được sử dụng hết") {
            formik.setErrors({ code: "Mã đã được sử dụng hết" });
        } else if (error == "Bạn đã sử dụng mã giảm giá này") {
            formik.setErrors({ code: "Bạn đã sử dụng mã giảm giá này" });
        }
    }, [error, formik.setErrors]);

    const couponList = [
        {
            id: 9,
            code: "FREESHIP",
            description: "Miễn phí giao hàng",
            start_date: "2023-11-08",
            end_date: "2023-12-22",
            amount: 100,
            quantity: 96,
            type: "ship",
        },
        {
            id: 10,
            code: "NOELVUIVE",
            description: "Phiếu mua hàng 500.000đ nhân dịp Noel",
            start_date: "2023-11-08",
            end_date: "2024-01-21",
            amount: 500000,
            quantity: 96,
            type: "direct",
        },
        {
            id: 11,
            code: "TETNGUYENDAN",
            description: "Giảm 10% giá trị đơn hàng dịp tết",
            start_date: "2023-11-08",
            end_date: "2024-01-21",
            amount: 10,
            quantity: 96,
            type: "percent",
        },
        {
            id: 12,
            code: "TETVUIVE",
            description: "Giảm 5% giá trị đơn hàng dịp tết",
            start_date: "2023-11-08",
            end_date: "2024-01-21",
            amount: 10,
            quantity: 99,
            type: "percent",
        },
    ];

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCouponCode, setSelectedCouponCode] = useState("");

    const handleInputFocus = () => {
        setIsModalOpen(true);
    };

    const handleCouponSelect = (couponCode) => {
        setSelectedCouponCode(couponCode);
        setIsModalOpen(false);
    };

    useEffect(() => {
        formik.setFieldValue("code", selectedCouponCode);
    }, [selectedCouponCode]);

    return (
        <StyledOrderCoupon>
            <h4>Khuyến mãi</h4>
            <form action="" onSubmit={formik.handleSubmit}>
                <div className="couponInput">
                    <input
                        type="text"
                        name="code"
                        value={formik.values.code}
                        onChange={formik.handleChange}
                        placeholder="Nhập mã giảm giá ... "
                        onFocus={handleInputFocus}
                        error={
                            formik.touched.code && Boolean(formik.errors.code)
                        }
                    />
                    <button>Áp dụng</button>
                </div>
                {formik.touched.code && formik.errors.code && (
                    <div className="error-message">{formik.errors.code}</div>
                )}
                {isModalOpen && (
                    <div className="modalCoupon">
                        <ul>
                            {couponList.map((coupon) => (
                                <li
                                    key={coupon.id}
                                    onClick={() =>
                                        handleCouponSelect(coupon.code)
                                    }
                                >
                                    <div class="card">
                                        <div class="img"></div>
                                        <div class="textBox">
                                            <div class="textContent">
                                                <p class="h1">Mã giảm giá</p>
                                                <span class="span">
                                                    {coupon.end_date}
                                                </span>
                                            </div>
                                            <p class="p">
                                                {coupon.description}
                                            </p>
                                            <div></div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </form>
        </StyledOrderCoupon>
    );
}
