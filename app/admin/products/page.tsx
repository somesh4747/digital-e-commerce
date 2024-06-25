import React from 'react'
import AdminPageHeader from '../_components/page-header'
import { Button } from '@/components/ui/button'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import Link from 'next/link'

import db from '@/lib/db'
import { formatter } from '@/lib/currency-formatter'
import { RiCheckboxCircleLine } from 'react-icons/ri'
import { RiCheckboxBlankCircleLine } from 'react-icons/ri'
import { MdMoreVert } from 'react-icons/md'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import {
    DeleteProduct,
    ToggleProductStatus,
} from './_components/product-status-change'

export default async function () {
    const products = await db.product.findMany({
        select: {
            id: true,
            filePath: true,
            priceInCents: true,
            isAvailableForPurchase: true,
            name: true,
            _count: { select: { order: true } },
        },

        orderBy: { name: 'asc' },
    })
    console.log(products)

    return (
        <>
            <div className="flex justify-center gap-4">
                <AdminPageHeader>Products</AdminPageHeader>
                <Button asChild variant={'default'}>
                    <Link href={'/admin/products/new'}>Add Product</Link>
                </Button>
            </div>

            <Table className="">
                <TableHeadContent />
                <TableBody>
                    {products.map((product, index) => {
                        return (
                            <TableRow key={index}>
                                <TableCell>
                                    {product.isAvailableForPurchase ? (
                                        <RiCheckboxCircleLine className="scale-[1.7]" />
                                    ) : (
                                        <RiCheckboxBlankCircleLine className="scale-[1.7]" />
                                    )}
                                </TableCell>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>
                                    {formatter.format(
                                        product.priceInCents / 100
                                    )}
                                </TableCell>
                                <TableCell>{product._count.order}</TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <MdMoreVert className="scale-[1.7]" />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem className="">
                                                <a
                                                    href={`/admin/products/${product.id}/download`}
                                                >
                                                    Download
                                                </a>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="">
                                                <Link
                                                    href={`/admin/products/${product.id}/update`}
                                                >
                                                    Update
                                                </Link>
                                            </DropdownMenuItem>
                                            <ToggleProductStatus
                                                productId={product.id}
                                                available={
                                                    product.isAvailableForPurchase
                                                }
                                            />
                                            <DropdownMenuSeparator />
                                            <DeleteProduct
                                                productId={product.id}
                                                orderCount={
                                                    product._count.order
                                                }
                                            />
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </>
    )
}

const TableHeadContent = () => {
    return (
        <TableHeader>
            <TableRow>
                <TableHead>Available</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Orders</TableHead>
            </TableRow>
        </TableHeader>
    )
}
const TableBodyContent = ({
    name,
    price,
    orders,
}: {
    name?: string
    price?: number
    orders?: string
}) => {
    return (
        <TableRow>
            <TableCell>{name}</TableCell>
            <TableCell>{price}</TableCell>
            <TableCell>{orders}</TableCell>
        </TableRow>
    )
}
