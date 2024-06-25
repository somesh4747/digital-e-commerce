'use server'

import db from '@/lib/db'
import z from 'zod'

import { productsEntrySchema } from '@/schemas'
import fs from 'fs/promises'
import { error } from 'console'
import { redirect } from 'next/navigation'

export default async function productsEntry(
    prevState: unknown,
    formData: FormData
) {
    const validateFields = productsEntrySchema.safeParse(
        Object.fromEntries(formData.entries())
    )

    if (!validateFields.success) {
        return { error: validateFields.error.formErrors.fieldErrors }
    }

    const { itemName, description, priceInCents, downloadableItem, image } =
        validateFields.data

    await fs.mkdir('products', { recursive: true })
    const filePath = `products/${crypto.randomUUID()}-${itemName}`
    await fs.writeFile(
        filePath,
        Buffer.from(await downloadableItem.arrayBuffer())
    )

    await fs.mkdir('public/products', { recursive: true })
    const imagePath = `/products/${crypto.randomUUID()}-${itemName}`
    await fs.writeFile(
        `public${imagePath}`,
        Buffer.from(await downloadableItem.arrayBuffer())
    )
    // return
    await db.product.create({
        data: {
            name: itemName,
            description: description,
            priceInCents: priceInCents,
            filePath: filePath,
            imagePath: imagePath,
            isAvailableForPurchase: false,
        },
    })

    redirect('/admin/products')
    return { success: 'Product Added' }
}
