import { Button, Flex, Group } from "@mantine/core";
import Link from "next/link";

export default function Page() {
    return <>
        <Flex justify={"space-between"}>
            <Group>
                Main
            </Group>
            <Link href={"/dashboard"}>
                <Button variant="subtle">Dashboard</Button>
            </Link>
        </Flex>
    </>
}