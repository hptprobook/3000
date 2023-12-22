"use client";
import React, { useEffect, useState } from "react";
import "./style.css";
import PrimaryBtn from "@/components/common/Button/PrimaryButton/PrimaryBtn";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { fetchParentCategory } from "@/redux/slices/categorySlice";
import { generateCategoryHref } from "@/utils/generateHref";

export default function Sidebar() {
    const astras = [
        {
            icon: "https://salt.tikicdn.com/cache/100x100/ts/upload/cb/64/f7/0ebb0ae297f052e34a8161c9bf8efb96.png.webp",
            text: "Astra Reward",
        },
        {
            icon: "https://salt.tikicdn.com/cache/100x100/ts/upload/44/58/fc/804a2dfd610e9075ad5a8f0d13f2b21a.png.webp",
            text: "3000 Exchange",
        },
        {
            icon: "https://salt.tikicdn.com/cache/100x100/ts/upload/7e/00/fe/a9798708549255148735ce9406fa7b4d.png.webp",
            text: "Tốt, nhanh",
        },
        {
            icon: "https://salt.tikicdn.com/cache/100x100/ts/upload/ae/72/a3/d4503c3ece932dc8c57d2d5c97cd6ffc.png.webp",
            text: "Giá rẻ mỗi ngày",
        },
        {
            icon: "https://salt.tikicdn.com/cache/100x100/ts/upload/3c/ce/96/db8c083610e45b78d8f7662f0013faa8.png.webp",
            text: "Xả kho",
        },
        {
            icon: "https://salt.tikicdn.com/cache/100x100/ts/upload/20/68/cf/6d4adbdbcd1c35b0a438a655d9a420d0.png.webp",
            text: "Mã giảm giá",
        },
        {
            icon: "https://salt.tikicdn.com/cache/100x100/ts/upload/1e/27/a7/e2c0e40b6dc45a3b5b0a8e59e2536f23.png.webp",
            text: "Ưu đãi thẻ - ví",
        },
        {
            icon: "https://salt.tikicdn.com/cache/100x100/ts/tmp/6f/4e/41/93f72f323d5b42207ab851dfa39d44fb.png.webp",
            text: "Mua trước trả sau",
        },
    ];

    const dispatch = useDispatch();
    const [loadData, setLoadData] = useState(false);
    const { parentCategories, loading, error } = useSelector(
        (state) => state.categories
    );

    useEffect(() => {
        if (!loadData && parentCategories.length === 0) {
            dispatch(fetchParentCategory());
            setLoadData(true);
        }
    }, [loadData, parentCategories]);

    return (
        <div className="appSidebar">
            <div className="appSidebar__categories">
                <h4>Danh mục</h4>
                {parentCategories.map((category) => (
                    <Link
                        href={generateCategoryHref(
                            category?.name,
                            category?.id
                        )}
                        key={category?.id}
                    >
                        <PrimaryBtn
                            icon={
                                <Image
                                    src={category?.icon_url}
                                    alt={category?.name}
                                    width={32}
                                    height={32}
                                />
                            }
                            text={category?.name}
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
                            <Image
                                alt={astras.text}
                                src={astras.icon}
                                width={32}
                                height={32}
                            />
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
                            alt="Bán hàng cùng 3000"
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
