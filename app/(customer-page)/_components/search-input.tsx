'use client'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { FaSearch } from 'react-icons/fa'

export default function SearchInput() {
    const [searchText, setSearchText] = useState('')
    const router = useRouter()
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                const encodedURL = encodeURI(searchText)
                router.push(`/products?q=${encodedURL}`)
                router.refresh()
            }}
            className="w-2/3 relative"
        >
            <FaSearch className="absolute top-[13px] right-3 " />
            <Input
                className={'bg-zinc-700 rounded-full '}
                type="text"
                placeholder="Search Products"
                onChange={(e) => {
                    setSearchText(e.target.value)
                }}
                value={searchText}
            />
        </form>
    )
}
