import React from "react";
import type { Metadata } from "next";
import { Fredoka, Poppins } from "next/font/google";
import "../../globals.css";
import MainLayout from "@/components/layout/MainLayout";
import TanstackQueryProvider from "@/providers/TanstackQueryProvider";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import PageWrapper from "@/components/common/PageWrapper";
import { ThemeProvider } from "@/context/ThemeContext";
import { IntlayerProvider } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

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
  title: "Wolt Delivery | Food, Groceries and more in 30 minutes | Azerbaijan",
  description: "Experience the best food delivery service with Wolt Market Clone.",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)} suppressHydrationWarning className="dark">
      <body
        className={`${fontFredoka.variable} ${fontPoppins.variable} antialiased`}
      >
        <IntlayerProvider locale={locale}>
          <TanstackQueryProvider>
            <ThemeProvider>
              <AuthProvider>
                <CartProvider>
                  <MainLayout>
                    <PageWrapper>{children}</PageWrapper>
                  </MainLayout>
                </CartProvider>
              </AuthProvider>
            </ThemeProvider>
          </TanstackQueryProvider>
        </IntlayerProvider>
      </body>
    </html>
  );
}
