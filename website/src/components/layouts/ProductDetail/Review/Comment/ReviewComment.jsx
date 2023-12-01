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

export default function ReviewComment() {
    const fakeData = Array.from({ length: 30 }, (_, i) => ({
        id: 1,
        name: "Nguyễn Đông Anh",
        avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/800px-User_icon_2.svg.png",
        review: {
            id: 1,
            rating: 5,
            comment: `Cực kì hài lòng ${i + 1}`,
            image_url:
                "https://salt.tikicdn.com/cache/750x750/ts/product/8c/1a/8f/a9722e24df6a32a7159212e205b2732a.jpg.webp",
            create_at: "30/11/2023",
        },
    }));

    const [activeFilter, setActiveFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const commentsPerPage = 5;
    const numberOfComments = fakeData.length;
    const commentSectionRef = useRef(null);

    const handleFilterClick = (filter) => {
        setActiveFilter(filter);
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

    const indexOfLastComment = currentPage * commentsPerPage;
    const indexOfFirstComment = indexOfLastComment - commentsPerPage;
    const currentComments = fakeData.slice(
        indexOfFirstComment,
        indexOfLastComment
    );

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
            <div ref={commentSectionRef}>
                {currentComments.map((data, index) => (
                    <Grid key={index} className="reviewComment__grid" container>
                        {/* User info */}
                        <Grid item xs={3}>
                            <div className="reviewComment__grid--customer">
                                <div className="info">
                                    <img
                                        width={40}
                                        height={40}
                                        src={data.avatar}
                                        alt=""
                                        style={{ marginRight: "12px" }}
                                    />
                                    <span>
                                        <b>{data.name}</b>
                                    </span>
                                </div>
                            </div>
                        </Grid>
                        {/* Comment content */}
                        <Grid item xs={9} className="reviewComment__comment">
                            <div>
                                <div className="rating at-c">
                                    <Rating
                                        rate={data.review.rating}
                                        size={30}
                                    />
                                    <span
                                        style={{
                                            fontSize: "15px",
                                            fontWeight: "500",
                                        }}
                                    >
                                        {data.review.comment}
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
                                    <p>Đẹp, cứng chắc, dễ sử dụng</p>
                                    <img
                                        className="mt-12"
                                        width={70}
                                        height={70}
                                        src={data.review.image_url}
                                        alt=""
                                    />
                                </div>
                                <p
                                    className="mt-12"
                                    style={{
                                        fontSize: "13px",
                                        color: "var(--text-50-color)",
                                    }}
                                >
                                    Đánh giá vào {data.review.create_at}
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
                count={Math.ceil(numberOfComments / commentsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
            />
        </StyledReviewComment>
    );
}
