import type { Metadata } from 'next'
import { Poppins, Roboto } from 'next/font/google'
import './globals.css'

import { ThemeProvider } from '@/components/theme-provider'
import { SessionProvider } from 'next-auth/react'
import { cn } from '@/lib/utils'

export const dynamic = 'force-dynamic'

const inter = Poppins({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
    title: 'E-Com-Somesh',
    description: 'Created By Somesh',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" className="">
            <body
                className={cn(
                    inter.className,
                    'bg-gradient-to-bl dark:from-black dark:to-green-900 bg-no-repeat from-white to-sky-300 '
                )}
            >
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
