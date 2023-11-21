"use client";
import React from "react";
import "./style.css";
import PrimaryBtn from "@/components/common/Button/PrimaryButton/PrimaryBtn";
import Image from "next/image";
import Link from "next/link";

export default function Sidebar() {
    const categories = [
        {
            id: 1,
            icon: "https://salt.tikicdn.com/cache/100x100/ts/category/13/64/43/226301adcc7660ffcf44a61bb6df99b7.png.webp",
            text: "Đồ chơi Mẹ và bé",
        },
        {
            id: 2,
            icon: "https://salt.tikicdn.com/cache/100x100/ts/category/54/c0/ff/fe98a4afa2d3e5142dc8096addc4e40b.png.webp",
            text: "Điện thoại, máy tính bảng",
        },
        {
            id: 3,
            icon: "https://salt.tikicdn.com/cache/100x100/ts/category/73/0e/89/d7ca146de7198a6808580239e381a0c8.png.webp",
            text: "Làm đẹp - Sức khỏe",
        },
        {
            id: 4,
            icon: "https://salt.tikicdn.com/cache/100x100/ts/category/13/64/43/226301adcc7660ffcf44a61bb6df99b7.png.webp",
            text: "Đồ chơi Mẹ và bé",
        },
        {
            id: 5,
            icon: "https://salt.tikicdn.com/cache/100x100/ts/category/54/c0/ff/fe98a4afa2d3e5142dc8096addc4e40b.png.webp",
            text: "Điện thoại, máy tính bảng",
        },
        {
            id: 6,
            icon: "https://salt.tikicdn.com/cache/100x100/ts/category/73/0e/89/d7ca146de7198a6808580239e381a0c8.png.webp",
            text: "Làm đẹp - Sức khỏe",
        },
        {
            id: 7,
            icon: "https://salt.tikicdn.com/cache/100x100/ts/category/13/64/43/226301adcc7660ffcf44a61bb6df99b7.png.webp",
            text: "Đồ chơi Mẹ và bé",
        },
        {
            id: 8,
            icon: "https://salt.tikicdn.com/cache/100x100/ts/category/54/c0/ff/fe98a4afa2d3e5142dc8096addc4e40b.png.webp",
            text: "Điện thoại, máy tính bảng",
        },
        {
            id: 9,
            icon: "https://salt.tikicdn.com/cache/100x100/ts/category/73/0e/89/d7ca146de7198a6808580239e381a0c8.png.webp",
            text: "Làm đẹp - Sức khỏe",
        },
        {
            id: 10,
            icon: "https://salt.tikicdn.com/cache/100x100/ts/category/13/64/43/226301adcc7660ffcf44a61bb6df99b7.png.webp",
            text: "Đồ chơi Mẹ và bé",
        },
        {
            id: 11,
            icon: "https://salt.tikicdn.com/cache/100x100/ts/category/54/c0/ff/fe98a4afa2d3e5142dc8096addc4e40b.png.webp",
            text: "Điện thoại, máy tính bảng",
        },
        {
            id: 12,
            icon: "https://salt.tikicdn.com/cache/100x100/ts/category/73/0e/89/d7ca146de7198a6808580239e381a0c8.png.webp",
            text: "Làm đẹp - Sức khỏe",
        },
        {
            id: 13,
            icon: "https://salt.tikicdn.com/cache/100x100/ts/category/13/64/43/226301adcc7660ffcf44a61bb6df99b7.png.webp",
            text: "Đồ chơi Mẹ và bé",
        },
        {
            id: 14,
            icon: "https://salt.tikicdn.com/cache/100x100/ts/category/54/c0/ff/fe98a4afa2d3e5142dc8096addc4e40b.png.webp",
            text: "Điện thoại, máy tính bảng",
        },
        {
            id: 15,
            icon: "https://salt.tikicdn.com/cache/100x100/ts/category/73/0e/89/d7ca146de7198a6808580239e381a0c8.png.webp",
            text: "Làm đẹp - Sức khỏe",
        },
    ];

    const astras = [
        {
            icon: "https://salt.tikicdn.com/cache/100x100/ts/upload/cb/64/f7/0ebb0ae297f052e34a8161c9bf8efb96.png.webp",
            text: "Astra Reward",
        },
        {
            icon: "https://salt.tikicdn.com/cache/100x100/ts/upload/44/58/fc/804a2dfd610e9075ad5a8f0d13f2b21a.png.webp",
            text: "Tiki Exchange",
        },
        {
            icon: "https://salt.tikicdn.com/cache/100x100/ts/upload/7e/00/fe/a9798708549255148735ce9406fa7b4d.png.webp",
            text: "Tốt, nhanh",
        },
        {
            icon: "https://salt.tikicdn.com/cache/100x100/ts/upload/cb/64/f7/0ebb0ae297f052e34a8161c9bf8efb96.png.webp",
            text: "Astra Reward",
        },
        {
            icon: "https://salt.tikicdn.com/cache/100x100/ts/upload/44/58/fc/804a2dfd610e9075ad5a8f0d13f2b21a.png.webp",
            text: "Tiki Exchange",
        },
        {
            icon: "https://salt.tikicdn.com/cache/100x100/ts/upload/7e/00/fe/a9798708549255148735ce9406fa7b4d.png.webp",
            text: "Tốt, nhanh",
        },
        {
            icon: "https://salt.tikicdn.com/cache/100x100/ts/upload/cb/64/f7/0ebb0ae297f052e34a8161c9bf8efb96.png.webp",
            text: "Astra Reward",
        },
        {
            icon: "https://salt.tikicdn.com/cache/100x100/ts/upload/44/58/fc/804a2dfd610e9075ad5a8f0d13f2b21a.png.webp",
            text: "Tiki Exchange",
        },
        {
            icon: "https://salt.tikicdn.com/cache/100x100/ts/upload/7e/00/fe/a9798708549255148735ce9406fa7b4d.png.webp",
            text: "Tốt, nhanh",
        },
    ];

    return (
        <div className="appSidebar">
            <div className="appSidebar__categories">
                <h4>Danh mục</h4>

                {categories.map((category, i) => (
                    <Link href={`/category/${category.id}`}>
                        <PrimaryBtn
                            key={i}
                            icon={
                                <Image
                                    src={category.icon}
                                    width={32}
                                    height={32}
                                />
                            }
                            text={category.text}
                            fullWidth={true}
                        />
                    </Link>
                ))}
            </div>

            <div className="appSidebar__astra">
                <h4>Nổi bật</h4>
                {astras.map((astras, i) => (
                    <PrimaryBtn
                        key={i}
                        icon={
                            <Image src={astras.icon} width={32} height={32} />
                        }
                        text={astras.text}
                        fullWidth={true}
                    />
                ))}
            </div>

            <div className="appSidebar__astra">
                <PrimaryBtn
                    icon={
                        <Image
                            src={
                                "https://salt.tikicdn.com/cache/100x100/ts/upload/08/2f/14/fd9d34a8f9c4a76902649d04ccd9bbc5.png.webp"
                            }
                            width={32}
                            height={32}
                        />
                    }
                    text={"Bán hàng cùng 3000i"}
                    fullWidth={true}
                />
            </div>
        </div>
    );
}
