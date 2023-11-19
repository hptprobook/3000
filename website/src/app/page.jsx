"use client";

import Sidebar from "@/components/layouts/Sidebar/Sidebar";
import { Grid } from "@mui/material";
import "@/styles/app.css";
import Banner from "@/components/layouts/Home/Banner/Banner";
import FlashSale from "@/components/layouts/Home/FlashSale/FlashSale";
import BestSeller from "@/components/layouts/Home/BestSeller/BestSeller";

export default function Home() {
    return (
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
            </Grid>
        </Grid>
    );
}
