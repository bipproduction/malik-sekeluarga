'use server'
import fs from 'fs'
import path from 'path'

const root_path = path.join(process.cwd(), 'assets/img')
export async function _save_image(formData: FormData) {
    try {
        const file = formData.get('image') as File
        const filePath = path.join(root_path, file.name )
        const b = await file.arrayBuffer()
        const buffer = Buffer.from(b as any, 'utf-8')
        await fs.promises.writeFile(filePath, buffer)
        console.log("image saved")
        return true
    } catch (error) {
        console.error("Error saving image:", error);
        return false
    }

}