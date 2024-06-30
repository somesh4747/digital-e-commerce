import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

import { ThemeProvider } from '@/components/theme-provider'
import { SessionProvider } from 'next-auth/react'

const inter = Poppins({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
    title: 'Digital-Store-Somesh',
    description: 'Created By Somesh',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" className="">
            <body className={inter.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    <SessionProvider>{children}</SessionProvider>
                </ThemeProvider>
            </body>
        </html>
    )
}
