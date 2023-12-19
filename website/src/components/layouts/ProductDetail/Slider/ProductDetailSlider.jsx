"use client";

import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import ProgressLoading from "@/components/common/Loading/ProgressLoading/ProgressLoading";

const StyledProductDetailSlider = styled("div")(() => ({
    backgroundColor: "#fff",
    borderRadius: "5px",
    marginRight: "12px",
    padding: "15px",
    position: "sticky",
    top: "12px",
    height: "465px",
    "& .container__slider--img": {
        height: "376px",
        width: "100%",
        border: "1px solid #ebebf0",
        cursor: "pointer",
        borderRadius: "5px",
        overflow: "hidden",
        "& img": {
            width: "100%",
            height: "100%",
            objectFit: "cover",
        },
    },
    "& .thumbnails": {
        width: "100%",
        overflow: "hidden",
        display: "flex",
        height: "64px",
        "& .container__slider--thumb": {
            marginTop: "8px",
            width: "100%",
            aspectRatio: "1/1",
            borderRadius: "5px",
            cursor: "pointer",
            border: "1px solid #ebebf0",
            overflow: "hidden",
            marginRight: "6px",
            "&:last-child": {
                marginRight: "0",
            },
            "& img": {
                width: "100%",
                height: "100%",
                objectFit: "cover",
            },
            "&.active": {
                border: "1.5px solid #0a68ff",
            },
        },
    },
}));

export default function ProductDetailSlider({ product }) {
    if (!product) {
        return <ProgressLoading />;
    }
    const initialImage = product?.thumbnail || product?.images[0]?.image_url;
    const [selectedImage, setSelectedImage] = useState(initialImage);
    const [activeThumbnail, setActiveThumbnail] = useState(
        product?.images[0]?.id
    );

    useEffect(() => {
        if (product) {
            setSelectedImage(product.thumbnail || product.images[0]?.image_url);
            setActiveThumbnail(product.images[0]?.id);
        }
    }, [product]);

    const handleThumbnailHover = (image) => {
        setSelectedImage(image.image_url);
    };

    const handleThumbnailClick = (image) => {
        setSelectedImage(image.image_url);
        setActiveThumbnail(image.id);
    };

    return (
        <StyledProductDetailSlider>
            <div className="container__slider--img">
                <img src={selectedImage} alt={product?.name} />
            </div>
            <div className="thumbnails">
                {product?.images.map((image) => (
                    <div
                        key={image.id}
                        className={`container__slider--thumb ${
                            activeThumbnail === image.id ? "active" : ""
                        }`}
                        onClick={() => handleThumbnailClick(image)}
                        onMouseEnter={() => handleThumbnailHover(image)}
                    >
                        <img src={image.image_url} alt={image.image_alt} />
                    </div>
                ))}
            </div>
        </StyledProductDetailSlider>
    );
}
