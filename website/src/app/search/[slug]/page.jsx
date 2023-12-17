import Breadcrumb from "@/components/common/Breadcrumb/Breadcrumb";
import HomeFooter from "@/components/layouts/Home/Footer/HomeFooter";
import SearchContainer from "@/components/layouts/Search/SearchContainer";
import React from "react";

export default function page() {
    return (
        <>
            <Breadcrumb />
            <div className="appContainer__searchPage">
                <SearchContainer />
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
