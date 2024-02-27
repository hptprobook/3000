"use client";
import React from "react";
import StarHalfRoundedIcon from "@mui/icons-material/StarHalfRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";

export default function Rating({ rate, size }) {
    // const renderRating = (rate) => {
    //     let stars = [];
    //     for (let i = 0; i < 5; i++) {
    //         if (i < rate) {
    //             stars.push(
    //                 <StarRoundedIcon
    //                     sx={{ fontSize: size, color: "#f8cc3b" }}
    //                     key={i}
    //                 />
    //             );
    //         } else {
    //             stars.push(
    //                 <StarRoundedIcon
    //                     sx={{ fontSize: size, color: "#dddde3" }}
    //                     key={i}
    //                 />
    //             );
    //         }
    //     }
    //     return stars;
    // };
    const renderRating = (rate) => {
        let stars = [];
        let fullStars = Math.floor(rate);
        let hasHalfStar = rate % 1 !== 0; // Check if there is a half star

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(
                    <StarRoundedIcon
                        sx={{ fontSize: size, color: "#f8cc3b" }}
                        key={i}
                    />
                );
            } else if (i === fullStars && hasHalfStar) {
                stars.push(
                    <StarHalfRoundedIcon
                        sx={{ fontSize: size, color: "#f8cc3b" }}
                        key={i}
                    />
                );
            } else {
                stars.push(
                    <StarBorderRoundedIcon
                        sx={{ fontSize: size, color: "#f8cc3b" }}
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
