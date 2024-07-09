'use client'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from './ui/button'
import { Dispatch, SetStateAction } from 'react'

export default function NavElement({
    children,
    href,
    className,
    onClick,
}: {
    children?: React.ReactNode
    href: string
    className?: string
    onClick?: React.MouseEventHandler
}) {
    const path = usePathname()

    return (
        <Link
            onClick={onClick}
            href={href || ''}
            className={cn(
                {
                    'dark:!bg-lime-700': path == href,
                    '!bg-sky-400': path == href,
                    '!text-white': path == href,
                },
                'p-2 my-2 md:m-0 capitalize rounded-md text-black bg-slate-100 dark:bg-stone-800 hover:bg-sky-700 transition-all duration-300 hover:px-6 hover:text-white dark:text-white w-full md:w-auto text-center  ',
                className
            )}
        >
            {children}
        </Link>
    )
}
