import React from 'react'
import { LuLoader2 } from 'react-icons/lu'

import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
    return (
        <div className="flex flex-col md:flex-row justify-center items-center gap-3 min-h-screen">
            <LuLoader2 className="animate-spin text-lime-300 size-20" />
            {/* <Skeleton className="h-[400px] w-[300px]" />
            <div className="gap-3 flex flex-col items-start justify-center">
                <Skeleton className="h-[30px] w-[250px]" />
                <Skeleton className="h-[30px] w-[150px]" />
            </div> */}
        </div>
    )
}
