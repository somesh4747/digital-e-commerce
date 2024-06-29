'use server'

import db from '@/lib/db'
import { productUpdateSchema } from '@/schemas'
import { revalidatePath } from 'next/cache'
import { notFound, redirect } from 'next/navigation'
import fs from 'fs/promises'

export default async function productUpdate(
    prevState: unknown,
    formData: FormData
): Promise<{ error?: any; success?: any }> {
    const validateFields = productUpdateSchema.safeParse(
        Object.fromEntries(formData.entries())
    )

    const productId = formData.get('productId')?.toString()

    if (!validateFields.success) {
        return { error: validateFields.error.formErrors.fieldErrors }
    }

    const { itemName, description, priceInCents, downloadableItem, image } =
        validateFields.data

    const productDetails = await db.product.findUnique({
        where: {
            id: productId,
        },
    })

    if (!productDetails) return notFound()

    let filePath = undefined

    if (downloadableItem.size > 0) {
        await fs.unlink(productDetails?.filePath)
        await fs.mkdir('products', { recursive: true })
        filePath = `products/${crypto.randomUUID()}__${downloadableItem.name}`
        await fs.writeFile(
            filePath,
            Buffer.from(await downloadableItem.arrayBuffer())
        )
    }

    let imagePath = undefined

    if (image.size > 0) {
        await fs.unlink(`public${productDetails?.imagePath}`)
        await fs.mkdir('public/products', { recursive: true })
        imagePath = `/products/${crypto.randomUUID()}__${image.name}`
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

    revalidatePath('/')
    revalidatePath('/products')
    redirect('/admin/products')
}
