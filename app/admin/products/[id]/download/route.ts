import db from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import { notFound } from 'next/navigation'

export async function GET(
    req: NextRequest,
    { params: { id } }: { params: { id: string } }
) {
    const product = await db.product.findUnique({
        where: {
            id: id,
        },
    })
    if (!product) return notFound()

    const file = await fs.readFile(product.filePath)
    const { size } = await fs.stat(product.filePath)

    //using regex is fun and great approach
    const extension = product?.filePath.match(/\.([0-9a-z]+)(?:[\?#]|$)/i)[1]
    console.log(extension)
    //for getting the extension

    return new NextResponse(file, {
        headers: {
            'Content-Disposition': `attachment; filename=${product.name}.${extension}`,
            'Content-Length': size.toString(),
        },
    })
}
