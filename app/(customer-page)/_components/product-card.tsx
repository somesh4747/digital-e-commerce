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
        <Card className="w-full md:max-w-[300px] relative shadow-lg border-0 dark:border-gray-700 dark:bg-gradient-to-b  dark:from-black to-transparent dark:bg-transparent">
            <div className=" relative w-full h-auto aspect-video overflow-hidden rounded-t-md">
                <img src={image} className="w-full h-auto" alt={name} />
            </div>
            <div className="p-4">
                <CardTitle className="capitalize">{name}</CardTitle>
                <CardDescription className="line-clamp-2 h-9 my-2">
                    {description}
                </CardDescription>
            </div>
            <div className="m-3">
                <Button asChild className="w-full">
                    <Link href={`/products/${productId}/purchase`}>
                        Purchase
                    </Link>
                </Button>
            </div>
            <div className="p-4 font-medium text-2xl tracking-wide hover:text-red-500">
                {formatter.format(price)}
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
