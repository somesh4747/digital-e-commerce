import db from '@/lib/db'
import NewestProductGrid, {
    ProductCardSkeleton,
} from './_components/product-card'
import ProductCard from './_components/product-card'
import { Suspense } from 'react'
import { Product } from '@prisma/client'

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
        take: 5,
    })
}
async function getNewestProducts() {
    return await db.product.findMany({
        where: {
            isAvailableForPurchase: true,
        },
        orderBy: {
            cratedAt: 'desc',
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
    getFunction: () => Promise<Product[]>
}) {
    const newestProducts = await getFunction()

    return (
        <div className="flex flex-wrap justify-start items-start mt-7 gap-4">
            {newestProducts.map((product, index) => (
                <ProductCard
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
