import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import {
    addCoupon,
    clearCouponUsage,
    getAllCoupons,
} from "@/redux/slices/couponSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCouponContext } from "@/provider/CouponContext";

const StyledOrderCoupon = styled("div")(() => ({
    padding: "20px 16px",
    borderRadius: "5px",
    backgroundColor: "#fff",
    marginLeft: "12px",
    marginTop: "12px",
    "& .couponInput": {
        marginTop: "10px",
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
}));

const couponSchema = Yup.object().shape({
    code: Yup.string()
        .required("Mã giảm giá không được để trống")
        .max(50, "Mã giảm giá không vượt quá 50 ký tự"),
});

export default function OrderCoupon() {
    const dispatch = useDispatch();
    const couponUsage = useSelector((state) => state.coupons.couponUsage);
    console.log(
        "🚀 ~ file: OrderCoupon.jsx:62 ~ OrderCoupon ~ couponUsage:",
        couponUsage
    );
    const status = useSelector((state) => state.coupons.status);
    const error = useSelector((state) => state.coupons.error);
    const { addContextCoupon, clearCoupon, coupon } = useCouponContext();
    console.log(
        "🚀 ~ file: OrderCoupon.jsx:65 ~ OrderCoupon ~ coupon:",
        coupon
    );

    const formik = useFormik({
        initialValues: {
            code: "",
        },
        validationSchema: couponSchema,
        onSubmit: (value) => {
            console.log(value);
            dispatch(addCoupon(value));
            if (couponUsage) {
                toast.success("Thêm mã giảm giá thành công", {
                    autoClose: 2000,
                });
                addContextCoupon(couponUsage.data);
                dispatch(clearCouponUsage());
            } else if (!couponUsage) {
                toast.error("Thêm mã giảm giá thất bại", {
                    autoClose: 2000,
                });
                clearCoupon();
            }
        },
    });

    useEffect(() => {
        if (error == "Mã giảm giá không chính xác") {
            formik.setErrors({ code: "Mã giảm giá không chính xác" });
        } else if (error == "Mã đã được sử dụng hết") {
            formik.setErrors({ code: "Mã đã được sử dụng hết" });
        } else if (error == "Bạn đã sử dụng mã giảm giá này") {
            formik.setErrors({ code: "Bạn đã sử dụng mã giảm giá này" });
        }
    }, [error, formik.setErrors]);

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
                        error={
                            formik.touched.code && Boolean(formik.errors.code)
                        }
                    />
                    <button>Áp dụng</button>
                </div>
            </form>
            {formik.touched.code && formik.errors.code && (
                <div className="error-message">{formik.errors.code}</div>
            )}
        </StyledOrderCoupon>
    );
}
