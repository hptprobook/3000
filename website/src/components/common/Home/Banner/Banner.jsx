import { Grid } from "@mui/material";
import React from "react";

export default function Banner() {
    return (
        <Grid container>
            <Grid item xs={4} className="">
                <h1>Banner 1</h1>
            </Grid>
            <Grid item xs={2} className="">
                <h1>Banner 2</h1>
            </Grid>
            <Grid item xs={2} className="">
                <h1>Banner 3</h1>
            </Grid>
            <Grid item xs={2} className="">
                <h1>Banner 4</h1>
            </Grid>
            <Grid item xs={2} className="">
                <h1>Banner 5</h1>
            </Grid>
        </Grid>
    );
}
