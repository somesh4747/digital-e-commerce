'use client '

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function NavElement({
    children,
    href,
}: {
    children: React.ReactNode
    href: string
}) {
    const path = usePathname()
    return (
        <Link
            href={href}
            className={cn(
                {
                    'bg-gray-600': path === href,
                },
                'p-2 capitalize rounded-sm hover:bg-sky-700 transition-colors duration-300'
            )}
        >
            {children}
        </Link>
    )
}
