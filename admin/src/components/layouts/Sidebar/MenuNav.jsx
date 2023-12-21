import React from "react";
import { BiHomeSmile, BiSolidCoupon } from "react-icons/bi";
import { TbDeviceAnalytics } from "react-icons/tb";
import {
    MdLabel,
    MdOutlineAccountCircle,
    MdOutlineLabelImportant,
    MdOutlinePostAdd,
    MdOutlineSell,
    MdPayments,
    MdSettings,
    MdWebAsset,
} from "react-icons/md";
import { LuUsers2 } from "react-icons/lu";
import {
    HiMiniChatBubbleOvalLeftEllipsis,
    HiShoppingBag,
} from "react-icons/hi2";
import { HiMailOpen, HiOutlineLogout } from "react-icons/hi";
import { FaShoppingCart } from "react-icons/fa";

export function createList(label, key, link, icon, children) {
    return {
        key,
        icon,
        children,
        label,
        link,
    };
}

export function getMenuNav() {
    return [
        createList("", "menu1", null, "", [
            createList("Tổng quan", "overview", "/", <BiHomeSmile />),
            createList(
                "Phân tích",
                "analytics",
                "/analytics",
                <TbDeviceAnalytics />
            ),
            createList("Mail", "mail", "/mail", <HiMailOpen />),
            createList(
                "Chat",
                "chat",
                "/chat",
                <HiMiniChatBubbleOvalLeftEllipsis />
            ),
            createList("Bài viết", "post", "/post", <MdOutlinePostAdd />, [
                createList("Danh sách", "post-list", "/post/list"),
                createList("Tạo", "post-create", "/post/create"),
            ]),
        ]),
        createList("Bán hàng", "menu2", true, <MdOutlineSell />, [
            createList("Người dùng", "user", "/user/list", <LuUsers2 />),
            createList("Sản phẩm", "product", "/product", <HiShoppingBag />, [
                createList("Danh sách", "product-list", "/product/list"),
                createList("Tạo", "product-create", "/product/create"),
                createList("Kho", "product-warehouse", "/product/warehouse"),
            ]),
            createList(
                "Thuộc tính",
                "category",
                "/category",
                <MdOutlineLabelImportant />,
                [
                    createList("Phân loại", "category-list", "/category/list"),
                    createList(
                        "Thương hiệu",
                        "category-brand",
                        "/category/brand"
                    ),
                    createList(
                        "Nhãn sản phẩm",
                        "category-tag",
                        "/category/tag"
                    ),
                ]
            ),
            createList("Mã giảm giá", "coupon", "/coupon/list", <BiSolidCoupon />),
            createList("Đơn hàng", "order", "/order", <FaShoppingCart />),
        ]),
        createList("Trang web", "menu3", true, <MdWebAsset />, [
            createList("Payment", "payment", "/payment", <MdPayments />),
            createList("Cài đặt", "setting", "/setting", <MdSettings />, [
                createList("Tài khoản", "setting-account", "/setting/account"),
                createList("Trang Web", "setting-website", "/setting/website"),
            ]),
            createList("Đăng xuất", "logout", "/logout", <HiOutlineLogout />),
        ]),
    ];
}
