'use server'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

export async function _bin_login(token: string) {
    try {
        cookies().set('token', token)
        return true
    } catch (error) {
        return false
    }
}

