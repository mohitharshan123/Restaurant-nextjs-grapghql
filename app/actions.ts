'use server'

import { cookies } from 'next/headers'

export async function logout() {
    await cookies().set("accessToken", '', {
        maxAge: 3.154e10,
        domain: process.env.DOMAIN,
        path: "/",
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production"
    })
}
