import { auth } from '@/auth'
import db from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
    req: NextRequest,
    { params: { id } }: { params: { id: string } }
) {
    const session = auth()

    if (!session)
        return new NextResponse('Unauthorized', {
            status: 401,
        })

    const product = await db.product.findUnique({
        where: {
            id: id,
        },
    })
    if (!product)
        return new NextResponse('invalid product', {
            status: 404,
        })

    const response = await fetch(product.filePath, {
        method: 'GET',
    })

    const blob = await response.blob()

    const objectURL = URL.createObjectURL(blob)
    const size = blob.size
    // console.log(objectURL)

    // getting the file extension
    const path = product.filePath.split('?')[0] // Remove query parameters if present
    const parts = path.split('/')
    const filename = parts[parts.length - 1]
    const extension = filename.split('.').pop()

    return new NextResponse(blob, {
        headers: {
            'Content-Disposition': `attachment; filename=${product.name}.${extension}`,
            'Content-Length': size.toString(),
        },
    })
}
