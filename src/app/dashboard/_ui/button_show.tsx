'use client'
import { ActionIcon } from "@mantine/core";
import Link from "next/link";
import { IoMdEye } from "react-icons/io";

export default function ButtonShow({ id }: { id: string }) {
    return <Link href={`/${id}`}>
        <ActionIcon variant="subtle">
            <IoMdEye />
        </ActionIcon>
    </Link>
}