'use server'
import { cookies } from 'next/headers'

export async function bLogout() {
    try {
        cookies().set('token', '')
        cookies().delete('token')
        return true
    } catch (error) {
        return false
    }

}