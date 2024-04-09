'use client'

import { ActionIcon } from "@mantine/core"
import { MdFileCopy } from "react-icons/md"
import toast from "react-simple-toasts"

export default function ButtonCopy({ content, url }: { content: string, url: string }) {

    async function _copy() {
        await navigator.clipboard.writeText(url + content)
        toast("copied")
    }

    return <ActionIcon variant="subtle" onClick={_copy}><MdFileCopy /></ActionIcon>
}