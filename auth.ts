import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Google],

    callbacks: {
        async signIn({ profile }) {
            console.log(profile)

            return true
        },
    },
})
