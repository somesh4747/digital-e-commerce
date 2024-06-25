import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import db from '@/lib/db'
import { formatter } from '@/lib/currency-formatter'

async function getSalesData() {
    const data = await db.order.aggregate({
        _sum: { pricePaidInCents: true },
        _count: true,
    })

    return {
        amount: (data._sum.pricePaidInCents || 0) / 100,
        totalSalesCount: data._count,
    }
}

async function getUserData() {
    const [userCount, orderData] = await Promise.all([
        db.user.count(),
        db.order.aggregate({
            _sum: { pricePaidInCents: true },
        }),
    ])
    return {
        userCount: userCount,
        averageValuePerUser:
            userCount === 0
                ? 0
                : (orderData._sum.pricePaidInCents || 0) / userCount / 100,
    }
}

async function getProductData() {
    const [aciveProducts, inactiveProducts] = await Promise.all([
        db.product.count({ where: { isAvailableForPurchase: true } }),
        db.product.count({
            where: {
                isAvailableForPurchase: false,
            },
        }),
    ])

    return {
        activeProductsCount: aciveProducts,
        inactiveProductsCount: inactiveProducts,
    }
}

async function AdminPage() {
    const [salesData, userData, productData] = await Promise.all([
        getSalesData(),
        getUserData(),
        getProductData(),
    ])

    return (
        <div className="flex justify-center  flex-wrap items-center p-4 space-y-2 md:space-y-0 md:space-x-2">
            <DashboardCard title="sales">
                <div className="tracking-wider text-xl ">
                    {formatter.format(salesData.amount)}
                </div>
                <div className="capitalize">
                    total orders : {salesData.totalSalesCount}
                </div>
            </DashboardCard>
            <DashboardCard title="Customers">
                <div>total customers : {userData.userCount}</div>
                <div>average value : {userData.averageValuePerUser}</div>
            </DashboardCard>
            <DashboardCard title="Products">
                <div>active products : {productData.activeProductsCount}</div>
                <div className="text-orange-400">
                    inactive products: {productData.inactiveProductsCount}
                </div>
            </DashboardCard>
        </div>
    )
}

export default AdminPage

const DashboardCard = ({
    title,
    children,
}: {
    title: string
    children?: React.ReactNode
}) => {
    return (
        <Card className="w-[20rem] min-h-[10rem]">
            <CardHeader>
                <CardTitle className="capitalize">{title}</CardTitle>
            </CardHeader>
            <CardContent className="capitalize">{children}</CardContent>
        </Card>
    )
}
