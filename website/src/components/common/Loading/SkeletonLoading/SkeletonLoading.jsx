import { Skeleton } from "@mui/material";
import React from "react";

export default function SkeletonLoading({ variant, width, height }) {
    return (
        <>
            <Skeleton variant={variant} width={width} height={height} />
        </>
    );
}
