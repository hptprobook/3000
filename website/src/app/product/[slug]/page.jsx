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
                            product={products.selectedProduct}
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
