// "use client";
import { Inter } from "next/font/google";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/globals.css";
import "@/styles/app.css";
import Header from "@/components/layouts/Header/Header";
import { Providers } from "@/redux/provider";
import { AddToCartProvider } from "@/provider/AddToCartContext";
import { OrderAddressProvider } from "@/provider/OrderAddressContext";
import Skeleton from "react-loading-skeleton";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "3000i",
    description: "Generated by create next app",
    icons: "/3000i_logo_transparent_100x100.png",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Providers>
                    <ToastContainer style={{ zIndex: "99999999999999" }} />
                    <OrderAddressProvider>
                        <AddToCartProvider>
                            <Header />
                            {children}
                        </AddToCartProvider>
                    </OrderAddressProvider>
                </Providers>
            </body>
        </html>
    );
}
