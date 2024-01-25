import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import { useCouponContext } from "@/provider/CouponContext";
import { useOrderAddressContext } from "@/provider/OrderAddressContext";
import { useDispatch, useSelector } from "react-redux";
import { addOrder } from "@/redux/slices/orderSlice";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { usePaymentMethodContext } from "@/provider/PaymentMethodContext";
import {
    clearCheckoutData,
    createVNPCheckout,
} from "@/redux/slices/checkoutSlice";

const StyledCheckout = styled("div")(() => ({
    padding: "20px 16px",
    borderRadius: "5px",
    backgroundColor: "#fff",
    marginLeft: "12px",
    marginTop: "12px",
    "& .checkout_head": {
        marginTop: "6px",
    },
}));

export default function Checkout({ totalPrice, fee, cartItemIds, addresses }) {
    let defaultAddress = "";
    const router = useRouter();
    const dispatch = useDispatch();
    const newFee = fee ? fee : 0;
    const [orderId, setOrderId] = useState(null);
    const { clearCoupon, coupon } = useCouponContext();
    const { selectedAddress } = useOrderAddressContext();
    const { selectedPaymentMethod } = usePaymentMethodContext();
    const { postOrder } = useSelector((state) => state.orders);
    const { checkoutData } = useSelector((state) => state.checkout);

    if (addresses?.length > 0) {
        defaultAddress =
            selectedAddress ||
            addresses?.find((address) => address.default === 1);
    }
    const [discount, setDiscount] = useState(0);
    const [finalPrice, setFinalPrice] = useState(totalPrice);

    useEffect(() => {
        let newDiscount = 0;
        if (coupon && coupon.type) {
            if (coupon.type === "direct") {
                newDiscount = coupon.amount;
            } else if (coupon.type === "percent") {
                newDiscount = totalPrice * (coupon.amount / 100);
            } else if (coupon.type === "ship") {
                newDiscount = fee ? fee * (coupon.amount / 100) : 0;
            }
        }
        setDiscount(newDiscount);
        setFinalPrice(Number(totalPrice) + newFee - newDiscount);
    }, [coupon, totalPrice, fee]);

    useEffect(() => {
        if (postOrder) {
            setOrderId(postOrder.id);
        }
    }, [postOrder]);

    const processOrder = async () => {
        try {
            await dispatch(
                addOrder({
                    cart_item_ids: cartItemIds,
                    address_id: defaultAddress.id,
                    total_amount: finalPrice,
                    ship_fee: fee ?? 0,
                    code: coupon ? coupon.code : null,
                    discount: discount,
                })
            );

            if (selectedPaymentMethod === "COD") {
                toast.success("Đặt hàng thành công", { autoClose: 2000 });
                setTimeout(() => router.push("/profile/orders"), 1000);
                clearCoupon();
            }
        } catch (error) {
            toast.error(error);
        }
    };

    useEffect(() => {
        if (orderId && selectedPaymentMethod === "VNPAY") {
            const data = {
                amount: finalPrice + newFee,
                order_id: orderId,
                method: "VNPAY",
            };

            dispatch(createVNPCheckout(data));
        }
    }, [orderId, selectedPaymentMethod, finalPrice, newFee, dispatch]);

    useEffect(() => {
        if (checkoutData && checkoutData?.message === "success") {
            toast.info("Đang chuyển hướng...");
            window.location.href = checkoutData.data;
            clearCheckoutData();
        }
    }, [checkoutData]);

    const handleSubmit = () => {
        if (!defaultAddress) {
            toast.error("Bạn cần phải thêm địa chỉ giao hàng", {
                autoClose: 2000,
            });
            return;
        }
        processOrder();
    };

    return (
        <StyledCheckout>
            <div className="checkout_head jc-sb">
                <h4>Đơn hàng</h4>
                <Link
                    href={"/cart"}
                    style={{ color: "var(--link-color)", fontSize: "14px" }}
                >
                    Thay đổi
                </Link>
            </div>
            <div className="jc-sb mt-12">
                <p
                    style={{
                        fontSize: "14px",
                        color: "#808089",
                    }}
                >
                    Tạm tính
                </p>
                <p
                    style={{
                        fontSize: "14px",
                        color: "#808089",
                    }}
                >
                    {Number(totalPrice).toLocaleString()}đ
                </p>
            </div>
            <div className="jc-sb mt-6">
                <p
                    style={{
                        fontSize: "14px",
                        color: "#808089",
                    }}
                >
                    Phí vận chuyển
                </p>
                <p
                    style={{
                        fontSize: "14px",
                        color: "#808089",
                    }}
                >
                    {fee ? Number(fee).toLocaleString() : 0}đ
                </p>
            </div>
            <div className="jc-sb mt-6">
                <p
                    style={{
                        fontSize: "14px",
                        color: "#808089",
                    }}
                >
                    Giảm giá
                </p>
                <span
                    style={{
                        fontSize: "14px",
                        color: "#00ab56",
                    }}
                >
                    - {discount.toLocaleString()}đ
                </span>
            </div>
            <div
                className="totalPrice jc-sb mt-12"
                style={{
                    borderTop: "1px solid #999",
                    paddingTop: "12px",
                }}
            >
                <p
                    style={{
                        fontSize: "14px",
                        color: "#808089",
                    }}
                >
                    Tổng tiền
                </p>
                <span
                    style={{
                        color: "#ff424e",
                        fontSize: "20px",
                        fontWeight: "500",
                    }}
                >
                    {finalPrice?.toLocaleString()}đ
                </span>
            </div>
            <button
                style={{
                    width: "100%",
                    height: "40px",
                    borderRadius: "6px",
                    marginTop: "12px",
                    border: "none",
                    outline: "none",
                    backgroundColor: "#ff424e",
                    fontSize: "16px",
                    fontWeight: "500",
                    letterSpacing: "1px",
                    cursor: "pointer",
                    color: "#fff",
                }}
                onClick={handleSubmit}
            >
                Đặt hàng
            </button>
        </StyledCheckout>
    );
}
