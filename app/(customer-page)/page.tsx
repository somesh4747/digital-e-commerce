import db from '@/lib/db'
import { ProductCardSkeleton } from './_components/product-card'
import ProductCard from './_components/product-card'
import { Suspense } from 'react'
import Image from 'next/image'

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
        take: 4,
    })
}

export default async function Home() {
    return (
        <main className="mt-[50px] m-4 overflow-x-hidden">
            <div className=" flex flex-wrap items-center md:mb-16 md:justify-between ">
                <div className="">
                    <h1 className="text-5xl md:text-8xl font-medium ">
                        Digital-Store <br /> Somesh
                    </h1>
                    <p className="text-slate-300 capitalize md:text-2xl text-xl my-3 inline-block">
                        Find your Digital Products Here
                    </p>
                </div>
                <div className="w-auto my-10 flex md:block justify-center items-center  animate-spin-slow">
                    <Image
                        src={'/hero_logo.webp'}
                        height={400}
                        width={300}
                        alt="logo"
                        className="w-full h-auto rounded-full"
                    />
                </div>
            </div>
            {/* new products */}
            <div className="text-center">
                <div className="text-4xl font-light italic my-10">
                    New Products
                </div>
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
            </div>

            {/* popular products */}
            <div className="text-center">
                <div className="text-4xl font-light italic my-10 mt-20">
                    Popular Products
                </div>
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
            </div>
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
        <div className="flex flex-wrap justify-center items-center mt-7 gap-4">
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
