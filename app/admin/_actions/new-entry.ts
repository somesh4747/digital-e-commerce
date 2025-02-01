'use server'

import db from '@/lib/db'

import { productsEntrySchema } from '@/schemas'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const productURL = 'digital-e-commerce/products'
const productImageURL = 'digital-e-commerce/images'

const s3 = new S3Client({
    region: process.env.NEXT_AWS_REGION!,
    credentials: {
        accessKeyId: process.env.NEXT_AWS_ACCESS_KEY!,
        secretAccessKey: process.env.NEXT_AWS_ACCESS_SECRET_KEY!,
    },
})

export default async function productsEntry(
    prevState: unknown,
    formData: FormData
): Promise<{ error?: any; success?: any }> {
    const validateFields = productsEntrySchema.safeParse(
        Object.fromEntries(formData.entries())
    )

    if (!validateFields.success) {
        return { error: validateFields.error.formErrors.fieldErrors }
    }

    const { itemName, description, priceInCents, downloadableItem, image } =
        validateFields.data

    // creating file and image name
    const fileName = `__${crypto.randomUUID()}~~${downloadableItem.name
        .trim()
        .replace(/ /gi, '-')}`
    const imageName = `__${crypto.randomUUID()}~~${image.name
        .trim()
        .replace(/ /gi, '-')}`

    // creating and sending file to signedURL
    const fileUploadCommand = new PutObjectCommand({
        Bucket: process.env.NEXT_AWS_S3_BUCKET_NAME!,
        Key: `${productURL}/${fileName}`,
    })
    const imageUploadCommand = new PutObjectCommand({
        Bucket: process.env.NEXT_AWS_S3_BUCKET_NAME!,
        Key: `${productImageURL}/${imageName}`,
    })

    const signedUrlForFile = await getSignedUrl(s3, fileUploadCommand, {
        expiresIn: 200,
    })
    const signedUrlForImage = await getSignedUrl(s3, imageUploadCommand, {
        expiresIn: 200,
    })

    const response = await fetch(signedUrlForFile, {
        method: 'PUT',
        body: downloadableItem,
        headers: {
            'Content-type': downloadableItem.type,
        },
    })
    const response2 = await fetch(signedUrlForImage, {
        method: 'PUT',
        body: image,
        headers: {
            'Content-type': downloadableItem.type,
        },
    })

    // https://sk-my-first-bucket.s3.ap-south-1.amazonaws.com/digital-e-commerce/products/245c4f73-f9a5-4749-a2a4-3373ae6d3b7c__for_downloading_.png

    const filePath = `https://${process.env.NEXT_AWS_S3_BUCKET_NAME}.s3.${process.env.NEXT_AWS_REGION}.amazonaws.com/${productURL}/${fileName}`
    const imagePath = `https://${process.env.NEXT_AWS_S3_BUCKET_NAME}.s3.${process.env.NEXT_AWS_REGION}.amazonaws.com/${productImageURL}/${imageName}`
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

    revalidatePath('/')
    revalidatePath('/products')
    redirect('/admin/products')
    return { success: 'Product Added' }
}
