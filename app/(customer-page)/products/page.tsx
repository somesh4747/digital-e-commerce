import React, { Suspense } from 'react'
import ProductCard, { ProductCardSkeleton } from '../_components/product-card'
import db from '@/lib/db'

export default async function Home() {
    return (
        <main className="mt-[50px] mx-4">
            <Suspense
                fallback={
                    <div className="">
                        <ProductCardSkeleton />
                        <ProductCardSkeleton />
                        <ProductCardSkeleton />
                        <ProductCardSkeleton />
                        <ProductCardSkeleton />
                    </div>
                }
            >
                <SuspenseElement />
            </Suspense>
        </main>
    )
}

async function SuspenseElement() {
    const newestProducts = await db.product.findMany({
        where: {
            isAvailableForPurchase: true,
        },
        select: {
            id: true,
            name: true,
            description: true,
            priceInCents: true,
            imagePath: true,
        },
        orderBy: {
            name: 'asc',
        },
    })

    return (
        <div className="flex flex-wrap justify-start items-start mt-7  gap-4">
            {newestProducts.map((product, index) => (
                <ProductCard
                    productId={product.id}
                    key={index}
                    name={product.name}
                    image={product.imagePath}
                    description={product.description}
                    price={product.priceInCents / 100}
                />
            ))}
        </div>
    )
}
