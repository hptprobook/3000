"use client";

import * as React from "react";
import "./style.css";
import { Box } from "@mui/material";
import SearchBar from "@/components/common/Header/Search/SearchBar";
import Link from "next/link";
import Image from "next/image";
import UserBar from "@/components/common/Header/User/UserBar";

export default function Header() {
    return (
        <Box sx={{ backgroundColor: "#fff" }}>
            <header className="header">
                <div style={{}}>
                    <Link href={"/"}>
                        <Image
                            style={{ borderRadius: "12px" }}
                            width={80}
                            height={80}
                            src="/3000i_logo_transparent_100x100.png"
                            alt=""
                        />
                    </Link>
                </div>

                <SearchBar />

                <UserBar />
            </header>
        </Box>
    );
}
