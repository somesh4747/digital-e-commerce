'use server'

import db from '@/lib/db'
import {
    S3Client,
    PutObjectCommand,
    DeleteObjectCommand,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { revalidatePath } from 'next/cache'

const productURL = 'digital-e-commerce/products'
const productImageURL = 'digital-e-commerce/images'

const s3 = new S3Client({
    region: process.env.NEXT_AWS_REGION!,
    credentials: {
        accessKeyId: process.env.NEXT_AWS_ACCESS_KEY!,
        secretAccessKey: process.env.NEXT_AWS_ACCESS_SECRET_KEY!,
    },
})
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

    const previousFileName = product?.filePath.split('__').pop()
    //
    const previousImageName = product?.imagePath.split('__').pop()

    const fileDeleteCommand = new DeleteObjectCommand({
        Bucket: process.env.NEXT_AWS_S3_BUCKET_NAME!,
        Key: `${productURL}/__${previousFileName}`,
    })
    await s3.send(fileDeleteCommand)

    const imageDeleteCommand = new DeleteObjectCommand({
        Bucket: process.env.NEXT_AWS_S3_BUCKET_NAME!,
        Key: `${productImageURL}/__${previousImageName}`,
    })
    await s3.send(imageDeleteCommand)

    revalidatePath('/admin/products')
}
