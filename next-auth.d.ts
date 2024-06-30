import NextAuth from 'next-auth'

declare module 'next-auth' {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            //  extending the session for type safety
            name: string | null | undefined
            email: string
            image: string | null | any
        }
    }
}
