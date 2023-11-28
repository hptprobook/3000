"use client";
import ProductTab from "@/components/common/Tabs/ProductTab/ProductTab";
import React, { useEffect, useState } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecommendedCategory } from "@/redux/slices/categorySlice";

export default function RecommendedProduct() {
    const tabs = [
        {
            title: "Ổ cắm, ổn áp, biến áp",
            products: [
                {
                    id: 1,
                    name: "Ổ điện cao cấp đa năng",
                    rate: 5,
                    price: 245000,
                    imgUrl: "https://salt.tikicdn.com/cache/280x280/ts/product/78/67/f0/feb8cb762a8506f9bc75c350325d90e1.jpg.webp",
                },
                {
                    id: 2,
                    name: "Ổ điện cao cấp đa năng, thông minh 4 cổng USB, 3 cổng AC 220V OLAPLE an toàn chống giật, chống cháy nổ an toàn - Hàng nhập khẩu",
                    rate: 5,
                    price: 245000,
                    imgUrl: "https://salt.tikicdn.com/cache/280x280/ts/product/78/67/f0/feb8cb762a8506f9bc75c350325d90e1.jpg.webp",
                },
                {
                    id: 3,
                    name: "Ổ điện cao cấp đa năng, thông minh 4 cổng USB, 3 cổng AC 220V OLAPLE an toàn chống giật, chống cháy nổ an toàn - Hàng nhập khẩu",
                    rate: 5,
                    price: 245000,
                    imgUrl: "https://salt.tikicdn.com/cache/280x280/ts/product/78/67/f0/feb8cb762a8506f9bc75c350325d90e1.jpg.webp",
                },
                {
                    id: 4,
                    name: "Ổ điện cao cấp đa năng, thông minh 4 cổng USB, 3 cổng AC 220V OLAPLE an toàn chống giật, chống cháy nổ an toàn - Hàng nhập khẩu",
                    rate: 4,
                    price: 245000,
                    imgUrl: "https://salt.tikicdn.com/cache/280x280/ts/product/78/67/f0/feb8cb762a8506f9bc75c350325d90e1.jpg.webp",
                },
                {
                    id: 5,
                    name: "Ổ điện cao cấp đa năng, thông minh 4 cổng USB, 3 cổng AC 220V OLAPLE an toàn chống giật, chống cháy nổ an toàn - Hàng nhập khẩu",
                    rate: 3,
                    price: 245000,
                    imgUrl: "https://salt.tikicdn.com/cache/280x280/ts/product/78/67/f0/feb8cb762a8506f9bc75c350325d90e1.jpg.webp",
                },
                {
                    id: 6,
                    name: "Ổ điện cao cấp đa năng, thông minh 4 cổng USB, 3 cổng AC 220V OLAPLE an toàn chống giật, chống cháy nổ an toàn - Hàng nhập khẩu",
                    rate: 2,
                    price: 245000,
                    imgUrl: "https://salt.tikicdn.com/cache/280x280/ts/product/78/67/f0/feb8cb762a8506f9bc75c350325d90e1.jpg.webp",
                },
                {
                    id: 7,
                    name: "Ổ điện cao cấp đa năng, thông minh 4 cổng USB, 3 cổng AC 220V OLAPLE an toàn chống giật, chống cháy nổ an toàn - Hàng nhập khẩu",
                    rate: 5,
                    price: 245000,
                    imgUrl: "https://salt.tikicdn.com/cache/280x280/ts/product/78/67/f0/feb8cb762a8506f9bc75c350325d90e1.jpg.webp",
                },
                {
                    id: 8,
                    name: "Ổ điện cao cấp đa năng, thông minh 4 cổng USB, 3 cổng AC 220V OLAPLE an toàn chống giật, chống cháy nổ an toàn - Hàng nhập khẩu",
                    rate: 5,
                    price: 245000,
                    imgUrl: "https://salt.tikicdn.com/cache/280x280/ts/product/78/67/f0/feb8cb762a8506f9bc75c350325d90e1.jpg.webp",
                },
                {
                    id: 9,
                    name: "Ổ điện cao cấp đa năng, thông minh 4 cổng USB, 3 cổng AC 220V OLAPLE an toàn chống giật, chống cháy nổ an toàn - Hàng nhập khẩu",
                    rate: 5,
                    price: 245000,
                    imgUrl: "https://salt.tikicdn.com/cache/280x280/ts/product/78/67/f0/feb8cb762a8506f9bc75c350325d90e1.jpg.webp",
                },
                {
                    id: 10,
                    name: "Ổ điện cao cấp đa năng, thông minh 4 cổng USB, 3 cổng AC 220V OLAPLE an toàn chống giật, chống cháy nổ an toàn - Hàng nhập khẩu",
                    rate: 5,
                    price: 245000,
                    imgUrl: "https://salt.tikicdn.com/cache/280x280/ts/product/78/67/f0/feb8cb762a8506f9bc75c350325d90e1.jpg.webp",
                },
            ],
        },
        {
            title: "Hút bụi cầm tay",
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
            title: "Bàn chải điện",
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
            title: "Vỉ nướng điện",
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

    const dispatch = useDispatch();
    const [loadData, setLoadData] = useState(false);
    const { recommended, loading, error } = useSelector(
        (state) => state.categories
    );

    useEffect(() => {
        if (!loadData) {
            dispatch(fetchRecommendedCategory());
            if (loading) {
                setLoadData(true);
            }
        }
    }, [loadData, dispatch, loading]);

    return (
        <div className="appContainer__recommended">
            <h4>Bạn có thể thích</h4>
            <ProductTab tabs={recommended} />
        </div>
    );
}
