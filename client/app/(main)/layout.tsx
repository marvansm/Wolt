import React from "react";
import type { Metadata } from "next";
import { Fredoka, Poppins } from "next/font/google";
import "../globals.css";
import MainLayout from "@/components/layout/MainLayout";
import TanstackQueryProvider from "@/providers/TanstackQueryProvider";
import { AuthProvider } from "@/context/AuthContext";

const fontFredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
});
const fontPoppins = Poppins({
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wolt Market Clone",
  description: "Experience the best food delivery service with Wolt Market Clone.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontFredoka.variable} ${fontPoppins.variable} antialiased`}
      >
        <TanstackQueryProvider>
          <AuthProvider>
            <MainLayout>{children}</MainLayout>
          </AuthProvider>
        </TanstackQueryProvider>
      </body>
    </html>
  );
}
