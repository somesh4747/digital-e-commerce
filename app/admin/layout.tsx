'use client'
import NavElement from '@/components/nav-element'
import { useTheme } from 'next-themes'

export const dynamic = 'force-dynamic'
import { Toaster } from '@/components/ui/toaster'

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const { setTheme, theme } = useTheme()
    return (
        <div>
            <nav className="flex justify-center items-start p-4 space-x-2">
                <NavElement href="/">Home</NavElement>
                <NavElement href="/admin">dashboard</NavElement>
                <NavElement href="/admin/products">products</NavElement>
                <NavElement href="/admin/customers">customers</NavElement>
                <NavElement href="/admin/sales">sales</NavElement>
                <button
                    onClick={() => {
                        if (theme === 'dark') setTheme('light')
                        else setTheme('dark')
                    }}
                >
                    change theme
                </button>
            </nav>

            {children}
            <Toaster />
        </div>
    )
}
