import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
    if ((await isAuthenticated(req)) == false) {
        return new NextResponse('Unauthorized', {
            status: 401,
            headers: {
                'WWW-Authenticate': 'basic',
            },
        })
    }
}

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
    matcher: '/admin/:path*',
}
