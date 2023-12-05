"use client";
import React from "react";
import { styled } from "@mui/material/styles";
import Rating from "@/components/common/Rating/Rating";

const StyledReviewOverview = styled("div")(() => ({
    display: "flex",
    marginTop: "20px",
    borderBottom: "1px solid var(--color-75)",
    paddingBottom: "32px",
    justifyContent: "center",
    "& .reviewOverview__rating": {
        marginTop: "20px",
        "& .overview__rating--number": {
            fontSize: "40px",
            fontWeight: "600",
            textAlign: "center",
        },
    },
}));

export default function ReviewOverview({ data, length }) {
    const roundedAvgRating = parseFloat(data?.toFixed(1));
    return (
        <StyledReviewOverview>
            <div className="reviewOverview__rating">
                <div className="overview__rating--number">
                    {roundedAvgRating}
                </div>
                <Rating rate={roundedAvgRating} size={48} />
                <p style={{ textAlign: "center" }}>( {length && length} )</p>
            </div>
        </StyledReviewOverview>
    );
}
