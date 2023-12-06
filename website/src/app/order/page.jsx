"use client";
import HomeFooter from "@/components/layouts/Home/Footer/HomeFooter";
import AddressCheckout from "@/components/layouts/Order/AddressCheckout";
import OrderContainer from "@/components/layouts/Order/OrderContainer";
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
    const provinces = [
        {
            id: 1,
            name: "Hà Nội",
            slug: "ha-noi",
            type: "thanh-pho",
            name_with_type: "Thành phố Hà Nội",
            code: "01",
        },
        {
            id: 2,
            name: "Hà Giang",
            slug: "ha-giang",
            type: "tinh",
            name_with_type: "Tỉnh Hà Giang",
            code: "02",
        },
        {
            id: 4,
            name: "Cao Bằng",
            slug: "cao-bang",
            type: "tinh",
            name_with_type: "Tỉnh Cao Bằng",
            code: "04",
        },
        {
            id: 6,
            name: "Bắc Kạn",
            slug: "bac-kan",
            type: "tinh",
            name_with_type: "Tỉnh Bắc Kạn",
            code: "06",
        },
        {
            id: 8,
            name: "Tuyên Quang",
            slug: "tuyen-quang",
            type: "tinh",
            name_with_type: "Tỉnh Tuyên Quang",
            code: "08",
        },
        {
            id: 10,
            name: "Lào Cai",
            slug: "lao-cai",
            type: "tinh",
            name_with_type: "Tỉnh Lào Cai",
            code: "10",
        },
        {
            id: 11,
            name: "Điện Biên",
            slug: "dien-bien",
            type: "tinh",
            name_with_type: "Tỉnh Điện Biên",
            code: "11",
        },
        {
            id: 12,
            name: "Lai Châu",
            slug: "lai-chau",
            type: "tinh",
            name_with_type: "Tỉnh Lai Châu",
            code: "12",
        },
        {
            id: 14,
            name: "Sơn La",
            slug: "son-la",
            type: "tinh",
            name_with_type: "Tỉnh Sơn La",
            code: "14",
        },
        {
            id: 15,
            name: "Yên Bái",
            slug: "yen-bai",
            type: "tinh",
            name_with_type: "Tỉnh Yên Bái",
            code: "15",
        },
        {
            id: 17,
            name: "Hoà Bình",
            slug: "hoa-binh",
            type: "tinh",
            name_with_type: "Tỉnh Hoà Bình",
            code: "17",
        },
        {
            id: 19,
            name: "Thái Nguyên",
            slug: "thai-nguyen",
            type: "tinh",
            name_with_type: "Tỉnh Thái Nguyên",
            code: "19",
        },
        {
            id: 20,
            name: "Lạng Sơn",
            slug: "lang-son",
            type: "tinh",
            name_with_type: "Tỉnh Lạng Sơn",
            code: "20",
        },
        {
            id: 22,
            name: "Quảng Ninh",
            slug: "quang-ninh",
            type: "tinh",
            name_with_type: "Tỉnh Quảng Ninh",
            code: "22",
        },
        {
            id: 24,
            name: "Bắc Giang",
            slug: "bac-giang",
            type: "tinh",
            name_with_type: "Tỉnh Bắc Giang",
            code: "24",
        },
        {
            id: 25,
            name: "Phú Thọ",
            slug: "phu-tho",
            type: "tinh",
            name_with_type: "Tỉnh Phú Thọ",
            code: "25",
        },
        {
            id: 26,
            name: "Vĩnh Phúc",
            slug: "vinh-phuc",
            type: "tinh",
            name_with_type: "Tỉnh Vĩnh Phúc",
            code: "26",
        },
        {
            id: 27,
            name: "Bắc Ninh",
            slug: "bac-ninh",
            type: "tinh",
            name_with_type: "Tỉnh Bắc Ninh",
            code: "27",
        },
        {
            id: 30,
            name: "Hải Dương",
            slug: "hai-duong",
            type: "tinh",
            name_with_type: "Tỉnh Hải Dương",
            code: "30",
        },
        {
            id: 31,
            name: "Hải Phòng",
            slug: "hai-phong",
            type: "thanh-pho",
            name_with_type: "Thành phố Hải Phòng",
            code: "31",
        },
        {
            id: 33,
            name: "Hưng Yên",
            slug: "hung-yen",
            type: "tinh",
            name_with_type: "Tỉnh Hưng Yên",
            code: "33",
        },
        {
            id: 34,
            name: "Thái Bình",
            slug: "thai-binh",
            type: "tinh",
            name_with_type: "Tỉnh Thái Bình",
            code: "34",
        },
        {
            id: 35,
            name: "Hà Nam",
            slug: "ha-nam",
            type: "tinh",
            name_with_type: "Tỉnh Hà Nam",
            code: "35",
        },
        {
            id: 36,
            name: "Nam Định",
            slug: "nam-dinh",
            type: "tinh",
            name_with_type: "Tỉnh Nam Định",
            code: "36",
        },
        {
            id: 37,
            name: "Ninh Bình",
            slug: "ninh-binh",
            type: "tinh",
            name_with_type: "Tỉnh Ninh Bình",
            code: "37",
        },
        {
            id: 38,
            name: "Thanh Hóa",
            slug: "thanh-hoa",
            type: "tinh",
            name_with_type: "Tỉnh Thanh Hóa",
            code: "38",
        },
        {
            id: 40,
            name: "Nghệ An",
            slug: "nghe-an",
            type: "tinh",
            name_with_type: "Tỉnh Nghệ An",
            code: "40",
        },
        {
            id: 42,
            name: "Hà Tĩnh",
            slug: "ha-tinh",
            type: "tinh",
            name_with_type: "Tỉnh Hà Tĩnh",
            code: "42",
        },
        {
            id: 44,
            name: "Quảng Bình",
            slug: "quang-binh",
            type: "tinh",
            name_with_type: "Tỉnh Quảng Bình",
            code: "44",
        },
        {
            id: 45,
            name: "Quảng Trị",
            slug: "quang-tri",
            type: "tinh",
            name_with_type: "Tỉnh Quảng Trị",
            code: "45",
        },
        {
            id: 46,
            name: "Thừa Thiên Huế",
            slug: "thua-thien-hue",
            type: "tinh",
            name_with_type: "Tỉnh Thừa Thiên Huế",
            code: "46",
        },
        {
            id: 48,
            name: "Đà Nẵng",
            slug: "da-nang",
            type: "thanh-pho",
            name_with_type: "Thành phố Đà Nẵng",
            code: "48",
        },
        {
            id: 49,
            name: "Quảng Nam",
            slug: "quang-nam",
            type: "tinh",
            name_with_type: "Tỉnh Quảng Nam",
            code: "49",
        },
        {
            id: 51,
            name: "Quảng Ngãi",
            slug: "quang-ngai",
            type: "tinh",
            name_with_type: "Tỉnh Quảng Ngãi",
            code: "51",
        },
        {
            id: 52,
            name: "Bình Định",
            slug: "binh-dinh",
            type: "tinh",
            name_with_type: "Tỉnh Bình Định",
            code: "52",
        },
        {
            id: 54,
            name: "Phú Yên",
            slug: "phu-yen",
            type: "tinh",
            name_with_type: "Tỉnh Phú Yên",
            code: "54",
        },
        {
            id: 56,
            name: "Khánh Hòa",
            slug: "khanh-hoa",
            type: "tinh",
            name_with_type: "Tỉnh Khánh Hòa",
            code: "56",
        },
        {
            id: 58,
            name: "Ninh Thuận",
            slug: "ninh-thuan",
            type: "tinh",
            name_with_type: "Tỉnh Ninh Thuận",
            code: "58",
        },
        {
            id: 60,
            name: "Bình Thuận",
            slug: "binh-thuan",
            type: "tinh",
            name_with_type: "Tỉnh Bình Thuận",
            code: "60",
        },
        {
            id: 62,
            name: "Kon Tum",
            slug: "kon-tum",
            type: "tinh",
            name_with_type: "Tỉnh Kon Tum",
            code: "62",
        },
        {
            id: 64,
            name: "Gia Lai",
            slug: "gia-lai",
            type: "tinh",
            name_with_type: "Tỉnh Gia Lai",
            code: "64",
        },
        {
            id: 66,
            name: "Đắk Lắk",
            slug: "dak-lak",
            type: "tinh",
            name_with_type: "Tỉnh Đắk Lắk",
            code: "66",
        },
        {
            id: 67,
            name: "Đắk Nông",
            slug: "dak-nong",
            type: "tinh",
            name_with_type: "Tỉnh Đắk Nông",
            code: "67",
        },
        {
            id: 68,
            name: "Lâm Đồng",
            slug: "lam-dong",
            type: "tinh",
            name_with_type: "Tỉnh Lâm Đồng",
            code: "68",
        },
        {
            id: 70,
            name: "Bình Phước",
            slug: "binh-phuoc",
            type: "tinh",
            name_with_type: "Tỉnh Bình Phước",
            code: "70",
        },
        {
            id: 72,
            name: "Tây Ninh",
            slug: "tay-ninh",
            type: "tinh",
            name_with_type: "Tỉnh Tây Ninh",
            code: "72",
        },
        {
            id: 74,
            name: "Bình Dương",
            slug: "binh-duong",
            type: "tinh",
            name_with_type: "Tỉnh Bình Dương",
            code: "74",
        },
        {
            id: 75,
            name: "Đồng Nai",
            slug: "dong-nai",
            type: "tinh",
            name_with_type: "Tỉnh Đồng Nai",
            code: "75",
        },
        {
            id: 77,
            name: "Bà Rịa - Vũng Tàu",
            slug: "ba-ria-vung-tau",
            type: "tinh",
            name_with_type: "Tỉnh Bà Rịa - Vũng Tàu",
            code: "77",
        },
        {
            id: 79,
            name: "Hồ Chí Minh",
            slug: "ho-chi-minh",
            type: "thanh-pho",
            name_with_type: "Thành phố Hồ Chí Minh",
            code: "79",
        },
        {
            id: 80,
            name: "Long An",
            slug: "long-an",
            type: "tinh",
            name_with_type: "Tỉnh Long An",
            code: "80",
        },
        {
            id: 82,
            name: "Tiền Giang",
            slug: "tien-giang",
            type: "tinh",
            name_with_type: "Tỉnh Tiền Giang",
            code: "82",
        },
        {
            id: 83,
            name: "Bến Tre",
            slug: "ben-tre",
            type: "tinh",
            name_with_type: "Tỉnh Bến Tre",
            code: "83",
        },
        {
            id: 84,
            name: "Trà Vinh",
            slug: "tra-vinh",
            type: "tinh",
            name_with_type: "Tỉnh Trà Vinh",
            code: "84",
        },
        {
            id: 86,
            name: "Vĩnh Long",
            slug: "vinh-long",
            type: "tinh",
            name_with_type: "Tỉnh Vĩnh Long",
            code: "86",
        },
        {
            id: 87,
            name: "Đồng Tháp",
            slug: "dong-thap",
            type: "tinh",
            name_with_type: "Tỉnh Đồng Tháp",
            code: "87",
        },
        {
            id: 89,
            name: "An Giang",
            slug: "an-giang",
            type: "tinh",
            name_with_type: "Tỉnh An Giang",
            code: "89",
        },
        {
            id: 91,
            name: "Kiên Giang",
            slug: "kien-giang",
            type: "tinh",
            name_with_type: "Tỉnh Kiên Giang",
            code: "91",
        },
        {
            id: 92,
            name: "Cần Thơ",
            slug: "can-tho",
            type: "thanh-pho",
            name_with_type: "Thành phố Cần Thơ",
            code: "92",
        },
        {
            id: 93,
            name: "Hậu Giang",
            slug: "hau-giang",
            type: "tinh",
            name_with_type: "Tỉnh Hậu Giang",
            code: "93",
        },
        {
            id: 94,
            name: "Sóc Trăng",
            slug: "soc-trang",
            type: "tinh",
            name_with_type: "Tỉnh Sóc Trăng",
            code: "94",
        },
        {
            id: 95,
            name: "Bạc Liêu",
            slug: "bac-lieu",
            type: "tinh",
            name_with_type: "Tỉnh Bạc Liêu",
            code: "95",
        },
        {
            id: 96,
            name: "Cà Mau",
            slug: "ca-mau",
            type: "tinh",
            name_with_type: "Tỉnh Cà Mau",
            code: "96",
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
                    <Grid item xs={5}>
                        <OrderContainer data={fakeData} />
                    </Grid>
                    <Grid item xs={7}>
                        <AddressCheckout provinces={provinces} />
                    </Grid>
                </Grid>
            </div>
            <HomeFooter />
        </>
    );
}
