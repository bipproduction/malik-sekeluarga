import { Button, Flex, Group, Stack } from "@mantine/core";
import UiProvider from "./_ui/ui_provider";
import { MdAddCircle, MdFirstPage, MdHome } from "react-icons/md";
import Link from "next/link";
import ButtonLogout from "./_ui/logout_button";
import { cookies } from 'next/headers'
import Login from "./_ui/login";

export default function Layout({ children }: { children: React.ReactNode }) {
    const token = cookies().get('token') || null

    if (!token) {
        return <Login />
    }

    return <Stack gap={12} w={"100%"}>
        <Flex justify="space-between" p={12}>
            <Group gap={12}>
                <Link href="/">
                    <Button variant="subtle" leftSection={<MdFirstPage />}>
                        Landing
                    </Button>
                </Link>
                <Link href="/dashboard">
                    <Button variant="subtle" leftSection={<MdHome />}>
                        Dashboard
                    </Button>
                </Link>
                <Link href="/dashboard/create">
                    <Button variant="subtle" leftSection={<MdAddCircle />}>
                        Create
                    </Button>
                </Link>
            </Group>
            <ButtonLogout />
        </Flex>
        {children}
    </Stack>


}