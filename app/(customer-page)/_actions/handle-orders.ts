'use server'

import db from '@/lib/db'
import { error } from 'console'

export default async function handleOrder(
    prev: unknown,
    formdata: FormData
): Promise<{ error?: string | undefined; success?: string | undefined }> {
    //
    const userEmail = formdata.get('email')?.toString()
    const userName = formdata.get('name')?.toString()
    const productId = formdata.get('productId')?.toString()

    // console.log(userEmail)

    if (!userEmail) return { error: 'not valid email' }
    if (!userName) return { error: 'not valid userName' }
    if (!productId) return { error: 'not valid productId' }

    const product = await db.product.findUnique({
        where: {
            id: productId,
        },
    })

    if (!product) return { error: 'Invalid product' }

    const previousOrder = await db.user.findUnique({
        where: {
            email: userEmail,
        },
        select: {
            order: { where: { productId: productId } },
        },
    })

    if (previousOrder && previousOrder.order.length > 0) {
        return {
            error: 'You have already purchased it',
        }
    }

    const {
        order: [order],
    } = await db.user.upsert({
        where: { email: userEmail },
        create: {
            email: userEmail,
            name: userName,
            order: {
                create: {
                    productId: productId,
                    pricePaidInCents: product?.priceInCents,
                },
            },
        },
        update: {
            email: userEmail,
            order: {
                create: {
                    productId: productId,
                    pricePaidInCents: product?.priceInCents,
                },
            },
        },
        select: {
            order: { orderBy: { createdAt: 'desc' }, take: 1 },
        },
    })

    return {
        success: 'order Placed successfully',
    }
}
