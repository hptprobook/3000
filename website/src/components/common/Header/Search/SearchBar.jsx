"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
import { fetchAllProducts } from "@/redux/slices/productSlice";
import removeDiacritics from "remove-diacritics";
import { useRouter } from "next/navigation";

const SearchContainer = styled("div")(() => ({}));

const SearchInputContainer = styled("div")(({ theme }) => ({
    display: "flex",
    position: "relative",
    borderRadius: "8px",
    backgroundColor: "transparent",
    border: "1px solid #dddde3",
    alignItems: "center",
    height: "40px",
    maxWidth: "800px !important",
    [theme.breakpoints.up("sm")]: {
        width: "auto",
    },
}));

const SearchInput = styled("input")(() => ({
    border: "none",
    outline: "none",
    width: "100%",
    height: "100%",
    borderRight: "1px solid #dddde3",
    fontSize: "14px",
    fontWeight: "400",
    color: "rgb(128, 128, 137)",
}));

const SearchBtn = styled("button")(() => ({
    border: "none",
    outline: "none",
    backgroundColor: "#fff",
    width: "92px !important",
    height: "100%",
    cursor: "pointer",
    color: "var(--link-color)",
    borderTopRightRadius: "8px",
    borderBottomRightRadius: "8px",
    fontSize: "15px",
    "&:hover": {
        backgroundColor: "#cee1ff",
    },
}));

const SearchRecomended = styled("div")(() => ({
    margin: "14px 0 0 12px",
    fontSize: "14px",
    fontWeight: "400",
    color: "rgb(128, 128, 137)",
    whiteSpace: "nowrap",
    display: "flex",
    width: "780px",
    overflow: "hidden",
}));

const SearchSuggestion = styled("div")(() => ({
    position: "absolute",
    width: "100%",
    top: "105%",
    right: "0",
    minHeight: "100px",
    zIndex: "999999999999",
    backgroundColor: "#fff",
    border: "1px solid #eeeeee",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
    h4: {
        color: "var(--text-color)",
        fontSize: "15px",
        fontWeight: "600",
        padding: "12px 24px 12px",
    },
    li: {
        listStyle: "none",
        fontSize: "15px",
        height: "40px",
        a: {
            padding: "0 30px",
            display: "block",
            height: "100%",
            lineHeight: "40px",
        },
        "&:hover": {
            backgroundColor: "#e7e7e7",
        },
    },
}));

export default function SearchBar() {
    const [searchValue, setSearchValue] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchContainerRef = useRef(null);
    const suggestionRef = useRef(null);

    const handleClickOutside = (e) => {
        if (
            searchContainerRef.current &&
            !searchContainerRef.current.contains(e.target) &&
            suggestionRef.current &&
            !suggestionRef.current.contains(e.target)
        ) {
            setShowSuggestions(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const searchRecommendedItem = [
        "Hot sale",
        "Máy tính",
        "Điện thoại",
        "Sách",
        "Thể thao",
        "Du lịch",
        "Bán chạy",
    ];

    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);
    // const status = useSelector((state) => state.products.status);
    const [loadData, setLoadData] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [emptyInput, setEmptyInput] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        if (!loadData && products.length === 0) {
            dispatch(fetchAllProducts());
            setLoadData(true);
        }
    }, [loadData, products]);

    const handleFocus = () => {
        setShowSuggestions(true);
    };

    const handleChange = (e) => {
        const inputValue = e.target.value;

        if (inputValue.length > 0) {
            setEmptyInput(true);
        } else {
            setEmptyInput(false);
        }

        setSearchValue(inputValue);

        const normalizedInput = removeDiacritics(inputValue.toLowerCase());

        setFilteredProducts(
            products.products
                .filter((product) =>
                    removeDiacritics(product.name.toLowerCase()).includes(
                        normalizedInput
                    )
                )
                .slice(0, 5)
        );
    };

    const router = useRouter();

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        router.push(`/search/${searchValue.toLowerCase()}`);
        setShowSuggestions(false);

        if (inputRef.current) {
            inputRef.current.blur();
        }
    };

    const handleSuggestionClick = (item) => {
        const searchItem = typeof item === "string" ? item : item.name;
        setSearchValue(searchItem);
        setShowSuggestions(false);

        if (inputRef.current) {
            inputRef.current.blur();
        }

        router.push(`/search/${searchItem.toLowerCase()}`);
    };

    const handleRecommendedItemClick = (item) => {
        setSearchValue(item);
        router.push(`/search/${item.toLowerCase()}`);
    };

    const defaultSuggestions = [
        "Điện thoại",
        "Máy tính",
        "Bán chạy",
        "Hot",
        "Sản phẩm mới",
    ];

    return (
        <>
            <SearchContainer ref={searchContainerRef}>
                <form onSubmit={handleSearchSubmit}>
                    <SearchInputContainer>
                        <SearchIcon
                            sx={{
                                mx: 2,
                                color: "#909098",
                            }}
                        />

                        <SearchInput
                            type="text"
                            onChange={handleChange}
                            onFocus={handleFocus}
                            value={searchValue}
                            placeholder="Tìm kiếm sản phẩm ..."
                        />

                        <SearchBtn
                            type="submit"
                            disabled={!searchValue ? true : false}
                        >
                            Tìm kiếm
                        </SearchBtn>

                        {showSuggestions && (
                            <SearchSuggestion ref={suggestionRef}>
                                <h4>Tìm kiếm sản phẩm</h4>
                                <ul className="SearchSuggestion">
                                    {(searchValue.trim() === ""
                                        ? defaultSuggestions
                                        : filteredProducts
                                    ).length > 0 ? (
                                        (searchValue.trim() === ""
                                            ? defaultSuggestions
                                            : filteredProducts
                                        ).map((item, index) => (
                                            <li
                                                key={index}
                                                onClick={() =>
                                                    handleSuggestionClick(item)
                                                }
                                            >
                                                <Link
                                                    href={`/search/${
                                                        typeof item === "string"
                                                            ? item.toLowerCase()
                                                            : item.name.toLowerCase()
                                                    }`}
                                                >
                                                    {typeof item === "string"
                                                        ? item
                                                        : item.name}
                                                </Link>
                                            </li>
                                        ))
                                    ) : (
                                        <div style={{ textAlign: "center" }}>
                                            Không tìm thấy kết quả
                                        </div>
                                    )}
                                </ul>
                            </SearchSuggestion>
                        )}
                    </SearchInputContainer>
                </form>

                <SearchRecomended>
                    {searchRecommendedItem.map((item, i) => (
                        <div
                            style={{ marginRight: "12px", cursor: "pointer" }}
                            onClick={() => handleRecommendedItemClick(item)}
                            key={i}
                        >
                            {item}
                        </div>
                    ))}
                </SearchRecomended>
            </SearchContainer>
        </>
    );
}
