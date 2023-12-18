import Link from "next/link";
import React from "react";

export default function EmptyData({ text }) {
    return (
        <div>
            <h3
                style={{
                    marginBottom: "16px",
                }}
            >
                {text}
            </h3>
            <Link
                href={"/"}
                style={{
                    padding: "8px 12px",
                    backgroundColor: "#0a68ff",
                    borderRadius: "3px",
                    color: "#fff",
                    fontSize: "15px",
                }}
            >
                Quay về trang chủ
            </Link>
        </div>
    );
}
