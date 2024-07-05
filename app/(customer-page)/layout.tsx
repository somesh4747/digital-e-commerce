'use client'
import NavElement from '@/components/navbar'
import { useTheme } from 'next-themes'

import { Toaster } from '@/components/ui/toaster'
import { Button } from '@/components/ui/button'
import { signOut, signIn, useSession } from 'next-auth/react'
import { ThemeToggle } from '@/components/theme-changer-button'
import { useState } from 'react'
import { X, AlignJustify } from 'lucide-react'

import { cn } from '@/lib/utils'
export const dynamic = 'force-dynamic'

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    // getting session
    const session = useSession()
    const [isMobileMenu, setisMobileMenu] = useState(false)

    return (
        <div>
            <Button
                variant={'outline'}
                className="m-4 md:hidden"
                onClick={() => setisMobileMenu((prev) => !prev)}
            >
                {isMobileMenu ? <X size={20} /> : <AlignJustify size={20} />}
            </Button>
            <nav
                className={cn(
                    'p-4 md:space-x-2 flex-col md:flex-row md:flex justify-center items-start hidden dark:bg-zinc-900 rounded-lg m-4 dark:border dark:border-gray-800 shadow-xl',
                    {
                        '!flex': isMobileMenu,
                    }
                )}
            >
                <NavElement
                    onClick={() => setisMobileMenu((prev) => !prev)}
                    href="/"
                >
                    Home
                </NavElement>
                <NavElement
                    onClick={() => setisMobileMenu((prev) => !prev)}
                    href="/products"
                >
                    products
                </NavElement>
                <NavElement
                    onClick={() => setisMobileMenu((prev) => !prev)}
                    href="/orders"
                >
                    my orders
                </NavElement>

                {session.status === 'authenticated' ? (
                    <Button
                        onClick={() => signOut()}
                        variant={'link'}
                        className={'!ml-auto'}
                    >
                        Log out
                    </Button>
                ) : (
                    <Button
                        onClick={() => signIn()}
                        variant={'secondary'}
                        className={'!ml-auto'}
                    >
                        Log in
                    </Button>
                )}

                {/* <NavElement className={''} href="/admin">
                    admin
                </NavElement> */}
                <ThemeToggle />
            </nav>

            {children}
            <Toaster />
        </div>
    )
}
