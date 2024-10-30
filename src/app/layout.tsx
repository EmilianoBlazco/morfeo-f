import type {Metadata} from "next";
import localFont from "next/font/local";
import "./globals.css";
import {ReactNode} from "react";
import {AuthProvider} from "@/context/AuthContext";
import {Toaster} from "@components/ui/toaster";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Morfeo S. A.",
    description: "Morfeo S.A. - Software de gestión de recursos humanos",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <AuthProvider>

                {children}

            <Toaster/>
        </AuthProvider>
        </body>
        </html>
    );
}
