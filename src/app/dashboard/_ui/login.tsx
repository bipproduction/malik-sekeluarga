'use client'

import { _is_login } from "@/util/global_value"
import { Button, Center, Container, Stack, TextInput, Title } from "@mantine/core"
import { useAtom } from "jotai"
import Register from "./register"
import { useState } from "react"
import _ from 'lodash'
import { MdEmail, MdKey } from 'react-icons/md'
import sweetalert2 from 'sweetalert2'
import { _bin_login } from "../_bin/login"


export default function Login() {

    const [loginVal, setLoginVal] = useState({
        email: "",
        password: ""
    })


    async function _login() {
        if (_.flatMap(loginVal).includes('')) {
            sweetalert2.fire({
                title: 'Error',
                text: 'Please fill all fields',
                icon: 'error'
            })
            return
        }

        const res = await fetch("/api/login", { method: "POST", body: JSON.stringify(loginVal), headers: { "Content-Type": "application/json" } })

        if (res.ok) {
            const { token } = await res.json()
            const l = await _bin_login(token)
            if (l) {
                return window.location.reload()
            }
            return
        }

        sweetalert2.fire({
            title: 'Error',
            text: 'Wrong email or password',
            icon: 'error'
        })
    }

    return <>
        <Container>
            <Center>
                <Stack gap={'md'} maw={300}>
                    <Title>Login</Title>
                    <TextInput leftSection={<MdEmail />} label="Email" placeholder="Email" value={loginVal.email} onChange={(e) => setLoginVal({ ...loginVal, email: e.target.value })} />
                    <TextInput leftSection={<MdKey />} label="Password" placeholder="Password" type="password" value={loginVal.password} onChange={(e) => setLoginVal({ ...loginVal, password: e.target.value })} />
                    <Button onClick={_login}>Login</Button>
                </Stack>
            </Center>
        </Container>
    </>
}