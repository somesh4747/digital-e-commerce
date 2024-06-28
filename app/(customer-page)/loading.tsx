import React from 'react'

import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
    return (
        <div className="flex flex-col md:flex-row justify-center items-center gap-3 ">
            <Skeleton className="h-[400px] w-[300px]" />
            <div className="gap-3 flex flex-col items-start justify-center">
                <Skeleton className="h-[30px] w-[250px]" />
                <Skeleton className="h-[30px] w-[150px]" />
            </div>
        </div>
    )
}
