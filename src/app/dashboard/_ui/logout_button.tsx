'use client'
import { Button } from "@mantine/core";
import { MdLogout } from "react-icons/md";
import { bLogout } from "../_bin/logout";
import SweetAlert2 from 'sweetalert2'

export default function ButtonLogout() {

    async function _logout() {
        const l = await bLogout()
        if (l) {
            return window.location.reload()
        }

        SweetAlert2.fire({
            title: 'Error',
            text: 'Something went wrong',
            icon: 'error'
        })
    }
    return <Button onClick={_logout} leftSection={<MdLogout />}>
        LOGOUT
    </Button>
}