'use client'
import { _is_login } from "@/util/global_value";
import { Button, Center, Container, Stack, TextInput, Title } from "@mantine/core";
import { useAtom } from "jotai";
import { useState } from "react";
import { MdAccountCircle, MdEmail, MdKey } from "react-icons/md";
import _ from "lodash";
import SweetAlert2 from 'sweetalert2'

export default function Register() {
    const [register, setRegister] = useState({
        name: "",
        email: "",
        password: ""
    })

    async function _register() {
        if (_.flatMap(register).includes('')) {
            SweetAlert2.fire({
                title: 'Error',
                text: 'Please fill all fields',
                icon: 'error'
            })
            return
        }
        const res = await fetch("/api/register", { method: "POST", body: JSON.stringify(register), headers: { "Content-Type": "application/json" } })
        if (res.ok) {
            SweetAlert2.fire({
                title: 'Success',
                text: 'Registered successfully',
                icon: 'success'
            })
        }

        SweetAlert2.fire({
            title: 'Error',
            text: 'email already exist',
            icon: 'error'
        })
    }

    return <Container>
        <Center>
            <Stack gap={12}>
                <Title>Register</Title>
                <TextInput leftSection={<MdAccountCircle />} label="Name" placeholder="Name" onChange={(e) => setRegister({ ...register, name: e.target.value })} />
                <TextInput leftSection={<MdEmail />} label="Email" placeholder="Email" onChange={(e) => setRegister({ ...register, email: e.target.value })} />
                <TextInput leftSection={<MdKey />} label="Password" placeholder="Password" type="password" onChange={(e) => setRegister({ ...register, password: e.target.value })} />
                <Button onClick={_register}>Register</Button>
            </Stack>
        </Center>
    </Container>
}