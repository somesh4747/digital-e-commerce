'use server'
import db from '@/lib/db'
export const getSpecificProducts = async (str: string | any) => {
    if (str === '0' || str === '' || str === null) {
        const result = await db.product.findMany({
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
        return result
    }
    const result = await db.product.findMany({
        where: {
            OR: [
                {
                    name: {
                        contains: str,
                        mode: 'insensitive',
                    },
                    isAvailableForPurchase: true,
                },
                {
                    description: {
                        contains: str,
                        mode: 'insensitive',
                    },
                    isAvailableForPurchase: true,
                },
            ],
        },
        select: {
            imagePath: true,
            name: true,
            description: true,
            priceInCents: true,
            id: true,
        },
    })

    return result
}
export const getProducts = async () => {
    const result = await db.product.findMany({
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
    return result
}
