import prisma from "@/util/prisma";

interface REGISTER {
    name: string
    email: string
    password: string
}
export async function POST(request: Request) {
    const body: REGISTER = await request.json();

    // check if user available
    const user = await prisma.user.findUnique({
        where: {
            email: body.email
        }
    })

    if (user) {
        return Response.json({ success: false, meesage: "user already exist" }, { status: 400 })
    }

    // register user
    await prisma.user.create({
        data: {
            name: body.name,
            email: body.email,
            password: body.password
        }
    })


    return Response.json({ success: true }, { status: 200 })
}