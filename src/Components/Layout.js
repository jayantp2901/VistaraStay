import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />  {/* ✅ Navbar appears on all pages */}
            <main className="flex-grow">{children}</main>
            <Footer />  {/* ✅ Footer stays at the bottom */}
        </div>
    );
}
