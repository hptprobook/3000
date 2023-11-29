"use client";
import React from "react";
import StarIcon from "@mui/icons-material/Star";

export default function Rating({ rate, size }) {
    const renderRating = (rate) => {
        let stars = [];
        for (let i = 0; i < 5; i++) {
            if (i < rate) {
                stars.push(
                    <StarIcon
                        sx={{ fontSize: size, color: "#f8cc3b" }}
                        key={i}
                    />
                );
            } else {
                stars.push(
                    <StarIcon
                        sx={{ fontSize: size, color: "#dddde3" }}
                        key={i}
                    />
                );
            }
        }
        return stars;
    };

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                paddingRight: "8px",
            }}
        >
            {renderRating(rate)}
        </div>
    );
}
