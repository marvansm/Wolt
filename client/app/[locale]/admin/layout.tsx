import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import '@/app/globals.css'
import TanstackQueryProvider from '@/providers/TanstackQueryProvider';

const geist = Geist({
    subsets: ["latin"],
    variable: "--font-geist",
});

const geistMono = Geist_Mono({
    subsets: ["latin"],
    variable: "--font-mono",
});

export const metadata: Metadata = {
    title: 'Wolt Admin Panel',
    description: 'Wolt Restaurant Management & Order Administration',
    generator: 'v0.app',
    icons: {
        icon: [
            {
                url: '/icon-light-32x32.png',
                media: '(prefers-color-scheme: light)',
            },
            {
                url: '/icon-dark-32x32.png',
                media: '(prefers-color-scheme: dark)',
            },
            {
                url: '/icon.svg',
                type: 'image/svg+xml',
            },
        ],
        apple: '/apple-icon.png',
    },
}

export default async function RootLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}>) {
    const { locale } = await params;
    return (
        <html lang={locale}>
            <TanstackQueryProvider>
                <body className={`${geist.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground`}>
                    {children}
                    <Analytics />
                </body>
            </TanstackQueryProvider>
        </html>
    )
}
