'use client'
import React, { useState } from 'react'
import { cn } from '@/lib/utils'

import { formatter } from '@/lib/currency-formatter'
import productsEntry from '../../_actions/new-entry'

import { CgSpinnerAlt } from 'react-icons/cg'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

import { useToast } from '@/components/ui/use-toast'
import { useFormState, useFormStatus } from 'react-dom'

function NewProductEntry() {
    const [priceInCents, setPriceInCents] = useState<any>()
    const [priceInRuppes, setPriceInRuppes] = useState<any>(0)

    const { toast } = useToast()

    const [response, action] = useFormState(productsEntry, {})
    const { pending } = useFormStatus()

    return (
        <div className=" p-4 m-3">
            <div className="text-3xl font-medium flex justify-center">
                New Product
            </div>

            <form action={action} className="space-y-6">
                <div>
                    <label htmlFor="itemName">Product name</label>
                    <Input
                        placeholder="Product name"
                        type="text"
                        name="itemName"
                        required
                        id="name"
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
                        required
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
                        required
                        value={priceInCents}
                        onChange={(e) => {
                            setPriceInCents(e.target.value)
                            setPriceInRuppes(+e.target.value / 100)
                        }}
                        id="priceInCents"
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
                        required
                        id="priceInRuppes"
                    />
                </div>
                <div>
                    <label htmlFor="downloadableItem">Product</label>
                    <Input
                        type="file"
                        name="downloadableItem"
                        id="downloadableItem"
                        required
                    />
                    <div className="text-red-400">
                        {response.error?.downloadableItem
                            ? response.error.downloadableItem
                            : ''}
                    </div>
                </div>
                <div>
                    <label htmlFor="image">Product image</label>
                    <Input type="file" name="image" id="image" required />
                    <div className="text-red-400">
                        {response.error?.image ? response.error.image : ''}
                    </div>
                </div>

                <Button type="submit" disabled={pending} className="">
                    Add
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

export default NewProductEntry
