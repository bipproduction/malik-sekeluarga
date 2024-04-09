'use client'

import { useShallowEffect } from "@mantine/hooks"
import { useState } from "react"
import Login from "./login"
import { _is_login } from "@/util/global_value"
import { Button, Group, Stack } from "@mantine/core"
import Register from "./register"

export default function UiProvider({ children }: { children: React.ReactNode }) {

    const [token, setToken] = useState<string | null>(null)
    const [isLogin, setislogin] = useState(true)

    useShallowEffect(() => {
        if (window) {
            const token = localStorage.getItem("token") || null
            setToken(token)
        }
    }, [])

    if (token === null) {
        return null
    }

    if (token) {
        return <>{children}</>

    }

    return <Group>
        <Stack>
            {isLogin ? <Login /> : <Register />}
            {isLogin ? <Button onClick={() => setislogin(false)}>Register</Button> : <Button onClick={() => setislogin(true)}>Login</Button>}
        </Stack>
    </Group>
}