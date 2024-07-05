import db from '@/lib/db'
import { ProductCardSkeleton } from './_components/product-card'
import ProductCard from './_components/product-card'
import { Suspense } from 'react'

async function getPopularProducts() {
    return await db.product.findMany({
        where: {
            isAvailableForPurchase: true,
        },
        orderBy: {
            order: {
                _count: 'desc',
            },
        },
        select: {
            id: true,
            name: true,
            description: true,
            priceInCents: true,
            imagePath: true,
            cratedAt: true,
        },

        take: 5,
    })
}
const getNewestProducts = async () => {
    return await db.product.findMany({
        where: {
            isAvailableForPurchase: true,
        },
        orderBy: {
            cratedAt: 'desc',
        },
        select: {
            id: true,
            name: true,
            description: true,
            priceInCents: true,
            imagePath: true,
            cratedAt: true,
        },
        take: 5,
    })
}

export default async function Home() {
    return (
        <main className="mt-[50px] mx-4">
            <div className="text-3xl font-bold">New Products</div>
            <Suspense
                fallback={
                    <div className="">
                        <ProductCardSkeleton />
                        <ProductCardSkeleton />
                        <ProductCardSkeleton />
                        <ProductCardSkeleton />
                    </div>
                }
            >
                <ActualProductElements getFunction={getNewestProducts} />
            </Suspense>

            <div className="text-3xl font-bold my-6">Popular Products</div>
            <Suspense
                fallback={
                    <div className="">
                        <ProductCardSkeleton />
                        <ProductCardSkeleton />
                        <ProductCardSkeleton />
                        <ProductCardSkeleton />
                    </div>
                }
            >
                <ActualProductElements getFunction={getPopularProducts} />
            </Suspense>
        </main>
    )
}

async function ActualProductElements({
    getFunction,
}: {
    getFunction: () => Promise<
        {
            id: string
            name: string
            priceInCents: number
            imagePath: string
            description: string
            cratedAt: Date
        }[]
    >
}) {
    const newestProducts = await getFunction()

    return (
        <div className="flex flex-wrap justify-start items-start mt-7 gap-4">
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
