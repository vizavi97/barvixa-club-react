import React from 'react'
import {Avatar, Flex, Text} from "@chakra-ui/react";

interface PlayerCheckboxInterface {
    name: string
    surname: string
    preview_img_path: string
}

export const PlayerCheckbox: React.FC<PlayerCheckboxInterface> = (
    {
        name,
        surname,
        preview_img_path
    }
) => {

    return (
        <Flex flexDirection={"row"} alignItems={"center"}>
            <Avatar name={name + " " + surname} src={preview_img_path} />
            <Text pl={4}>{name + " " + surname}</Text>
        </Flex>
    )
}
