import React from 'react'
import {Box, Input, Text} from "@chakra-ui/react";

interface InputTextInterface {
    value: string | number,
    label: string,
    placeholder: string,
    name: string,
    type: "text" | "number",
    disable: boolean,
    onChange: any

}

export const InputField: React.FC<InputTextInterface> = ({
                                                             value,
                                                             label,
                                                             name,
                                                             type,
                                                             disable,
                                                             placeholder,
                                                             onChange
                                                         }) => {
    return (

        <Box textAlign={'left'} py={2}>
            <Text fontSize={'14px'} fontWeight={300} pb={1}>{label} *</Text>
            <Input
                border='1px solid rgba(255, 255, 255, 0.1)'
                h='49px'
                placeholder={placeholder}
                type={type}
                name={name}
                value={value}
                onChange={event => onChange(event)}
                isDisabled={disable}
                _disabled={{cursor: 'not-allowed'}}
                _focus={{
                    border: "1px solid #36AB7E"
                }}
            />
        </Box>
    )
}
