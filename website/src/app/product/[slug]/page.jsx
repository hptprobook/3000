"use client";
import ProductDetailAdd from "@/components/layouts/ProductDetail/Add/ProductDetailAdd";
import ProductDetailInfo from "@/components/layouts/ProductDetail/Container/ProductDetailInfo/ProductDetailInfo";
import ProductDetailMain from "@/components/layouts/ProductDetail/ProductDetailMain";
import ProductDetailReview from "@/components/layouts/ProductDetail/Review/ProductDetailReview";
import ProductDetailSeller from "@/components/layouts/ProductDetail/Seller/ProductDetailSeller";
import ProductDetailSimilar from "@/components/layouts/ProductDetail/Similar.jsx/ProductDetailSimilar";
import ProductDetailSlider from "@/components/layouts/ProductDetail/Slider/ProductDetailSlider";
import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import { VariantProvider } from "@/provider/VariantContext";
import HomeFooter from "@/components/layouts/Home/Footer/HomeFooter";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "@/redux/slices/productSlice";
import Breadcrumb from "@/components/common/Breadcrumb/Breadcrumb";
import ProgressLoading from "@/components/common/Loading/ProgressLoading/ProgressLoading";

export default function ProductDetail({ params }) {
    const productId = params.slug ? params.slug.split("-").pop() : null;

    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);
    const status = useSelector((state) => state.products.status);

    const loadProduct = (productId) => {
        dispatch(fetchProductById(productId));
    };

    useEffect(() => {
        loadProduct(productId);
    }, []);

    if (status === "loading") {
        return <ProgressLoading />;
    }

    return (
        <>
            <Breadcrumb
                link="/"
                text1={"Sản phẩm"}
                text2={products?.selectedProduct?.name}
                productId={productId}
            />
            <Grid className="appContainer__detail" container>
                <VariantProvider>
                    <Grid item xs={3.5}>
                        <ProductDetailSlider
                            product={products?.selectedProduct}
                        />
                    </Grid>
                    <Grid item xs={5}>
                        <div
                            style={{
                                margin: "0 12px",
                            }}
                        >
                            <ProductDetailInfo
                                product={products?.selectedProduct}
                            />
                            <ProductDetailSimilar
                                data={
                                    products?.selectedProduct?.category.products
                                }
                            />
                            <ProductDetailSeller
                                data={products?.selectedProduct?.seller}
                            />
                            <ProductDetailMain
                                data={products?.selectedProduct?.detail}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={3.5} sx={{ paddingLeft: "12px" }}>
                        <ProductDetailAdd data={products?.selectedProduct} />
                    </Grid>
                </VariantProvider>
            </Grid>
            <Grid className="appContainer__detail--review" container>
                <Grid item xs={12}>
                    <ProductDetailReview
                        data={products?.selectedProduct?.reviews}
                        avg_rating={products?.selectedProduct?.average_rating}
                    />
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
