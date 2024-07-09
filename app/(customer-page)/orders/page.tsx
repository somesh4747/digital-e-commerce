// 'use client'
import React from 'react'
import { signIn, auth } from '@/auth'
import { Button } from '@/components/ui/button'
import db from '@/lib/db'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default async function UserOrdersPage() {
    const session = await auth()

    if (!session)
        return (
            <>
                <div className="flex justify-center items-center h-screen">
                    <form
                        action={async () => {
                            'use server'
                            await signIn()
                        }}
                    >
                        <Button>Log in first</Button>
                    </form>
                </div>
            </>
        )

    const orders = await db.user.findUnique({
        where: {
            email: session?.user?.email,
        },
        select: {
            order: true,
        },
    })

    if (!orders)
        return (
            <>
                <div className="flex justify-center items-center">
                    no orders
                </div>
            </>
        )

    let productArray = []

    for (let i of orders.order) {
        const product = await db.product.findUnique({
            where: {
                id: i.productId,
            },
        })
        productArray.push(product)
    }

    // console.log(productArray)

    return (
        <>
            <div className="flex justify-center items-center gap-3 flex-col md:flex-row flex-wrap p-4 h-full">
                {productArray.map((item, index) => {
                    return (
                        <div key={index}>
                            <Card className="w-full md:max-w-[300px] relative shadow-lg">
                                <div className=" relative w-full h-auto aspect-video overflow-hidden rounded-t-md">
                                    <img
                                        src={item?.imagePath}
                                        className="w-full h-auto"
                                        alt={item?.name}
                                    />
                                </div>
                                <div className="p-4">
                                    <CardTitle className="capitalize">
                                        {item?.name}
                                    </CardTitle>
                                    <CardDescription className="line-clamp-2 h-9 my-2">
                                        {item?.description}
                                    </CardDescription>
                                </div>
                                <div className="m-3">
                                    <Button
                                        asChild
                                        className="w-full"
                                        variant={'link'}
                                    >
                                        <Link
                                            href={`/orders/${item?.id}/download`}
                                            target="_blank"
                                        >
                                            Download
                                        </Link>
                                    </Button>
                                </div>
                            </Card>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
