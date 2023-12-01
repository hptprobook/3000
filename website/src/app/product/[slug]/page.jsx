"use client";
import ProductDetailAdd from "@/components/layouts/ProductDetail/Add/ProductDetailAdd";
import ProductDetailInfo from "@/components/layouts/ProductDetail/Container/ProductDetailInfo/ProductDetailInfo";
import ProductDetailMain from "@/components/layouts/ProductDetail/ProductDetailMain";
import ProductDetailReview from "@/components/layouts/ProductDetail/Review/ProductDetailReview";
import ProductDetailSeller from "@/components/layouts/ProductDetail/Seller/ProductDetailSeller";
import ProductDetailSimilar from "@/components/layouts/ProductDetail/Similar.jsx/ProductDetailSimilar";
import ProductDetailSlider from "@/components/layouts/ProductDetail/Slider/ProductDetailSlider";
import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { VariantProvider } from "@/provider/VariantContext";
import HomeFooter from "@/components/layouts/Home/Footer/HomeFooter";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchAllProducts,
    fetchProductById,
} from "@/redux/slices/productSlice";

export default function ProductDetail({ params }) {
    const productId = params.slug ? params.slug.split("-").pop() : null;

    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);
    const status = useSelector((state) => state.products.status);
    const [loadData, setLoadData] = useState(false);

    const loadProduct = (productId) => {
        dispatch(fetchProductById(productId));
    };

    useEffect(() => {
        loadProduct(productId);
    }, []);

    const fakeDataProduct = {
        id: 1,
        name: "Đồng hồ da",
        images: [
            {
                id: 1,
                image_url:
                    "https://salt.tikicdn.com/cache/750x750/ts/product/75/93/ad/6e0c7abaa25c1396106a20c811fff716.jpg.webp",
                image_alt:
                    "Dây đồng hồ Huy Hoàng da đà điểu da bụng size 22, 24, 26 màu đen",
            },
            {
                id: 2,
                image_url:
                    "https://salt.tikicdn.com/cache/750x750/ts/product/b5/d0/d9/50fbcf6c7fc894c65ef4a6464d92be07.jpg.webp",
                image_alt:
                    "Dây đồng hồ Huy Hoàng da đà điểu da bụng size 22, 24, 26 màu đen",
            },
            {
                id: 3,
                image_url:
                    "https://salt.tikicdn.com/cache/750x750/ts/product/56/9e/c9/162cb686db4abc30810cab027a2d97e0.jpg.webp",
                image_alt:
                    "Dây đồng hồ Huy Hoàng da đà điểu da bụng size 22, 24, 26 màu đen",
            },
            {
                id: 4,
                image_url:
                    "https://salt.tikicdn.com/cache/750x750/ts/product/12/a6/31/dedb6f612dbbe3173799f61f47398b72.jpg.webp",
                image_alt:
                    "Dây đồng hồ Huy Hoàng da đà điểu da bụng size 22, 24, 26 màu đen",
            },
            {
                id: 5,
                image_url:
                    "https://salt.tikicdn.com/cache/750x750/ts/product/1b/62/20/7c274a2ec6ee7bad9d1ab6ac52abc875.jpg.webp",
                image_alt:
                    "Dây đồng hồ Huy Hoàng da đà điểu da bụng size 22, 24, 26 màu đen",
            },
            {
                id: 6,
                image_url:
                    "https://salt.tikicdn.com/cache/750x750/ts/product/d5/c1/f5/8c7a2d6d454cc0a113996c2160e59e27.jpg.webp",
                image_alt:
                    "Dây đồng hồ Huy Hoàng da đà điểu da bụng size 22, 24, 26 màu đen",
            },
        ],
    };

    return (
        <>
            <div
                style={{
                    width: "var(--max-width)",
                    margin: "auto",
                    padding: "15px 0",
                }}
                className="appBreadcrumb"
            >
                Trang chủ - Sản phẩm số {productId}
            </div>
            <Grid className="appContainer__detail" container>
                <VariantProvider>
                    <Grid item xs={3.5}>
                        <ProductDetailSlider
                            test={products}
                            product={fakeDataProduct}
                        />
                    </Grid>
                    <Grid item xs={5}>
                        <div
                            style={{
                                margin: "0 12px",
                            }}
                        >
                            <ProductDetailInfo
                                product={products.selectedProduct}
                            />
                            <ProductDetailSimilar />
                            <ProductDetailSeller />
                            <ProductDetailMain />
                        </div>
                    </Grid>
                    <Grid item xs={3.5} sx={{ paddingLeft: "12px" }}>
                        <ProductDetailAdd />
                    </Grid>
                </VariantProvider>
            </Grid>
            <Grid className="appContainer__detail--review" container>
                <Grid item xs={12}>
                    <ProductDetailReview />
                </Grid>
            </Grid>
            <div
                style={{
                    width: "100%",
                    padding: "0 300px",
                    margin: "0 auto",
                    backgroundColor: "#fff",
                }}
            >
                <HomeFooter />
            </div>
        </>
    );
}
