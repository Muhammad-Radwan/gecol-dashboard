
import type { Metadata } from "next";
import { Changa, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import QCProvider from "./QCProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const changa = Changa({
  variable: "--font-changa",
  subsets: ["arabic"],
});

export const metadata: Metadata = {
  title: "Gecol Meter",
  description: "Asigned Company Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="rtl">
      <body
        className={`${changa.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QCProvider>
          <main>{children}</main>
        </QCProvider>
      </body>
    </html>
  );
}
