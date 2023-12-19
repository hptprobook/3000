import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import { useCouponContext } from "@/provider/CouponContext";
import { useOrderAddressContext } from "@/provider/OrderAddressContext";
import { useDispatch } from "react-redux";
import { addOrder } from "@/redux/slices/orderSlice";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

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
    const { clearCoupon, coupon } = useCouponContext();
    const { selectAddress, selectedAddress } = useOrderAddressContext();
    let defaultAddress = "";
    const dispatch = useDispatch();
    const router = useRouter();

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
            if (coupon.type === "amount") {
                newDiscount = coupon.amount;
            } else if (coupon.type === "percent") {
                newDiscount = totalPrice * (coupon.amount / 100);
            } else if (coupon.type === "ship") {
                newDiscount = fee * (coupon.amount / 100);
            }
        }
        setDiscount(newDiscount);
        setFinalPrice(Number(totalPrice) + fee - newDiscount);
    }, [coupon, totalPrice, fee]);

    const handleSubmit = () => {
        dispatch(
            addOrder({
                cart_item_ids: cartItemIds,
                address_id: defaultAddress.id,
                total_amount: finalPrice,
                ship_fee: fee,
            })
        )
            .then(() => {
                toast.success("Đặt hàng thành công thành công", {
                    autoClose: 2000,
                });
                setTimeout(() => {
                    router.push("/profile/orders");
                }, 1000);
                clearCoupon();
            })
            .catch((error) => {
                toast.error(error);
            });
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
                    {fee && Number(fee).toLocaleString()}đ
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
                    {finalPrice.toLocaleString()}đ
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
