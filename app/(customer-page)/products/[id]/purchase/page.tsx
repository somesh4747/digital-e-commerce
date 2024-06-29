import { Button } from '@/components/ui/button'
import { formatter } from '@/lib/currency-formatter'
import db from '@/lib/db'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default async function ProductPurchasePage({
    params: { id },
}: {
    params: { id: string }
}) {
    const product = await db.product.findUnique({
        where: { id: id },
        select: {
            imagePath: true,
            name: true,
            description: true,
            priceInCents: true,
        },
    })

    if (!product)
        return (
            <div className="capitalize text-3xl text-red-400 mt-5 m-6  ">
                Invalid product ID
            </div>
        )

    return (
        <div className="flex justify-center md:flex-row-reverse flex-col-reverse items-center m-5 flex-wrap gap-7">
            <div className="space-y-2 flex flex-col justify-center items-center text-center md:text-left md:items-start max-w-[500px]">
                <div className="text-2xl capitalize ">{product.name}</div>
                <p className="text-gray-500">{product.description}</p>
                <Button asChild className="font-medium">
                    <Link href={`/products/${id}/payment `}>
                        Pay {formatter.format(product.priceInCents / 100)}
                    </Link>
                </Button>
            </div>
            <div className="relative max-w-[500px] rounded-xl">
                <img
                    src={product.imagePath}
                    className="w-full rounded-lg shadow-2xl "
                />
            </div>
        </div>
    )
}
