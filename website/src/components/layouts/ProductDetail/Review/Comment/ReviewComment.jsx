"use client";
import React, { useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import { Grid, Pagination } from "@mui/material";
import FilterComment from "@/components/common/Button/FilterComment/FilterComment";
import Rating from "@/components/common/Rating/Rating";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const StyledReviewComment = styled("div")(() => ({
    marginTop: "20px",
    "& .reviewComment__filter": {
        padding: "20px 0",
        "& .reviewComment__filter--item": {
            marginTop: "20px",
            display: "flex",
        },
    },
    "& .reviewComment__grid": {
        paddingTop: "20px",
        borderTop: "1px solid var(--border-color)",
        borderBottom: "1px solid var(--border-color)",
        paddingBottom: "20px",
        "& .reviewComment__grid--customer": {
            "& .info": {
                display: "flex",
                alignItems: "center",
            },
        },
    },
}));

export default function ReviewComment({ data, avg_rating }) {
    const [activeFilter, setActiveFilter] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const commentsPerPage = 5;
    const numberOfComments = data?.length;
    const commentSectionRef = useRef(null);

    const handleFilterClick = (filter) => {
        setActiveFilter((prevFilters) =>
            prevFilters.includes(filter)
                ? prevFilters.filter((f) => f !== filter)
                : [...prevFilters, filter]
        );
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
        scrollToCommentSection();
    };

    const scrollToCommentSection = () => {
        if (commentSectionRef.current) {
            commentSectionRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };

    // const indexOfLastComment = currentPage * commentsPerPage;
    // const indexOfFirstComment = indexOfLastComment - commentsPerPage;
    // const currentComments = data?.slice(
    //     indexOfFirstComment,
    //     indexOfLastComment
    // );

    const filters = ["5 sao", "4 sao", "3 sao", "2 sao", "1 sao"];

    const getFilteredComments = () => {
        if (!activeFilter.length) return data;
        return data.filter((review) =>
            activeFilter.some(
                (filter) => Math.round(review.rating) === Number(filter[0])
            )
        );
    };

    const filteredComments = getFilteredComments();
    const numberOfFilteredComments = filteredComments?.length;

    const indexOfLastComment = currentPage * commentsPerPage;
    const indexOfFirstComment = indexOfLastComment - commentsPerPage;
    const currentComments = filteredComments?.slice(
        indexOfFirstComment,
        indexOfLastComment
    );

    const getRatingText = (rating) => {
        const roundedRating = Math.round(rating);
        switch (roundedRating) {
            case 5:
                return "Cực kì hài lòng";
            case 4:
                return "Hài lòng";
            case 3:
                return "Khá hài lòng";
            case 2:
                return "Khá tệ";
            case 1:
                return "Rất tệ";
            default:
                return "";
        }
    };

    function formatDateTime(dateTimeStr) {
        const date = new Date(dateTimeStr);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0"); // January is 0!
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");

        return `${hours}:${minutes} ${day}-${month}-${year}`;
    }

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
                            isActive={activeFilter.includes(filterText)}
                        />
                    ))}
                </div>
            </div>
            <div ref={commentSectionRef}>
                {currentComments &&
                    currentComments.map((review, index) => (
                        <Grid
                            key={index}
                            className="reviewComment__grid"
                            container
                        >
                            {/* User info */}
                            <Grid item xs={3}>
                                <div className="reviewComment__grid--customer">
                                    <div className="info">
                                        <img
                                            width={40}
                                            height={40}
                                            src={
                                                "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1200px-User_icon_2.svg.png"
                                            }
                                            alt=""
                                            style={{ marginRight: "12px" }}
                                        />
                                        <span>
                                            <span>
                                                <b>{review.user.name}</b>
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </Grid>
                            <Grid
                                item
                                xs={9}
                                className="reviewComment__comment"
                            >
                                <div>
                                    <div className="rating at-c">
                                        <Rating
                                            rate={review.rating}
                                            size={30}
                                        />
                                        <span
                                            style={{
                                                fontSize: "15px",
                                                fontWeight: "500",
                                            }}
                                        >
                                            {getRatingText(review.rating)}
                                        </span>
                                    </div>
                                    <div
                                        className="at-c mt-12"
                                        style={{
                                            fontSize: "13px",
                                            color: "#4bc488",
                                        }}
                                    >
                                        <CheckCircleIcon
                                            sx={{ fontSize: "16px" }}
                                        />
                                        <span style={{ marginLeft: "4px" }}>
                                            Đã mua hàng
                                        </span>
                                    </div>
                                    <div
                                        className="comment mt-12"
                                        style={{ fontSize: "14px" }}
                                    >
                                        <p>{review.comment}</p>
                                        {review.image_url && (
                                            <img
                                                className="mt-12"
                                                width={70}
                                                height={70}
                                                src={review?.image_url}
                                                alt=""
                                            />
                                        )}
                                    </div>
                                    <p
                                        className="mt-12"
                                        style={{
                                            fontSize: "13px",
                                            color: "var(--text-50-color)",
                                        }}
                                    >
                                        Đánh giá vào{" "}
                                        {formatDateTime(review.created_at)}
                                    </p>
                                </div>
                            </Grid>
                        </Grid>
                    ))}
            </div>
            <Pagination
                sx={{
                    marginTop: "20px",
                    display: "flex",
                    justifyContent: "flex-end",
                    "& button": {
                        fontFamily: "var(--font-family)",
                        fontSize: "15px",
                        fontWeight: "500",
                    },
                    "& .Mui-selected": {
                        backgroundColor: "#189eff",
                    },
                }}
                count={Math.ceil(numberOfFilteredComments / commentsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
            />
        </StyledReviewComment>
    );
}
