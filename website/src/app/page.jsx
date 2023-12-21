import React from "react";
import Sidebar from "@/components/layouts/Sidebar/Sidebar";
import { Grid } from "@mui/material";
import "@/styles/app.css";
import Banner from "@/components/layouts/Home/Banner/Banner";
import FlashSale from "@/components/layouts/Home/FlashSale/FlashSale";
import BestSeller from "@/components/layouts/Home/BestSeller/BestSeller";
import RecommendedProduct from "@/components/layouts/Home/RecommendedProduct/RecommendedProduct";
import MainListProduct from "@/components/layouts/Home/MainList/MainListProduct";
import HomeFooter from "@/components/layouts/Home/Footer/HomeFooter";

export default function Home() {
    return (
        <>
            <Grid className="appContainer" container>
                <Grid
                    item
                    xs={2.2}
                    className="appContainer__sidebar"
                    sx={{ paddingRight: "12px" }}
                >
                    <Sidebar />
                </Grid>
                <Grid item xs={9.8} className="appContainer__content">
                    <Banner />
                    <FlashSale />
                    <BestSeller />
                    <RecommendedProduct />
                    <MainListProduct />
                    <HomeFooter />
                </Grid>
            </Grid>
        </>
    );
}
