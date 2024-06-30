'use client'
import NavElement from '@/components/navbar'
import { useTheme } from 'next-themes'

export const dynamic = 'force-dynamic'
import { Toaster } from '@/components/ui/toaster'
import { Button } from '@/components/ui/button'
import { signOut, signIn, useSession } from 'next-auth/react'
import { ThemeToggle } from '@/components/theme-changer-button'

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const { setTheme, theme } = useTheme()
    const session = useSession()

    return (
        <div>
            <nav className="flex justify-center items-start p-4 space-x-2">
                <NavElement href="/">Home</NavElement>
                <NavElement href="/products">products</NavElement>
                <NavElement href="/orders">my orders</NavElement>

                {session.status === 'authenticated' ? (
                    <>
                        <Button onClick={() => signOut()}>Log out</Button>
                    </>
                ) : (
                    <>
                        <Button onClick={() => signIn()}>Log in</Button>
                    </>
                )}

                <NavElement className={'!ml-auto'} href="/admin">
                    admin
                </NavElement>
                <ThemeToggle />
            </nav>

            {children}
            <Toaster />
        </div>
    )
}
