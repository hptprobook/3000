import ProductTab from "@/components/common/Tabs/ProductTab/ProductTab";
import React from "react";
import "./style.css";

export default function TopBrand() {
    const tabs = [
        {
            title: "Nhà sách Happy Live",
            products: [
                {
                    id: 1,
                    name: "Bí Mật Của Phan Thiên Ân",
                    rate: 5,
                    price: 245000,
                    imgUrl: "https://salt.tikicdn.com/cache/280x280/ts/product/68/54/9d/0be45a6ee47f6dd8ae8d55222378541d.jpg.webp",
                },
                {
                    id: 2,
                    name: "Bí Mật Của Phan Thiên Ân",
                    rate: 5,
                    price: 245000,
                    imgUrl: "https://salt.tikicdn.com/cache/280x280/ts/product/68/54/9d/0be45a6ee47f6dd8ae8d55222378541d.jpg.webp",
                },
                {
                    id: 3,
                    name: "Bí Mật Của Phan Thiên Ân",
                    rate: 5,
                    price: 245000,
                    imgUrl: "https://salt.tikicdn.com/cache/280x280/ts/product/68/54/9d/0be45a6ee47f6dd8ae8d55222378541d.jpg.webp",
                },
                {
                    id: 4,
                    name: "Bí Mật Của Phan Thiên Ân",
                    rate: 4,
                    price: 245000,
                    imgUrl: "https://salt.tikicdn.com/cache/280x280/ts/product/68/54/9d/0be45a6ee47f6dd8ae8d55222378541d.jpg.webp",
                },
                {
                    id: 5,
                    name: "Bí Mật Của Phan Thiên Ân",
                    rate: 3,
                    price: 245000,
                    imgUrl: "https://salt.tikicdn.com/cache/280x280/ts/product/68/54/9d/0be45a6ee47f6dd8ae8d55222378541d.jpg.webp",
                },
                {
                    id: 6,
                    name: "Bí Mật Của Phan Thiên Ân",
                    rate: 2,
                    price: 245000,
                    imgUrl: "https://salt.tikicdn.com/cache/280x280/ts/product/68/54/9d/0be45a6ee47f6dd8ae8d55222378541d.jpg.webp",
                },
                {
                    id: 7,
                    name: "Bí Mật Của Phan Thiên Ân",
                    rate: 5,
                    price: 245000,
                    imgUrl: "https://salt.tikicdn.com/cache/280x280/ts/product/68/54/9d/0be45a6ee47f6dd8ae8d55222378541d.jpg.webp",
                },
                {
                    id: 8,
                    name: "Bí Mật Của Phan Thiên Ân",
                    rate: 5,
                    price: 245000,
                    imgUrl: "https://salt.tikicdn.com/cache/280x280/ts/product/68/54/9d/0be45a6ee47f6dd8ae8d55222378541d.jpg.webp",
                },
                {
                    id: 9,
                    name: "Bí Mật Của Phan Thiên Ân",
                    rate: 5,
                    price: 245000,
                    imgUrl: "https://salt.tikicdn.com/cache/280x280/ts/product/68/54/9d/0be45a6ee47f6dd8ae8d55222378541d.jpg.webp",
                },
                {
                    id: 10,
                    name: "Bí Mật Của Phan Thiên Ân",
                    rate: 5,
                    price: 245000,
                    imgUrl: "https://salt.tikicdn.com/cache/280x280/ts/product/68/54/9d/0be45a6ee47f6dd8ae8d55222378541d.jpg.webp",
                },
            ],
        },
        {
            title: "Nestle",
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
            title: "Vinamilk",
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
            title: "Thời trang 5s",
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
        <div className="appContainer__topBrand">
            <h4>Thương hiệu nổi bật</h4>
            <ProductTab tabs={tabs} />
        </div>
    );
}
