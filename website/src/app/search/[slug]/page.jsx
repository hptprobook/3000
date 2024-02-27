"use client";
import Breadcrumb from "@/components/common/Breadcrumb/Breadcrumb";
import ProgressLoading from "@/components/common/Loading/ProgressLoading/ProgressLoading";
import HomeFooter from "@/components/layouts/Home/Footer/HomeFooter";
import SearchContainer from "@/components/layouts/Search/SearchContainer";
import { fetchSearch } from "@/redux/slices/searchSlice";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function page() {
    const pathname = usePathname();
    const modifiedPathname = pathname.replace(/^\/search\//, "");
    const dispatch = useDispatch();
    const results = useSelector((state) => state.search.results);
    const status = useSelector((state) => state.search.status);

    useEffect(() => {
        dispatch(fetchSearch(modifiedPathname));
    }, [pathname]);

    if (status === "loading" || !modifiedPathname) {
        return <ProgressLoading />;
    }

    return (
        <>
            <Breadcrumb
                link={"/"}
                text1={"Trang chủ"}
                text2={`Tìm kiếm với từ khóa: ${decodeURIComponent(
                    modifiedPathname
                )}`}
            />
            <div className="appContainer__searchPage">
                <SearchContainer data={results?.data} />
            </div>
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
