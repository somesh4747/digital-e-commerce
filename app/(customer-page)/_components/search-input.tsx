'use client'
import React, { Suspense, useEffect, useState } from 'react'
import ProductCard, { ProductCardSkeleton } from '../_components/product-card'
import { Input } from '@/components/ui/input'
import useSWR from 'swr'
import { getSpecificProducts, getProducts } from '../_actions/search-products'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { FaSearch } from 'react-icons/fa'

export default function SearchProductsComponent() {
    const [searchText, setSearchText] = useState('')
    const router = useRouter()
    const search = useSearchParams()
    const query = search.get('q')

    async function fetcher() {
        return await getSpecificProducts(query)
    }

    // const [products, setproducts] = useState<
    //     {
    //         name: string
    //         priceInCents: number
    //         imagePath: string
    //         description: string
    //         id: string
    //     }[]
    // >([])
    // useEffect(() => {
    //     async function get() {
    //         const p = await getSpecificProducts(query)
    //         setproducts([])
    //         p.forEach((e) => setproducts((prev) => [...prev, e]))
    //     }

    //     get()
    // }, [query])

    //------- using swr for better data-handing ------------------
    const { data, error, isLoading } = useSWR(`/products?q=${query}`, fetcher)
    //------------------------------------------------------------

    return (
        <main className="mt-[5px] mx-4 h-[100%] pb-32">
            
            <div className="flex justify-center items-center">
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        const encodedURL = encodeURI(searchText)
                        router.push(`/products?q=${encodedURL}`)
                        router.refresh()
                    }}
                    className="w-2/3 relative"
                >
                    <button
                        type="submit"
                        className="absolute top-[13px] right-3 "
                    >
                        <FaSearch className=" " />
                    </button>
                    <Input
                        className={
                            'dark:bg-zinc-700 bg-slate-100 dark:border-0 border border-slate-400 shadow-lg rounded-full !ring-offset-0 !ring-sky-300 dark:!ring-lime-400'
                        }
                        type="text"
                        placeholder="Search Products"
                        onChange={(e) => {
                            setSearchText(e.target.value)
                        }}
                        disabled={isLoading}
                        value={searchText}
                    />
                </form>
            </div>
            <div className="flex flex-wrap justify-start items-start mt-7  gap-4">
                {data ? (
                    data.map((product, index) => (
                        <ProductCard
                            productId={product.id}
                            key={index}
                            name={product.name}
                            image={product.imagePath}
                            description={product.description}
                            price={product.priceInCents / 100}
                        />
                    ))
                ) : (
                    <>
                        {isLoading ? (
                            <div className="">
                                <ProductCardSkeleton />
                                <ProductCardSkeleton />
                                <ProductCardSkeleton />
                                <ProductCardSkeleton />
                                <ProductCardSkeleton />
                            </div>
                        ) : (
                            'not found'
                        )}
                    </>
                )}
            </div>
            {/* <Suspense
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
            </Suspense> */}
        </main>
    )
}

// async function SuspenseElement() {
//     const newestProducts = await db.product.findMany({
//         where: {
//             isAvailableForPurchase: true,
//         },
//         select: {
//             id: true,
//             name: true,
//             description: true,
//             priceInCents: true,
//             imagePath: true,
//         },
//         orderBy: {
//             name: 'asc',
//         },
//     })

//     return (
//         <div className="flex flex-wrap justify-start items-start mt-7  gap-4">
//             {newestProducts.map((product, index) => (
//                 <ProductCard
//                     productId={product.id}
//                     key={index}
//                     name={product.name}
//                     image={product.imagePath}
//                     description={product.description}
//                     price={product.priceInCents / 100}
//                 />
//             ))}
//         </div>
//     )
// }
