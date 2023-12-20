import { Grid } from "@mui/material";
import Link from "next/link";
import React from "react";

export default function HomeFooter() {
    return (
        <Grid
            container
            columnSpacing={0.5}
            className="appContainer__homeFooter"
            sx={{
                // marginTop: "48px",
                width: "100%",
                margin: "48px auto 0 auto",
                padding: "24px 12px 36px",
                backgroundColor: "#fff",
                "& p": {
                    padding: "6px 0",
                    fontSize: "13px",
                    "&:hover": {
                        textDecoration: "underline",
                    },
                },
            }}
        >
            <Grid xs={3} item>
                <h4>Hỗ trợ khách hàng</h4>
                <p style={{ marginTop: "12px" }}>
                    <Link href={""}>Hotline: 19001009</Link>
                </p>
                <p>
                    {" "}
                    <Link href={""}>Các câu hỏi thường gặp</Link>
                </p>
                <p>
                    {" "}
                    <Link href={""}>Hướng dẫn đặt hàng</Link>
                </p>
                <p>
                    {" "}
                    <Link href={""}>Phương thức vận chuyển</Link>
                </p>
                <p>
                    {" "}
                    <Link href={""}>Phương thức thanh toán</Link>
                </p>
            </Grid>
            <Grid xs={3} item>
                <h4>Về 3000</h4>
                <p style={{ marginTop: "12px" }}>
                    {" "}
                    <Link href={""}>Giới thiệu 3000</Link>
                </p>
                <p>
                    {" "}
                    <Link href={""}>3000 Blog</Link>
                </p>
                <p>
                    {" "}
                    <Link href={""}>Tuyển dụng</Link>
                </p>
                <p>
                    {" "}
                    <Link href={""}>Chính sách bảo mật</Link>
                </p>
                <p>
                    {" "}
                    <Link href={""}>Điều khoản sử dụng</Link>
                </p>
            </Grid>
            <Grid xs={3} item>
                <h4>Hợp tác và liên kết</h4>
                <p style={{ marginTop: "12px" }}>
                    {" "}
                    <Link href={""}>Quy chế hoạt động sàn GDTMDT</Link>
                </p>
                <p>
                    {" "}
                    <Link href={""}>Bán hàng cùng 3000</Link>
                </p>
            </Grid>
            <Grid xs={3} item>
                <h4>Kết nối với chúng tôi</h4>
            </Grid>
        </Grid>
    );
}
