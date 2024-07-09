'use client'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { getSpecificProducts } from '../../_actions/search-products'
import ProductCard from '../../_components/product-card'

import useSWR from 'swr'

function SearchResultProducts() {
    const [products, setproducts] = useState<
        {
            name: string
            priceInCents: number
            imagePath: string
            description: string
            id: string
        }[]
    >([])

    const search = useSearchParams()
    const query = search.get('q')
    // console.log(query);

    async function fetcher() {
        return await getSpecificProducts(query)
    }

    const { data, error, isLoading } = useSWR(query, fetcher)
    // useEffect(() => {
    //     async function get() {
    //         const p = await getSpecificProducts(query)
    //         setproducts([])
    //         p.forEach((e) => setproducts((prev) => [...prev, e]))
    //     }

    //     get()
    // }, [query])
    return (
        <div className="flex flex-wrap justify-start items-start mt-7  gap-4">
            {data?.length ? (
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
                <>{isLoading ? 'loading...' : 'not found'}</>
            )}
        </div>
    )
}

export default SearchResultProducts
