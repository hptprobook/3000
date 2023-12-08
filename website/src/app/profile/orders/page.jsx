"use client";
import React, { useState } from "react";

const fakeData = [
    {
        id: 4,
        user_id: 14,
        total_amount: 20000000,
        address_id: 5,
        status: "pending",
        note: null,
        created_at: "2023-12-04T07:59:38.000000Z",
        updated_at: "2023-12-04T07:59:38.000000Z",
        order_details: [
            {
                id: 3,
                order_id: 4,
                product_id: 21,
                quantity: 15,
                discount: "0",
                product: {
                    id: 21,
                    name: "[ TIKI TRỢ GIÁ ]Vali kéo Kiza KAMILIANT BY AMERICAN TOURISTER - MỸ : Thương hiệu Chính Hãng , bảo hành quốc tế trên 118 quốc gia",
                    price: 20000000,
                    discount: 30,
                    short_desc: "Đây là chiếc điện thoại Iphone 14",
                    detail: "Đây cũng là chiếc điện thoại Iphone 14",
                    thumbnail:
                        "https://salt.tikicdn.com/cache/280x280/ts/product/88/5b/7f/1096df0853ef100b427ff58a032c3bdc.jpg.webp",
                    quantity: 85,
                    sold: 0,
                    status: "in_stock",
                    category_id: 5,
                    seller_id: null,
                    created_at: "2023-12-01T05:50:38.000000Z",
                    updated_at: "2023-12-04T07:59:38.000000Z",
                },
            },
        ],
        address: {
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
    },
    {
        id: 5,
        user_id: 14,
        total_amount: 0,
        address_id: 4,
        status: "pending",
        note: null,
        created_at: "2023-12-06T15:03:49.000000Z",
        updated_at: "2023-12-06T15:03:49.000000Z",
        order_details: [],
        address: {
            id: 4,
            user_id: 13,
            name: "PHT",
            phone: "0833129021",
            district_id: 0,
            province_id: 0,
            ward_id: 0,
            address_info: "Nguyễn Viết Xuân",
            default: 0,
            ward: null,
        },
    },
    {
        id: 6,
        user_id: 14,
        total_amount: 4522000,
        address_id: 4,
        status: "pending",
        note: null,
        created_at: "2023-12-06T15:04:32.000000Z",
        updated_at: "2023-12-06T15:04:32.000000Z",
        order_details: [
            {
                id: 4,
                order_id: 6,
                product_id: 22,
                quantity: 59,
                discount: "0",
                product: {
                    id: 22,
                    name: "Ốp lưng kèm bàn phím ZAGG Messenger Folio 2 iPad 10.2/10.5",
                    price: 988000,
                    discount: 34,
                    short_desc: "Đây là chiếc điện thoại Iphone 14",
                    detail: "Tính năng: Thuộc thương hiệu ốp lưng bảo vệ cao cấp dành cho iPad đến từ Mỹ Thiết kế gọn nhẹ, linh hoạt, dễ dàng mang theo, hỗ trợ tối đa các chức năng khi sử dụng Sử dụng cho các dòng: iPad 10.2’’ (iPad gen 7th & 8th), iPad 10.5’’ (iPad Air 3rd gen) Chất liệu vải Fabric cao cấp tạo sự sang trọng, bảo vệ iPad khỏi các vết bẩn, vết trầy xước khi để thiết bị cùng với các vật dụng trong túi xách của bạn. Bàn phím có độ nảy tốt, êm ái, tốc độ ghi nhận nhanh giúp dễ dàng thao tác, sử dụng Thời lượng sử dụng pin lên tới 1 năm giữa các lần sạc Tích hợp cổng sạc Type C nạp nhanh năng lượng cho thiết bị Kết nối dễ dàng, nhanh chóng thông qua bluetooth Đế gập dựng linh hoạt giúp thay đổi ở nhiều góc nhìn, thoải mái khi đánh máy hay xem phim.",
                    thumbnail:
                        "https://salt.tikicdn.com/cache/750x750/ts/product/45/e4/50/49b0abca428616dbd94a67dab20590cb.png.webp",
                    quantity: 31,
                    sold: 0,
                    status: "in_stock",
                    category_id: 5,
                    seller_id: null,
                    created_at: "2023-12-03T12:43:56.000000Z",
                    updated_at: "2023-12-06T15:04:32.000000Z",
                },
            },
            {
                id: 5,
                order_id: 6,
                product_id: 22,
                quantity: 4,
                discount: "0",
                product: {
                    id: 22,
                    name: "Ốp lưng kèm bàn phím ZAGG Messenger Folio 2 iPad 10.2/10.5",
                    price: 988000,
                    discount: 34,
                    short_desc: "Đây là chiếc điện thoại Iphone 14",
                    detail: "Tính năng: Thuộc thương hiệu ốp lưng bảo vệ cao cấp dành cho iPad đến từ Mỹ Thiết kế gọn nhẹ, linh hoạt, dễ dàng mang theo, hỗ trợ tối đa các chức năng khi sử dụng Sử dụng cho các dòng: iPad 10.2’’ (iPad gen 7th & 8th), iPad 10.5’’ (iPad Air 3rd gen) Chất liệu vải Fabric cao cấp tạo sự sang trọng, bảo vệ iPad khỏi các vết bẩn, vết trầy xước khi để thiết bị cùng với các vật dụng trong túi xách của bạn. Bàn phím có độ nảy tốt, êm ái, tốc độ ghi nhận nhanh giúp dễ dàng thao tác, sử dụng Thời lượng sử dụng pin lên tới 1 năm giữa các lần sạc Tích hợp cổng sạc Type C nạp nhanh năng lượng cho thiết bị Kết nối dễ dàng, nhanh chóng thông qua bluetooth Đế gập dựng linh hoạt giúp thay đổi ở nhiều góc nhìn, thoải mái khi đánh máy hay xem phim.",
                    thumbnail:
                        "https://salt.tikicdn.com/cache/750x750/ts/product/45/e4/50/49b0abca428616dbd94a67dab20590cb.png.webp",
                    quantity: 31,
                    sold: 0,
                    status: "in_stock",
                    category_id: 5,
                    seller_id: null,
                    created_at: "2023-12-03T12:43:56.000000Z",
                    updated_at: "2023-12-06T15:04:32.000000Z",
                },
            },
            {
                id: 6,
                order_id: 6,
                product_id: 22,
                quantity: 5,
                discount: "0",
                product: {
                    id: 22,
                    name: "Ốp lưng kèm bàn phím ZAGG Messenger Folio 2 iPad 10.2/10.5",
                    price: 988000,
                    discount: 34,
                    short_desc: "Đây là chiếc điện thoại Iphone 14",
                    detail: "Tính năng: Thuộc thương hiệu ốp lưng bảo vệ cao cấp dành cho iPad đến từ Mỹ Thiết kế gọn nhẹ, linh hoạt, dễ dàng mang theo, hỗ trợ tối đa các chức năng khi sử dụng Sử dụng cho các dòng: iPad 10.2’’ (iPad gen 7th & 8th), iPad 10.5’’ (iPad Air 3rd gen) Chất liệu vải Fabric cao cấp tạo sự sang trọng, bảo vệ iPad khỏi các vết bẩn, vết trầy xước khi để thiết bị cùng với các vật dụng trong túi xách của bạn. Bàn phím có độ nảy tốt, êm ái, tốc độ ghi nhận nhanh giúp dễ dàng thao tác, sử dụng Thời lượng sử dụng pin lên tới 1 năm giữa các lần sạc Tích hợp cổng sạc Type C nạp nhanh năng lượng cho thiết bị Kết nối dễ dàng, nhanh chóng thông qua bluetooth Đế gập dựng linh hoạt giúp thay đổi ở nhiều góc nhìn, thoải mái khi đánh máy hay xem phim.",
                    thumbnail:
                        "https://salt.tikicdn.com/cache/750x750/ts/product/45/e4/50/49b0abca428616dbd94a67dab20590cb.png.webp",
                    quantity: 31,
                    sold: 0,
                    status: "in_stock",
                    category_id: 5,
                    seller_id: null,
                    created_at: "2023-12-03T12:43:56.000000Z",
                    updated_at: "2023-12-06T15:04:32.000000Z",
                },
            },
            {
                id: 7,
                order_id: 6,
                product_id: 22,
                quantity: 1,
                discount: "0",
                product: {
                    id: 22,
                    name: "Ốp lưng kèm bàn phím ZAGG Messenger Folio 2 iPad 10.2/10.5",
                    price: 988000,
                    discount: 34,
                    short_desc: "Đây là chiếc điện thoại Iphone 14",
                    detail: "Tính năng: Thuộc thương hiệu ốp lưng bảo vệ cao cấp dành cho iPad đến từ Mỹ Thiết kế gọn nhẹ, linh hoạt, dễ dàng mang theo, hỗ trợ tối đa các chức năng khi sử dụng Sử dụng cho các dòng: iPad 10.2’’ (iPad gen 7th & 8th), iPad 10.5’’ (iPad Air 3rd gen) Chất liệu vải Fabric cao cấp tạo sự sang trọng, bảo vệ iPad khỏi các vết bẩn, vết trầy xước khi để thiết bị cùng với các vật dụng trong túi xách của bạn. Bàn phím có độ nảy tốt, êm ái, tốc độ ghi nhận nhanh giúp dễ dàng thao tác, sử dụng Thời lượng sử dụng pin lên tới 1 năm giữa các lần sạc Tích hợp cổng sạc Type C nạp nhanh năng lượng cho thiết bị Kết nối dễ dàng, nhanh chóng thông qua bluetooth Đế gập dựng linh hoạt giúp thay đổi ở nhiều góc nhìn, thoải mái khi đánh máy hay xem phim.",
                    thumbnail:
                        "https://salt.tikicdn.com/cache/750x750/ts/product/45/e4/50/49b0abca428616dbd94a67dab20590cb.png.webp",
                    quantity: 31,
                    sold: 0,
                    status: "in_stock",
                    category_id: 5,
                    seller_id: null,
                    created_at: "2023-12-03T12:43:56.000000Z",
                    updated_at: "2023-12-06T15:04:32.000000Z",
                },
            },
        ],
        address: {
            id: 4,
            user_id: 13,
            name: "PHT",
            phone: "0833129021",
            district_id: 0,
            province_id: 0,
            ward_id: 0,
            address_info: "Nguyễn Viết Xuân",
            default: 0,
            ward: null,
        },
    },
];

export default function ProfileOrder() {
    const [activeTab, setActiveTab] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");

    const tabs = [
        { status: "all", text: "Tất cả" },
        { status: "pending", text: "Chờ thanh toán" },
        { status: "processing", text: "Đang xử lý" },
        { status: "delivering", text: "Đang giao hàng" },
        { status: "received", text: "Đã nhận hàng" },
        { status: "cancelled", text: "Đã hủy" },
    ];

    const filterOrders = () => {
        return fakeData.filter((order) => {
            if (activeTab !== "all" && order.status !== activeTab) {
                return false;
            }

            if (searchTerm) {
                return order.order_details.some(
                    (detail) =>
                        detail.product &&
                        detail.product.name
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                );
            }

            return true;
        });
    };

    return (
        <div>
            <div>
                {tabs.map((tab) => (
                    <button
                        key={tab.status}
                        onClick={() => setActiveTab(tab.status)}
                    >
                        {tab.text}
                    </button>
                ))}
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Search by product name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div>
                {filterOrders().map((order) => (
                    <div key={order.id}>
                        <p>Order ID: {order.id}</p>
                        <ul>
                            {order.order_details.map((detail) => (
                                <li key={detail.id}>{detail.product.name}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}
