import React, { useEffect, useState } from "react";
import "./style.css";
import ProductTab from "@/components/common/Tabs/ProductTab/ProductTab";

export default function BestSeller() {
    const tabs = [
        {
            title: "Sinh lý nam",
            products: [
                {
                    id: 1,
                    name: "Tinh chất hàu New Zealand Good Health Oyster Plus tăng cường sinh lý nam giới | 3wolves",
                    rate: 5,
                    price: 245000,
                    imgUrl: "https://salt.tikicdn.com/cache/280x280/ts/product/dc/f9/25/5c9de14acfd98defbad87450077c1752.jpg.webp",
                },
                {
                    id: 2,
                    name: "Tinh chất hàu New Zealand Good Health Oyster Plus tăng cường sinh lý nam giới | 3wolves",
                    rate: 5,
                    price: 245000,
                    imgUrl: "https://salt.tikicdn.com/cache/280x280/ts/product/dc/f9/25/5c9de14acfd98defbad87450077c1752.jpg.webp",
                },
                {
                    id: 3,
                    name: "Tinh chất hàu New Zealand Good Health Oyster Plus tăng cường sinh lý nam giới | 3wolves",
                    rate: 5,
                    price: 245000,
                    imgUrl: "https://salt.tikicdn.com/cache/280x280/ts/product/dc/f9/25/5c9de14acfd98defbad87450077c1752.jpg.webp",
                },
                {
                    id: 4,
                    name: "Tinh chất hàu New Zealand Good Health Oyster Plus tăng cường sinh lý nam giới | 3wolves",
                    rate: 4,
                    price: 245000,
                    imgUrl: "https://salt.tikicdn.com/cache/280x280/ts/product/dc/f9/25/5c9de14acfd98defbad87450077c1752.jpg.webp",
                },
                {
                    id: 5,
                    name: "Tinh chất hàu New Zealand Good Health Oyster Plus tăng cường sinh lý nam giới | 3wolves",
                    rate: 3,
                    price: 245000,
                    imgUrl: "https://salt.tikicdn.com/cache/280x280/ts/product/dc/f9/25/5c9de14acfd98defbad87450077c1752.jpg.webp",
                },
                {
                    id: 6,
                    name: "Tinh chất hàu New Zealand Good Health Oyster Plus tăng cường sinh lý nam giới | 3wolves",
                    rate: 2,
                    price: 245000,
                    imgUrl: "https://salt.tikicdn.com/cache/280x280/ts/product/dc/f9/25/5c9de14acfd98defbad87450077c1752.jpg.webp",
                },
                {
                    id: 7,
                    name: "Tinh chất hàu New Zealand Good Health Oyster Plus tăng cường sinh lý nam giới | 3wolves",
                    rate: 5,
                    price: 245000,
                    imgUrl: "https://salt.tikicdn.com/cache/280x280/ts/product/dc/f9/25/5c9de14acfd98defbad87450077c1752.jpg.webp",
                },
                {
                    id: 8,
                    name: "Tinh chất hàu New Zealand Good Health Oyster Plus tăng cường sinh lý nam giới | 3wolves",
                    rate: 5,
                    price: 245000,
                    imgUrl: "https://salt.tikicdn.com/cache/280x280/ts/product/dc/f9/25/5c9de14acfd98defbad87450077c1752.jpg.webp",
                },
                {
                    id: 9,
                    name: "Tinh chất hàu New Zealand Good Health Oyster Plus tăng cường sinh lý nam giới | 3wolves",
                    rate: 5,
                    price: 245000,
                    imgUrl: "https://salt.tikicdn.com/cache/280x280/ts/product/dc/f9/25/5c9de14acfd98defbad87450077c1752.jpg.webp",
                },
                {
                    id: 10,
                    name: "Tinh chất hàu New Zealand Good Health Oyster Plus tăng cường sinh lý nam giới | 3wolves",
                    rate: 5,
                    price: 245000,
                    imgUrl: "https://salt.tikicdn.com/cache/280x280/ts/product/dc/f9/25/5c9de14acfd98defbad87450077c1752.jpg.webp",
                },
            ],
        },
        {
            title: "Phụ kiện thể thao khác",
            products: [
                {
                    id: 1,
                    name: "Tăng Cường Sinh Lý Nam Supo Maca Genki Fami Nhật Bản, Chiết Xuất Nhân Sâm, Baba, Hàu Biển - Hộp 90 viên",
                    rate: 5,
                    price: 245000,
                    imgUrl: "https://salt.tikicdn.com/cache/280x280/ts/product/dd/1f/c5/18b4aab83a3e47799e355221fc97c7e5.jpg.webp",
                },
                {
                    id: 2,
                    name: "Tăng Cường Sinh Lý Nam Supo Maca Genki Fami Nhật Bản, Chiết Xuất Nhân Sâm, Baba, Hàu Biển - Hộp 90 viên",
                    rate: 5,
                    price: 245000,
                    imgUrl: "https://salt.tikicdn.com/cache/280x280/ts/product/dd/1f/c5/18b4aab83a3e47799e355221fc97c7e5.jpg.webp",
                },
            ],
        },
        {
            title: "Bàn ghế làm việc",
            products: [
                {
                    id: 3,
                    name: "Bàn tăng giảm nâng hạ chiều cao thông minh iCockpit 1460, nâng hạ 80 kg, tặng móc treo tai nghe, giá để ly nước, thảm lót chuột",
                    rate: 5,
                    price: 245000,
                    imgUrl: "https://salt.tikicdn.com/cache/280x280/ts/product/0d/51/1e/4e547d07c93eb5527f067063691dccc6.jpg.webp",
                },
            ],
        },
        {
            title: "Nồi chiên",
            products: [
                {
                    id: 4,
                    name: "Nồi Chiên Không Dầu Điện Tử Lock&Lock EJF357BLK (5.2 Lít) - Hàng Chính Hãng",
                    rate: 5,
                    price: 245000,
                    imgUrl: "https://salt.tikicdn.com/cache/280x280/ts/product/f6/1a/e5/a74a03ec03cce80bfceb6be69af2820d.jpg.webp",
                },
            ],
        },
    ];

    return (
        <div className="appContainer__bestSeller">
            <h4>Sản phẩm bán chạy</h4>
            <ProductTab tabs={tabs} />
        </div>
    );
}
