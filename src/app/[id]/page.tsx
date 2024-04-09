import type { Metadata, ResolvingMetadata } from 'next'
import prisma from '@/util/prisma'
import { headers } from 'next/headers'
import { Container, Image, Stack, Text, Title } from '@mantine/core'

type Props = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const host = headers().get("host") || "localhost:4000"
    const protocol = headers().get("x-forwarded-proto") || "http"
    const url = `${protocol}://${host}/`

    const content = await prisma.content.findUnique({
        where: {
            id: params.id
        }
    })

    console.log(params.id)

    // console.log(content)
    // console.log(url + "api/image/" + content!.image)

    return {
        title: content?.title,
        openGraph: {
            title: content?.title,
            description: content?.description,
            images: [url + "api/image/" + content?.image],
            type: 'website',
            url: url + params.id,
            siteName: 'Makuro',
            locale: 'en-US',
            // images: ['/some-specific-page-image.jpg', ...previousImages],
        },
    }
}


export default async function Page({ params }: { params: { id: string } }) {
    const content = await prisma.content.findUnique({
        where: {
            id: params.id
        }
    })

    if (!content) {
        return <h1>Not found</h1>
    }

    return <Container>
        <Stack>
            <Image src={"/api/image/" + content.image} alt="" />
            <Title>{content.title}</Title>
            <Text>{content.description}</Text>
        </Stack>
    </Container>
}