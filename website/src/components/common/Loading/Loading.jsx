import React from "react";
import { styled } from "@mui/material/styles";
import "./style.css";

const StyledLoading = styled("div")(() => ({
    postion: "fixed",
    top: 0,
    left: 0,
    width: "100vh",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
}));

export default function Loading() {
    return (
        <StyledLoading>
            <div className="loader">
                <div class="face">
                    <div class="circle"></div>
                </div>
                <div class="face">
                    <div class="circle"></div>
                </div>
            </div>
        </StyledLoading>
    );
}
