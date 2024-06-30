'use client '

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function NavElement({
    children,
    href,
    className,
}: {
    children: React.ReactNode
    href: string
    className?: string
}) {
    const path = usePathname()
    return (
        <Link
            href={href}
            className={cn(
                {
                    'dark:bg-gray-600': path === href,
                    'bg-sky-400': path === href,
                },
                'p-2 capitalize rounded-sm dark:hover:bg-sky-700 hover:bg-sky-200 transition-colors duration-300 shadow-lg',
                className
            )}
        >
            {children}
        </Link>
    )
}
