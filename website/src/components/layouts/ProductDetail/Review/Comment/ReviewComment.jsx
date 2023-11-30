"use client";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Grid } from "@mui/material";
import FilterComment from "@/components/common/Button/FilterComment/FilterComment";

const StyledReviewComment = styled("div")(() => ({
    marginTop: "20px",
    "& .reviewComment__filter": {
        padding: "20px 0",
        "& .reviewComment__filter--item": {
            marginTop: "20px",
            display: "flex",
        },
    },
}));

export default function ReviewComment() {
    const [activeFilter, setActiveFilter] = useState("");
    const handleFilterClick = (filter) => {
        setActiveFilter(filter);
    };

    const filters = [
        "Mới nhất",
        "Cũ nhất",
        "5 sao",
        "4 sao",
        "3 sao",
        "2 sao",
        "1 sao",
    ];

    return (
        <StyledReviewComment>
            <div className="reviewComment__filter">
                <h5>Lọc theo</h5>
                <div className="reviewComment__filter--item">
                    {filters.map((filterText, index) => (
                        <FilterComment
                            key={index}
                            text={filterText}
                            onClick={() => handleFilterClick(filterText)}
                            isActive={activeFilter === filterText}
                        />
                    ))}
                </div>
            </div>
            <Grid className="reviewComment__grid" container>
                <Grid item xs={4.5}>
                    Customer
                </Grid>
                <Grid item xs={6.5}>
                    comment
                </Grid>
            </Grid>
        </StyledReviewComment>
    );
}
