'use client'
import NavElement from '@/components/navbar'
import { useTheme } from 'next-themes'

export const dynamic = 'force-dynamic'
import { Toaster } from '@/components/ui/toaster'

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const { setTheme, theme } = useTheme()
    return (
        <div>
            <nav className="flex justify-center items-start p-4 space-x-2">
                <NavElement href="/">Home</NavElement>
                <NavElement href="/products">products</NavElement>
                <NavElement href="/orders">my orders</NavElement>
                <NavElement className={'!ml-auto'} href="/admin">
                    admin
                </NavElement>
                <button
                    onClick={() => {
                        if (theme === 'dark') setTheme('light')
                        else setTheme('dark')
                    }}
                >
                    Theme Change
                </button>
            </nav>

            {children}
            <Toaster />
        </div>
    )
}
