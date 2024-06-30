'use client'
import React, { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

import { formatter } from '@/lib/currency-formatter'
import productUpdate from '../../../_actions/update-product'

import { CgSpinnerAlt } from 'react-icons/cg'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

import { useToast } from '@/components/ui/use-toast'
import { useFormState, useFormStatus } from 'react-dom'
import db from '@/lib/db'
import { getProductDetails } from '@/app/admin/_actions/get-product'
import { useRouter } from 'next/navigation'

import Image from 'next/image'

function ProductEditPage({ params: { id } }: { params: { id: string } }) {
    const [priceInCents, setPriceInCents] = useState<any>()
    const [priceInRuppes, setPriceInRuppes] = useState<any>()
    const [productDetails, setproductDetails] = useState({
        name: '',
        description: '',
        file: '',
        image: '',
    })

    // const { toast } = useToast()
    const router = useRouter()
    // -------------------need to improve-------------------------------
    useEffect(() => {
        // 🤣🤣🤣🤣 lollllll
        const getLala = async () => {
            const data = await getProductDetails(id)

            if (data?.priceInCents) {
                setPriceInCents(data?.priceInCents)
                setPriceInRuppes(+data?.priceInCents / 100)
            }
            setproductDetails({
                name: data?.name || '',
                description: data?.description || '',
                file: data?.filePath || '',
                image: data?.imagePath || '',
            })

            router.refresh()
        }
        getLala()
    }, [router])
    // ------------------------------------------------------------
    const [response, action] = useFormState(productUpdate, {})
    const { pending } = useFormStatus()

    if (!productDetails) {
        return (
            <div className="text-2xl text-red-600 h-screen flex-center">
                Invalid Product id
            </div>
        )
    }

    return (
        <div className=" p-4 m-3">
            <div className="text-3xl font-medium flex justify-center">
                Update Product
            </div>

            <form action={action} className="space-y-6">
                <div>
                    {/* getting id  */}
                    <input
                        type="text"
                        value={id}
                        name="productId"
                        className="hidden"
                    />
                    {/* getting id  */}
                    <label htmlFor="itemName">Product name</label>
                    <Input
                        placeholder="Product name"
                        type="text"
                        name="itemName"
                        id="name"
                        defaultValue={productDetails.name}
                    />
                    <div className="text-red-400">
                        {response.error?.itemName
                            ? response.error.itemName
                            : ''}
                    </div>
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <Textarea
                        placeholder="Description"
                        name="description"
                        id="description"
                        defaultValue={productDetails.description}
                    />
                    <div className="text-red-400">
                        {response.error?.description
                            ? response.error.description
                            : ''}
                    </div>
                </div>

                <div>
                    <label htmlFor="priceInCents">Price in Cents</label>
                    <Input
                        placeholder="0"
                        type="number"
                        name="priceInCents"
                        value={priceInCents}
                        onChange={(e) => {
                            setPriceInCents(e.target.value)
                            setPriceInRuppes(+e.target.value / 100)
                        }}
                        id="priceInCents"
                        // defaultValue={productDetails.price}
                    />
                    <div className="text-red-400">
                        {response.error?.priceInCents
                            ? response.error.priceInCents
                            : ''}
                    </div>
                </div>
                <div>
                    <label htmlFor="priceInCents">
                        Price in Ruppes : {formatter.format(priceInRuppes)}
                    </label>
                    <Input
                        placeholder="0"
                        type="number"
                        name=""
                        value={priceInRuppes}
                        onChange={(e) => {
                            setPriceInRuppes(e.target.value)
                            setPriceInCents(+e.target.value * 100)
                        }}
                        id="priceInRuppes"
                    />
                </div>
                <div>
                    <div className="text-sky-400 my-3">
                        {productDetails.file
                            ? `Previous File : ${productDetails.file
                                  .split('__')
                                  .pop()}`
                            : ''}
                    </div>
                    <label htmlFor="downloadableItem">Product</label>
                    <Input
                        type="file"
                        name="downloadableItem"
                        id="downloadableItem"
                    />
                    <div className="text-red-400">
                        {response.error?.downloadableItem
                            ? response.error.downloadableItem
                            : ''}
                    </div>
                </div>
                <div>
                    <div className="text-sky-400 my-3">
                        {productDetails.image
                            ? `Previous Image : ${productDetails.image
                                  .split('__')
                                  .pop()}`
                            : ''}
                    </div>
                    <label htmlFor="image">Product image</label>
                    <Input type="file" name="image" id="image" />
                    <div className="text-red-400">
                        {response.error?.image ? response.error.image : ''}
                    </div>
                    <Image
                        className="my-5"
                        src={productDetails.image}
                        height="400"
                        width="200"
                        alt="product img"
                    />
                </div>

                <Button type="submit" disabled={pending} className="">
                    Update
                    <span
                        className={cn('animate-spin', {
                            invisible: !pending,
                        })}
                    >
                        {' '}
                        <CgSpinnerAlt />
                    </span>
                </Button>
            </form>
        </div>
    )
}

export default ProductEditPage
