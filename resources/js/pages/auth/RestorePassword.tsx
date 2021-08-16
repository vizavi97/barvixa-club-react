import {
    Box,
    Text,
    Flex,
    Input,
    Button,
    Link
} from '@chakra-ui/react';
import {Link as RouterLink} from 'react-router-dom'
import 'react-phone-input-2/lib/style.css'
import React from 'react'

interface RestorePasswordInterface {
}

export const RestorePassword: React.FC<RestorePasswordInterface> = () => {
    return (
        <Box w={'100%'}>
            <Text fontSize='1.5rem'>Сбросить пароль</Text>
                <Flex as={'form'} flexDirection={'column'} pt={4}>
                    <Box textAlign={'left'} py={5}>
                        <Text fontSize={'14px'} fontWeight={300} pb={1}>Электронная почта</Text>
                        <Input
                            border='1px solid rgba(255, 255, 255, 0.1)'
                            placeholder="example@mail.ru"
                            type='text'
                            h='49px'
                            _focus={{
                                border: "1px solid #36AB7E"
                            }}
                        />
                    </Box>
                    <Box mt={4}>
                        <Button w={'100%'} h={'52px'} colorScheme={"whiteAlpha"}>
                            <Text>Далеее</Text>
                        </Button>
                        <Flex justifyContent={"center"} pt={4}>
                            <Link as={RouterLink} to='/'>Войти</Link>
                        </Flex>
                    </Box>
                </Flex>
        </Box>
    )
};
