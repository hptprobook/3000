import React from "react";

export default function ProductDetail({ params }) {
    const productId = params.slug ? params.slug.split("-").pop() : null;

    return <div>ProductDetail {productId}</div>;
}
