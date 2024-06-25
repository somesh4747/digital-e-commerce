'use server'

import db from '@/lib/db'
import { productUpdateSchema } from '@/schemas'
import fs from 'fs/promises'
import { redirect } from 'next/navigation'

export default async function productUpdate(
    prevState: unknown,
    formData: FormData
) {
    const validateFields = productUpdateSchema.safeParse(
        Object.fromEntries(formData.entries())
    )

    const productId = formData.get('productId')?.toString()

    if (!validateFields.success) {
        return { error: validateFields.error.formErrors.fieldErrors }
    }

    const { itemName, description, priceInCents, downloadableItem, image } =
        validateFields.data

    let filePath = undefined

    if (downloadableItem.size > 0) {
        await fs.mkdir('products', { recursive: true })
        filePath = `products/${crypto.randomUUID()}-${downloadableItem.name}`
        await fs.writeFile(
            filePath,
            Buffer.from(await downloadableItem.arrayBuffer())
        )
    }

    let imagePath = undefined

    if (image.size > 0) {
        await fs.mkdir('public/products', { recursive: true })
        imagePath = `/products/${crypto.randomUUID()}-${image.name}`
        await fs.writeFile(
            `public${imagePath}`,
            Buffer.from(await image.arrayBuffer())
        )
    }

    await db.product.update({
        where: {
            id: productId,
        },
        data: {
            name: itemName || undefined,
            description: description || undefined,
            priceInCents: priceInCents || undefined,
            filePath: filePath,
            imagePath: imagePath,
        },
    })

    redirect('/admin/products')
}
