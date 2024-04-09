import fs from 'fs'
import path from 'path'
export async function GET(req: Request, { params }: { params: { name: string } }) {
    const { name } = params

    const filePath = path.join(process.cwd(), 'assets/img', name)

    // check if file exist
    if (await fs.promises.stat(filePath).catch(() => false)) {
        console.log("file exist")
        return new Response(await fs.promises.readFile(filePath), { headers: { 'Content-Type': 'image/png' } })
    }

    return new Response(await fs.promises.readFile(path.join(process.cwd(), 'assets/default', 'default.png')), { headers: { 'Content-Type': 'image/png' } })
}