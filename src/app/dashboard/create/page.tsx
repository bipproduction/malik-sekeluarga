import { Container, Stack, Title } from "@mantine/core";
import CreateContent from "../_ui/create_content";
import { cookies } from 'next/headers'
import prisma from "@/util/prisma";
import { AES } from "crypto-js";
import C from "crypto-js";

export default async function Page() {
    const token = cookies().get('token') || null

    if(!token) {
        return <Container>
            <Stack>
                <Title>Unauthorized</Title>
            </Stack>
        </Container>
    }

    const email = AES.decrypt(token?.value, "makuro").toString(C.enc.Utf8)

    const user = await prisma.user.findUnique({
        where: {
            id: email
        }
    })

    if (!user) {
        return <Container>
            <Stack>
                <Title>Unauthorized</Title>
            </Stack>
        </Container>
    }
    return <Container>
        <Stack>
            <Title>Create Content</Title>

            <CreateContent userId={user?.id || ''} />
        </Stack>
    </Container>
}