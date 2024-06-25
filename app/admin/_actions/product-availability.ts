'use server'

import db from '@/lib/db'
import fs from 'fs/promises'

export async function changeProductStatus(productId: string, status: boolean) {
    await db.product.update({
        where: {
            id: productId,
        },
        data: {
            isAvailableForPurchase: status,
        },
    })
}
export async function deleteProduct(productId: string, status?: boolean) {
    const product = await db.product.delete({
        where: {
            id: productId,
        },
    })

    await fs.unlink(product.filePath)
    await fs.unlink(`public${product.imagePath}`)
}
