import {
    Box,
    Text,
    Flex,
    Input,
    Button,
    Link
} from '@chakra-ui/react';
import 'react-phone-input-2/lib/style.css'
import React from 'react'

interface RestorePasswordFieldInterface {
}

export const RestorePasswordField: React.FC<RestorePasswordFieldInterface> = () => {
    return (
        <Box w={'100%'}>
            <Text fontSize='1.5rem'>Проверка безопасности</Text>
            <Text color='#A2ABCA' pb='1rem'>Для защиты аккаунта выполните следующую проверку</Text>
            <Flex as={'form'} flexDirection={'column'} pt={4}>
                <Box textAlign={'left'} py={2}>
                    <Text fontSize={'14px'} fontWeight={300} pb={1}>Код подтверждения e-mail</Text>
                    <Input
                        border='1px solid rgba(255, 255, 255, 0.1)'
                        placeholder="Код подтверждения e-mail"
                        type='text'
                        h='49px'
                        _focus={{
                            border: "1px solid #36AB7E"
                        }}
                    />
                    <Text fontSize={'14px'} fontWeight={300} pb={1}>Введите 6-значный код, полученный на li***@***.ru.</Text>
                </Box>
            </Flex>
            <Box mt={4}>
                <Button w={'100%'} h={'52px'} bg={'#36AB7E'} _hover={{bg: '#36AB7E70'}}>
                    <Text>Далее</Text>
                </Button>
                <Flex justifyContent={"center"} pt={4}>
                    <Link color='#36AB7E'>Войти</Link>
                </Flex>
            </Box>
        </Box>
    )
};
