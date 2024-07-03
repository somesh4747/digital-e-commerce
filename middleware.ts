import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'

export default auth(async (req) => {
    const isAdminRoute = req.nextUrl.pathname.startsWith('/admin')

    if (!isAdminRoute) return

    if (isAdminRoute) {
        if ((await isAuthorized(req)) == false)
            return new NextResponse('Unauthorized', {
                status: 401,
                headers: {
                    'WWW-Authenticate': 'basic',
                },
            })
    }

    return
})

//->>>>>>>>>>.without using auth.js <<<<<<<<<<<<<<<<----

// export default async function middleware(req: NextRequest) {
//     // console.log(req.cookies)
//     console.log(req)

//     // console.log(a)
//     // if ((await isAuthorized(req)) == false) {
//     //     return new NextResponse('Unauthorized', {
//     //         status: 401,
//     //         headers: {
//     //             'WWW-Authenticate': 'basic',
//     //         },
//     //     })
//     // }
// }

async function isAuthorized(req: NextRequest) {
    const authHeader =
        req.headers.get('authorization') || req.headers.get('Authorization')
    if (!authHeader) return false

    const [userName, password] = Buffer.from(authHeader.split(' ')[1], 'base64')
        .toString()
        .split(':')

    if (
        userName === process.env.ADMIN_USER_NAME &&
        password === process.env.ADMIN_PASSWORD
    ) {
        return true
    }
    return false
}

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
