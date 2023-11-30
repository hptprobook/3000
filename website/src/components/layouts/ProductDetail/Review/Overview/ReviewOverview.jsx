"use client";
import React from "react";
import { styled } from "@mui/material/styles";
import Rating from "@/components/common/Rating/Rating";

const StyledReviewOverview = styled("div")(() => ({
    display: "flex",
    justifyContent: "center",
    "& .reviewOverview__rating": {
        "& .overview__rating--number": {
            fontSize: "40px",
            fontWeight: "600",
            textAlign: "center",
        },
    },
}));

export default function ReviewOverview() {
    return (
        <StyledReviewOverview>
            <div className="reviewOverview__rating">
                <div className="overview__rating--number">4.5</div>
                <Rating rate={4.2} size={48} />
                <p style={{ textAlign: "center" }}>( 800 đánh giá )</p>
            </div>
        </StyledReviewOverview>
    );
}
