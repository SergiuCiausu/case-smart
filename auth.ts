import NextAuth from "next-auth"
import GitHub from "next-auth/providers/google"
export const { auth, handlers } = NextAuth({ providers: [] })