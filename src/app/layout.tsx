"use client";
// import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";


import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import PortfolioAIChat from "@/components/PortfolioAIChat";
import useShowLoader from "@/hooks/useShowLoader";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const showLoader = useShowLoader();
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full">
        {showLoader && <LoadingScreen />}
        <Navbar />
        <main>
          {!showLoader && children}
        </main>
        <Footer />
        {!showLoader && <PortfolioAIChat />}
      </body>
    </html>
  );
}
