import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'

export default auth(async (req) => {
    // console.log(req.auth)
    if ((await isAuthenticated(req)) == false) {
        return new NextResponse('Unauthorized', {
            status: 401,
            headers: {
                'WWW-Authenticate': 'basic',
            },
        })
    }
})

//->>>>>>>>>>.without using auth.js <<<<<<<<<<<<<<<<----

// export default async function middleware(req: NextRequest) {
//     // console.log(req.cookies)
//     console.log(req)

//     // console.log(a)
//     // if ((await isAuthenticated(req)) == false) {
//     //     return new NextResponse('Unauthorized', {
//     //         status: 401,
//     //         headers: {
//     //             'WWW-Authenticate': 'basic',
//     //         },
//     //     })
//     // }
// }

async function isAuthenticated(req: NextRequest) {
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
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
