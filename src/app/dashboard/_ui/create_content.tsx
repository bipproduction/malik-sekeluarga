'use client'
import { ActionIcon, BackgroundImage, Box, Button, Center, Flex, Group, Stack, Text, TextInput, Textarea, rem } from '@mantine/core';
import { IconUpload, IconPhoto, IconX, IconTextCaption } from '@tabler/icons-react';
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useState } from 'react';
import { _save_image } from '../_bin/save_image';
import _ from 'lodash'
import { _save_content } from '../_bin/save_content';
import SwitchAlert2 from 'sweetalert2'


export default function CreateContent({ userId }: { userId: string }) {
    const [gambar, setGambar] = useState("/assets/img/default.png")
    const [val, setVal] = useState({
        title: "",
        description: ""
    })

    async function createContent() {
        if (_.flatMap(val).includes('')) {
            SwitchAlert2.fire({
                title: 'Error',
                text: 'Please fill all fields',
                icon: 'error'
            })
            return
        }
        fetch(gambar)
            .then(response => response.blob())
            .then(async (blob) => {
                // Convert the Blob data to a File object
                const file = new File([blob], "filename_" + _.now() + _.random(1000, 9999) + ".png"); // Change "filename" to the desired filename
                const formData = new FormData();
                formData.append("image", file);
                const s = await _save_image(formData)
                if (s) {
                    const data_content = {
                        title: val.title,
                        description: val.description,
                        image: file.name,
                        userId
                    }

                    const s = await _save_content(data_content)
                    if (s) {
                        SwitchAlert2.fire({
                            title: 'Success',
                            text: 'Content created successfully',
                            icon: 'success'
                        })
                    }
                }

            })
            .catch(error => {
                console.error("Error fetching Blob data:", error);
            });
    }
    return <Stack gap={12}>
        <BackgroundImage
            p={"xl"}
            h={rem(300)}
            w={"100%"}
            src={gambar}
        >


        </BackgroundImage>
        <Center>
            <label htmlFor="file-upload" style={{ cursor: 'pointer', width: '100%', height: '100%' }} >
                <Flex>
                    <IconUpload />
                    <Text >Upload Image</Text>
                </Flex>
            </label>
            <input accept='image/*' id="file-upload" type="file" style={{ display: 'none' }} onChange={(e) => setGambar(URL.createObjectURL(e.target.files![0]))} ></input>
        </Center>
        <TextInput leftSection={<IconTextCaption />} label="Title" placeholder="Title" onChange={(e) => setVal({ ...val, title: e.target.value })} />
        <Textarea leftSection={<IconTextCaption />} label="Description" placeholder="Description" rows={5} onChange={(e) => setVal({ ...val, description: e.target.value })} />
        <Group>
            <Button onClick={createContent} >CREATE</Button>
        </Group>
    </Stack>


}