import React from "react";

export default function Breadcrumb({ productId = 0 }) {
    return (
        <div
            style={{
                width: "var(--max-width)",
                margin: "auto",
                padding: "15px 0",
            }}
            className="appBreadcrumb"
        >
            Trang chủ - Sản phẩm số {productId}
        </div>
    );
}
