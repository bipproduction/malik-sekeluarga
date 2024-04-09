'use server'
import prisma from "@/util/prisma"
import { revalidatePath } from "next/cache"

interface MODEL_SAVE_CONTENT {
    title: string
    description: string
    image: string,
    userId: string
}
export async function _save_content(data: any) {
    try {
        const d = data as MODEL_SAVE_CONTENT
        await prisma.content.create({
            data: {
                title: d.title,
                description: d.description,
                image: d.image,
                userId: d.userId
            } as any
        })
        revalidatePath("/dashboard")
        return true
    } catch (error) {
        console.error(error)
        return false
    }
}