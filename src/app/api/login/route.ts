import prisma from "@/util/prisma"
import { AES } from 'crypto-js'

interface MODEL_LOGIN {
    email: string
    password: string
}

export async function POST(req: Request) {
    const body: MODEL_LOGIN = await req.json()

    const user = await prisma.user.findUnique({
        where: {
            email: body.email,
        }
    })

    if (!user) {
        return Response.json("wrong email or password", { status: 401 })
    }

    if (user.password !== body.password) {
        return Response.json("wrong email or password", { status: 401 })
    }

    const token = AES.encrypt(user.id, "makuro").toString()

    return Response.json({ token }, { status: 200 })
}