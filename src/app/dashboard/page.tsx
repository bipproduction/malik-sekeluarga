import prisma from "@/util/prisma"
import { AES } from "crypto-js"
import { cookies } from "next/headers"
import C from "crypto-js"
import { Box, Flex, Group, Image, Stack, Text } from "@mantine/core"
import ButtonCopy from "./_ui/copy_button"
import { headers } from 'next/headers'
import ButtonShow from "./_ui/button_show"

export default async function Page() {
    // get url
    const host = headers().get("host") || "localhost:4000"
    const protocol = headers().get("x-forwarded-proto") || "http"
    const url = `${protocol}://${host}/`

    const token = cookies().get('token') || null
    if (!token) {
        return <h1>Unauthorized</h1>
    }

    const user_id = AES.decrypt(token?.value, "makuro").toString(C.enc.Utf8)

    const content = await prisma.content.findMany({
        where: {
            userId: user_id
        }
    })

    return <>
        {/* {url} */}
        <Flex gap={12} rowGap={12} w={"100%"} wrap={"wrap"} >
            {content.map((c, i) =>
                <Stack
                    align="stretch"
                    justify="space-between"
                    w={200}
                    key={i}
                    style={{
                        border: "1px solid black",
                    }}
                >
                    <Box>
                        <Image w={"100%"} src={`/api/image/${c.image}`} alt="" />
                    </Box>
                    <Stack gap={0} p={"sm"}>
                        <Text>{c.title}</Text>
                        <Group>
                            <ButtonCopy content={c.id} url={url} />
                            <ButtonShow id={c.id} />
                        </Group>
                    </Stack>
                </Stack>)}
        </Flex>
    </>
}