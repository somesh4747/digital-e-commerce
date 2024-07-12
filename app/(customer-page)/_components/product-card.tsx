import React from 'react'
import {
    Card,
    CardDescription,
    CardHeader,
    CardContent,
    CardTitle,
    CardFooter,
} from '@/components/ui/card'
import Image from 'next/image'
import { formatter } from '@/lib/currency-formatter'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { IoStarSharp } from 'react-icons/io5'

import Link from 'next/link'

export default function ProductCard({
    name,
    description,
    image,
    price,
    productId,
}: {
    productId: string
    name: string
    description?: string
    price: number
    image?: string
}) {
    return (
        <Card className="w-full md:max-w-[300px] relative shadow-lg border-0 rounded-xl dark:border-gray-700 backdrop-blur-lg bg-black/30 overflow-hidden ">
            {/* image */}
            <div className=" relative w-full h-auto aspect-video overflow-hidden flex justify-center items-center rounded-t-md">
                <img src={image} className="w-full h-auto" alt={name} />
            </div>
            {/* heading */}
            <div className="pt-4 text-center">
                <CardTitle className="capitalize py-2 font-medium">{name}</CardTitle>
                <CardDescription className="font-light line-clamp-2 h-9 my-1 justify-center items-center">
                    {description}
                </CardDescription>
            </div>
            {/* rating system */}
            <div className="py-2 flex justify-center items-center text-yellow-400 space-x-1">
                <IoStarSharp />
                <IoStarSharp />
                <IoStarSharp />
                <IoStarSharp />
                <IoStarSharp />
            </div>

            {/* price */}
            <div className="p-2 font-medium text-2xl tracking-wide text-center">
                {formatter.format(price)}
            </div>

            {/* purchase button */}
            <div className="mt-4">
                <Button
                    asChild
                    className="w-full bg-lime-800 p-6 text-xl !rounded-none"
                    variant={'outline'}
                >
                    <Link href={`/products/${productId}/purchase`}>
                        Purchase
                    </Link>
                </Button>
            </div>
        </Card>
    )
}

export function ProductCardSkeleton() {
    return (
        <Card className=" w-[300px] m-3 inline-block shadow-lg">
            <div className=" w-full h-auto aspect-video ">
                <Skeleton className="w-auto h-full  m-4 rounded-md" />
            </div>
            <CardHeader>
                <Skeleton className="w-auto h-[30px] " />
                <Skeleton className="w-[150px] h-[30px] " />
            </CardHeader>

            <div className="m-3">
                <Skeleton className="w-auto h-[30px]" />
            </div>
        </Card>
    )
}
