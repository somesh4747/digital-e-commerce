'use client'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import {
    changeProductStatus,
    deleteProduct,
} from '../../_actions/product-availability'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/dist/server/api-utils'
import { useRouter } from 'next/navigation'

export function ToggleProductStatus({
    productId,
    available,
}: {
    productId: string
    available: boolean
}) {
    //using router to refresh the page
    const router = useRouter()
    return (
        <DropdownMenuItem
            onClick={async () => {
                await changeProductStatus(productId, !available)
                router.refresh()
            }}
        >
            {available ? 'in-active' : 'active'}
        </DropdownMenuItem>
    )
}
export function DeleteProduct({
    productId,
    orderCount,
}: {
    productId: string
    orderCount: number
}) {
    //using router to refresh the page
    const router = useRouter()
    return (
        <DropdownMenuItem
            disabled={orderCount > 0 ? true : false}
            onClick={async () => {
                await deleteProduct(productId)
                router.refresh()
            }}
            className="text-red-600"
        >
            Delete
        </DropdownMenuItem>
    )
}
