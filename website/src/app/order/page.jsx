"use client";
import HomeFooter from "@/components/layouts/Home/Footer/HomeFooter";
import AddressCheckout from "@/components/layouts/Order/AddressCheckout";
import Checkout from "@/components/layouts/Order/Checkout";
import OrderContainer from "@/components/layouts/Order/OrderContainer";
import OrderCoupon from "@/components/layouts/Order/OrderCoupon";
import { Grid } from "@mui/material";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function OrderPage() {
    const searchParams = useSearchParams();
    const [cartItemIds, setCartItemIds] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const cartItemIds = searchParams.get("cartItemIds");
        const totalPrice = searchParams.get("totalPrice");

        let parsedCartItemIds = [];
        try {
            parsedCartItemIds = cartItemIds ? JSON.parse(cartItemIds) : [];
        } catch (e) {
            console.error("Error parsing cartItemIds:", e);
        }

        setCartItemIds(parsedCartItemIds);
        setTotalPrice(totalPrice);
    }, [searchParams]);

    const fakeData = [
        {
            id: 4,
            cart_id: 1,
            product_id: 20,
            quantity: 1,
            variants: "",
            price: 21000000,
            product: {
                id: 20,
                name: "[ TIKI TRỢ GIÁ ]Vali kéo Kiza KAMILIANT BY AMERICAN TOURISTER - MỸ : Thương hiệu Chính Hãng , bảo hành quốc tế trên 118 quốc gia",
                price: 20000000,
                discount: 30,
                short_desc: "Đây là chiếc điện thoại Iphone 14",
                detail: "Đây cũng là chiếc điện thoại Iphone 14",
                thumbnail:
                    "https://salt.tikicdn.com/cache/280x280/ts/product/88/5b/7f/1096df0853ef100b427ff58a032c3bdc.jpg.webp",
                quantity: 100,
                sold: 0,
                status: "in_stock",
                category_id: 5,
                seller_id: null,
                created_at: "2023-12-01T05:45:25.000000Z",
                updated_at: "2023-12-01T05:45:25.000000Z",
            },
        },
        {
            id: 5,
            cart_id: 1,
            product_id: 19,
            quantity: 1,
            variants: "",
            price: 21000000,
            product: {
                id: 19,
                name: "[ TRỢ GIÁ ]Vali kéo Kiza KAMILIANT BY AMERICAN TOURISTER - MỸ : Thương hiệu Chính Hãng , bảo hành quốc tế trên 118 quốc gia",
                price: 20000000,
                discount: 30,
                short_desc: "Đây là chiếc điện thoại Iphone 14",
                detail: "Đây cũng là chiếc điện thoại Iphone 14",
                thumbnail:
                    "https://salt.tikicdn.com/cache/280x280/ts/product/88/5b/7f/1096df0853ef100b427ff58a032c3bdc.jpg.webp",
                quantity: 100,
                sold: 0,
                status: "in_stock",
                category_id: 5,
                seller_id: null,
                created_at: "2023-11-26T08:33:02.000000Z",
                updated_at: "2023-11-26T08:33:02.000000Z",
            },
        },
        {
            id: 8,
            cart_id: 1,
            product_id: 22,
            quantity: 59,
            variants: '["Đỏ","4 inch"]',
            price: 1118000,
            product: {
                id: 22,
                name: "Ốp lưng kèm bàn phím ZAGG Messenger Folio 2 iPad 10.2/10.5",
                price: 988000,
                discount: 34,
                short_desc: "Đây là chiếc điện thoại Iphone 14",
                detail: "Tính năng: Thuộc thương hiệu ốp lưng bảo vệ cao cấp dành cho iPad đến từ Mỹ Thiết kế gọn nhẹ, linh hoạt, dễ dàng mang theo, hỗ trợ tối đa các chức năng khi sử dụng Sử dụng cho các dòng: iPad 10.2’’ (iPad gen 7th & 8th), iPad 10.5’’ (iPad Air 3rd gen) Chất liệu vải Fabric cao cấp tạo sự sang trọng, bảo vệ iPad khỏi các vết bẩn, vết trầy xước khi để thiết bị cùng với các vật dụng trong túi xách của bạn. Bàn phím có độ nảy tốt, êm ái, tốc độ ghi nhận nhanh giúp dễ dàng thao tác, sử dụng Thời lượng sử dụng pin lên tới 1 năm giữa các lần sạc Tích hợp cổng sạc Type C nạp nhanh năng lượng cho thiết bị Kết nối dễ dàng, nhanh chóng thông qua bluetooth Đế gập dựng linh hoạt giúp thay đổi ở nhiều góc nhìn, thoải mái khi đánh máy hay xem phim.",
                thumbnail:
                    "https://salt.tikicdn.com/cache/750x750/ts/product/45/e4/50/49b0abca428616dbd94a67dab20590cb.png.webp",
                quantity: 100,
                sold: 0,
                status: "in_stock",
                category_id: 5,
                seller_id: null,
                created_at: "2023-12-03T12:43:56.000000Z",
                updated_at: "2023-12-03T12:43:56.000000Z",
            },
        },
        {
            id: 9,
            cart_id: 1,
            product_id: 22,
            quantity: 4,
            variants: '["4 inch","Vàng"]',
            price: 1113000,
            product: {
                id: 22,
                name: "Ốp lưng kèm bàn phím ZAGG Messenger Folio 2 iPad 10.2/10.5",
                price: 988000,
                discount: 34,
                short_desc: "Đây là chiếc điện thoại Iphone 14",
                detail: "Tính năng: Thuộc thương hiệu ốp lưng bảo vệ cao cấp dành cho iPad đến từ Mỹ Thiết kế gọn nhẹ, linh hoạt, dễ dàng mang theo, hỗ trợ tối đa các chức năng khi sử dụng Sử dụng cho các dòng: iPad 10.2’’ (iPad gen 7th & 8th), iPad 10.5’’ (iPad Air 3rd gen) Chất liệu vải Fabric cao cấp tạo sự sang trọng, bảo vệ iPad khỏi các vết bẩn, vết trầy xước khi để thiết bị cùng với các vật dụng trong túi xách của bạn. Bàn phím có độ nảy tốt, êm ái, tốc độ ghi nhận nhanh giúp dễ dàng thao tác, sử dụng Thời lượng sử dụng pin lên tới 1 năm giữa các lần sạc Tích hợp cổng sạc Type C nạp nhanh năng lượng cho thiết bị Kết nối dễ dàng, nhanh chóng thông qua bluetooth Đế gập dựng linh hoạt giúp thay đổi ở nhiều góc nhìn, thoải mái khi đánh máy hay xem phim.",
                thumbnail:
                    "https://salt.tikicdn.com/cache/750x750/ts/product/45/e4/50/49b0abca428616dbd94a67dab20590cb.png.webp",
                quantity: 100,
                sold: 0,
                status: "in_stock",
                category_id: 5,
                seller_id: null,
                created_at: "2023-12-03T12:43:56.000000Z",
                updated_at: "2023-12-03T12:43:56.000000Z",
            },
        },
        {
            id: 11,
            cart_id: 1,
            product_id: 22,
            quantity: 5,
            variants: '["5 inch","Cam"]',
            price: 1153000,
            product: {
                id: 22,
                name: "Ốp lưng kèm bàn phím ZAGG Messenger Folio 2 iPad 10.2/10.5",
                price: 988000,
                discount: 34,
                short_desc: "Đây là chiếc điện thoại Iphone 14",
                detail: "Tính năng: Thuộc thương hiệu ốp lưng bảo vệ cao cấp dành cho iPad đến từ Mỹ Thiết kế gọn nhẹ, linh hoạt, dễ dàng mang theo, hỗ trợ tối đa các chức năng khi sử dụng Sử dụng cho các dòng: iPad 10.2’’ (iPad gen 7th & 8th), iPad 10.5’’ (iPad Air 3rd gen) Chất liệu vải Fabric cao cấp tạo sự sang trọng, bảo vệ iPad khỏi các vết bẩn, vết trầy xước khi để thiết bị cùng với các vật dụng trong túi xách của bạn. Bàn phím có độ nảy tốt, êm ái, tốc độ ghi nhận nhanh giúp dễ dàng thao tác, sử dụng Thời lượng sử dụng pin lên tới 1 năm giữa các lần sạc Tích hợp cổng sạc Type C nạp nhanh năng lượng cho thiết bị Kết nối dễ dàng, nhanh chóng thông qua bluetooth Đế gập dựng linh hoạt giúp thay đổi ở nhiều góc nhìn, thoải mái khi đánh máy hay xem phim.",
                thumbnail:
                    "https://salt.tikicdn.com/cache/750x750/ts/product/45/e4/50/49b0abca428616dbd94a67dab20590cb.png.webp",
                quantity: 100,
                sold: 0,
                status: "in_stock",
                category_id: 5,
                seller_id: null,
                created_at: "2023-12-03T12:43:56.000000Z",
                updated_at: "2023-12-03T12:43:56.000000Z",
            },
        },
        {
            id: 12,
            cart_id: 1,
            product_id: 22,
            quantity: 1,
            variants: '["5 inch","Vàng"]',
            price: 1138000,
            product: {
                id: 22,
                name: "Ốp lưng kèm bàn phím ZAGG Messenger Folio 2 iPad 10.2/10.5",
                price: 988000,
                discount: 34,
                short_desc: "Đây là chiếc điện thoại Iphone 14",
                detail: "Tính năng: Thuộc thương hiệu ốp lưng bảo vệ cao cấp dành cho iPad đến từ Mỹ Thiết kế gọn nhẹ, linh hoạt, dễ dàng mang theo, hỗ trợ tối đa các chức năng khi sử dụng Sử dụng cho các dòng: iPad 10.2’’ (iPad gen 7th & 8th), iPad 10.5’’ (iPad Air 3rd gen) Chất liệu vải Fabric cao cấp tạo sự sang trọng, bảo vệ iPad khỏi các vết bẩn, vết trầy xước khi để thiết bị cùng với các vật dụng trong túi xách của bạn. Bàn phím có độ nảy tốt, êm ái, tốc độ ghi nhận nhanh giúp dễ dàng thao tác, sử dụng Thời lượng sử dụng pin lên tới 1 năm giữa các lần sạc Tích hợp cổng sạc Type C nạp nhanh năng lượng cho thiết bị Kết nối dễ dàng, nhanh chóng thông qua bluetooth Đế gập dựng linh hoạt giúp thay đổi ở nhiều góc nhìn, thoải mái khi đánh máy hay xem phim.",
                thumbnail:
                    "https://salt.tikicdn.com/cache/750x750/ts/product/45/e4/50/49b0abca428616dbd94a67dab20590cb.png.webp",
                quantity: 100,
                sold: 0,
                status: "in_stock",
                category_id: 5,
                seller_id: null,
                created_at: "2023-12-03T12:43:56.000000Z",
                updated_at: "2023-12-03T12:43:56.000000Z",
            },
        },
        {
            id: 13,
            cart_id: 1,
            product_id: 15,
            quantity: 1,
            variants: "[]",
            price: 20000000,
            product: {
                id: 15,
                name: "Combo 2 Sữa dưỡng thể dưỡng sáng da tức thì VASELINE Healthy Bright Instant Radiance 350ML/chai",
                price: 20000000,
                discount: 30,
                short_desc: "Đây là chiếc điện thoại Iphone 14",
                detail: "Đây cũng là chiếc điện thoại Iphone 14",
                thumbnail:
                    "https://salt.tikicdn.com/cache/280x280/ts/product/8c/93/d5/50e72d58a2580bb4fdaf30c06dcdbda6.png.webp",
                quantity: 100,
                sold: 0,
                status: "in_stock",
                category_id: 4,
                seller_id: null,
                created_at: "2023-11-26T08:30:16.000000Z",
                updated_at: "2023-11-26T08:30:16.000000Z",
            },
        },
    ];

    const addressFake = [
        {
            id: 5,
            user_id: 14,
            name: "Nguyen Van A",
            phone: "0123456789",
            district_id: 30,
            province_id: 13,
            ward_id: 12,
            address_info: "123 Phố Xanh",
            default: 0,
            ward: null,
        },
        {
            id: 6,
            user_id: 14,
            name: "Phan Thanh Hóa",
            phone: "0833129021",
            district_id: 30,
            province_id: 13,
            ward_id: 31,
            address_info: "45/19 Nguyễn Viết Xuân",
            default: 1,
            ward: {
                id: 31,
                name: "Giảng Võ",
                type: "phuong",
                slug: "giang-vo",
                name_with_type: "Phường Giảng Võ",
                path: "Giảng Võ, Ba Đình, Hà Nội",
                path_with_type:
                    "Phường Giảng Võ, Quận Ba Đình, Thành phố Hà Nội",
                code: "00031",
                parent_code: "001",
            },
        },
        {
            id: 7,
            user_id: 14,
            name: "Phan Thanh Hóa",
            phone: "0833129021",
            district_id: null,
            province_id: null,
            ward_id: 34,
            address_info: "45/19 Nguyễn Viết Xuân",
            default: 0,
            ward: {
                id: 34,
                name: "Thành Công",
                type: "phuong",
                slug: "thanh-cong",
                name_with_type: "Phường Thành Công",
                path: "Thành Công, Ba Đình, Hà Nội",
                path_with_type:
                    "Phường Thành Công, Quận Ba Đình, Thành phố Hà Nội",
                code: "00034",
                parent_code: "001",
            },
        },
        {
            id: 8,
            user_id: 14,
            name: "Phan Thanh Hóa",
            phone: "0833129021",
            district_id: null,
            province_id: null,
            ward_id: 37,
            address_info: "45/19 Nguyễn Viết Xuân",
            default: 0,
            ward: {
                id: 37,
                name: "Phúc Tân",
                type: "phuong",
                slug: "phuc-tan",
                name_with_type: "Phường Phúc Tân",
                path: "Phúc Tân, Hoàn Kiếm, Hà Nội",
                path_with_type:
                    "Phường Phúc Tân, Quận Hoàn Kiếm, Thành phố Hà Nội",
                code: "00037",
                parent_code: "002",
            },
        },
    ];

    return (
        <>
            <div>
                <h4 style={{ width: "var(--max-width)", margin: "20px auto" }}>
                    THANH TOÁN
                </h4>
            </div>
            <div className="appContainer__checkout">
                <Grid container>
                    <Grid item xs={9}>
                        <OrderContainer data={fakeData} />
                    </Grid>
                    <Grid item xs={3}>
                        <AddressCheckout data={addressFake} />
                        <OrderCoupon />
                        <Checkout totalPrice={totalPrice} />
                    </Grid>
                </Grid>
            </div>
            <HomeFooter />
        </>
    );
}
