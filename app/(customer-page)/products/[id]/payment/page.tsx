'use client'
import handleOrder from '@/app/(customer-page)/_actions/handle-orders'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

import React, { useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { MdError } from 'react-icons/md'
import { FaCheckCircle } from 'react-icons/fa'
import { signIn, useSession } from 'next-auth/react'

export default function PaymentPage({
    params: { id },
}: {
    params: { id: string }
}) {
    //
    const [response, action] = useFormState(handleOrder, {})
    const user = useSession().data?.user

    if (!user)
        return (
            <>
                <div className="flex justify-center items-center">
                    <Button onClick={() => signIn()}>Log in first</Button>
                </div>
            </>
        )
    return (
        //
        <div className="m-5 flex justify-center items-center">
            <Card className="md:w-1/2 shadow-xl">
                <CardHeader>
                    <CardTitle className="group flex items-center gap-2 text-lg">
                        Product ID : {id}
                    </CardTitle>
                    <CardDescription className="capitalize">
                        Enter Details to get the product
                    </CardDescription>

                    <div>
                        <form action={action}>
                            <input
                                value={id}
                                name="productId"
                                className="hidden"
                            />
                            <div className="my-3 space-y-3">
                                <label htmlFor="name">Name:</label>
                                <Input
                                    type="text"
                                    placeholder="Enter your name here"
                                    id="name"
                                    name="name"
                                    minLength={3}
                                    required
                                />
                            </div>
                            <div className="my-3 space-y-3">
                                <label htmlFor="name">Email:</label>
                                <Input
                                    placeholder="Enter your Email "
                                    required
                                    type="email"
                                    id="name"
                                    name="email"
                                    defaultValue={user?.email || ''}
                                />
                            </div>
                            {/* form submit button for useFormStatus */}
                            <Submit />
                            {/* form submit button for useFormStatus */}
                        </form>

                        {/* status after submitting form */}
                        <div
                            className={cn(
                                'text-red-400 pt-3 text-xl capitalize',
                                {
                                    'invisible hidden': !response.error,
                                }
                            )}
                        >
                            <MdError className="inline-block mr-4" />
                            {response.error}
                        </div>
                        <div
                            className={cn(
                                'text-green-400 pt-5 text-xl capitalize',
                                {
                                    'invisible hidden': !response.success,
                                }
                            )}
                        >
                            <FaCheckCircle className="inline-block mr-4 " />
                            {response.success}
                        </div>
                    </div>
                </CardHeader>
            </Card>
        </div>
    )
}

function Submit() {
    const status = useFormStatus()
    return (
        <Button disabled={status.pending} className="shadow-lg ">
            Order
        </Button>
    )
}
