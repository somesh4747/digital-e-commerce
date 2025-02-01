'use server'

import db from '@/lib/db'
import { productUpdateSchema } from '@/schemas'
import { revalidatePath } from 'next/cache'
import { notFound, redirect } from 'next/navigation'

import {
    S3Client,
    PutObjectCommand,
    DeleteObjectCommand,
} from '@aws-sdk/client-s3'
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
    const previousFileName = productDetails?.filePath.split('__').pop()
    // console.log(previousFileName);
    const previousImageName = productDetails?.imagePath.split('__').pop()
    // console.log(previousFileName);

    // https://sk-my-first-bucket.s3.ap-south-1.amazonaws.com/digital-e-commerce/images/dcc23d49-80b2-433e-8303-e1097194423a__Somesh_Karmakar_(2).png

    let filePath = undefined

    if (downloadableItem.size > 0) {
        const fileDeleteCommand = new DeleteObjectCommand({
            Bucket: process.env.NEXT_AWS_S3_BUCKET_NAME!,
            Key: `${productURL}/__${previousFileName}`,
        })
        await s3.send(fileDeleteCommand)

        const fileName = `__${crypto.randomUUID()}~~${downloadableItem.name
            .trim()
            .replace(/ /gi, '-')}`

        // creating and sending file to signedURL
        const fileUploadCommand = new PutObjectCommand({
            Bucket: process.env.NEXT_AWS_S3_BUCKET_NAME!,
            Key: `${productURL}/${fileName}`,
        })

        const signedUrlForFile = await getSignedUrl(s3, fileUploadCommand, {
            expiresIn: 200,
        })

        const response = await fetch(signedUrlForFile, {
            method: 'PUT',
            body: downloadableItem,
            headers: {
                'Content-type': downloadableItem.type,
            },
        })
        filePath = `https://${process.env.NEXT_AWS_S3_BUCKET_NAME}.s3.${process.env.NEXT_AWS_REGION}.amazonaws.com/${productURL}/${fileName}`
    }

    let imagePath = undefined

    if (image.size > 0) {
        const imageDeleteCommand = new DeleteObjectCommand({
            Bucket: process.env.NEXT_AWS_S3_BUCKET_NAME!,
            Key: `${productImageURL}/__${previousImageName}`,
        })
        await s3.send(imageDeleteCommand)

        //
        const imageName = `__${crypto.randomUUID()}~~${image.name
            .trim()
            .replace(/ /gi, '-')}`

        const imageUploadCommand = new PutObjectCommand({
            Bucket: process.env.NEXT_AWS_S3_BUCKET_NAME!,
            Key: `${productImageURL}/${imageName}`,
        })
        const signedUrlForImage = await getSignedUrl(s3, imageUploadCommand, {
            expiresIn: 200,
        })
        const response2 = await fetch(signedUrlForImage, {
            method: 'PUT',
            body: image,
            headers: {
                'Content-type': downloadableItem.type,
            },
        })

        imagePath = `https://${process.env.NEXT_AWS_S3_BUCKET_NAME}.s3.${process.env.NEXT_AWS_REGION}.amazonaws.com/${productImageURL}/${imageName}`
    }

    // creating file and image name

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
