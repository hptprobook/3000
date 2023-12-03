"use client";
import React from "react";
import { styled } from "@mui/material/styles";
import ReviewOverview from "./Overview/ReviewOverview";
import ReviewComment from "./Comment/ReviewComment";

const StyledProductDetailReview = styled("div")(() => ({
    padding: "24px 15px",
    backgroundColor: "#fff",
    marginTop: "16px",
    borderRadius: "5px",
}));

export default function ProductDetailReview({ data, avg_rating }) {
    return (
        <StyledProductDetailReview>
            <h4>Khách hàng đánh giá</h4>
            <ReviewOverview data={avg_rating} length={data?.length} />
            <ReviewComment data={data} />
        </StyledProductDetailReview>
    );
}
