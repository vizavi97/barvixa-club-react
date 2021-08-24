import React, {ChangeEvent, FormEvent, useState} from 'react'
import {
    Box,
    Text,
    Tabs,
    Flex,
    Input,
    Button,
    Link, useToast, Spinner
} from '@chakra-ui/react';
import {Link as RouterLink} from 'react-router-dom'
import 'react-phone-input-2/lib/style.css'
import {useDispatch} from "react-redux";
import {login} from "../../store/actions/user.action";
import {validateLogin} from "../../tools/auth/login.validate";

export interface LoginInterface {
    email: string,
    phone: string,
    password: string
}

export const Login: React.FC = () => {
    const toast = useToast()
    const dispatch = useDispatch();
    const [form, setForm] = useState<LoginInterface>({
        email: '',
        phone: '',
        password: '',
    });
    const [disable, setDisable] = useState<boolean>(false);
    const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target
        setForm(state => ({
            ...state,
            [name]: value
        }))
    };
    const submitHandler = async (event: FormEvent) => {
        event.preventDefault();
        const error = validateLogin(form);
        if (error) {
            toast({
                title: "Ошибка",
                position: "top",
                description: error,
                status: "error",
                duration: 7000,
                isClosable: true,
            })
        } else {
            setDisable(() => true)
            await dispatch(login({
                email: form.email,
                password: form.password,
            }))
            setDisable(() => false)
        }
    };
    return (
        <Box w={'100%'}>
            <Text
                fontSize='1.5rem'
            >Войти </Text>
            <Tabs my={2}>
                <Flex as={'form'} onSubmit={submitHandler} method="POST" flexDirection={'column'} pt={4}>
                    <Box textAlign={'left'} py={2}>
                        <Text fontSize={'14px'} fontWeight={300} pb={1}>Электронная почта</Text>
                        <Input
                            border='1px solid rgba(255, 255, 255, 0.1)'
                            placeholder="example@mail.ru"
                            type='text'
                            h='49px'
                            name='email'
                            value={form.email}
                            onChange={inputHandler}
                            isDisabled={disable}
                            _disabled={{cursor: 'not-allowed'}}
                            _focus={{
                                border: "1px solid #36AB7E"
                            }}
                        />
                    </Box>
                    {/*PASSWORD*/}
                    <Box textAlign={'left'} py={2}>
                        <Text fontSize={'14px'} fontWeight={300} pb={1}>Пароль</Text>
                        <Input
                            border='1px solid rgba(255, 255, 255, 0.1)'
                            placeholder="*******"
                            type='password'
                            h='49px'
                            _focus={{
                                border: "1px solid #36AB7E"
                            }}
                            name='password'
                            onChange={inputHandler}
                            isDisabled={disable}
                            _disabled={{cursor: 'not-allowed'}}

                            value={form.password}
                        />
                    </Box>
                    {/*BUTTON*/}
                    <Box mt={4}>
                        <Button w={'100%'}
                                h={'52px'}
                                colorScheme={"gray"}
                                type='submit'
                                isDisabled={disable}
                        >
                            {disable ?
                                <Text as={'span'} d='flex' alignItems='center'>Отправляется запрос... <Spinner ml={4}
                                                                                                               color="green.500"/></Text> :
                                <Text>Войти</Text>}
                        </Button>
                    </Box>
                </Flex>

                <Box mt={4}>
                    <Flex justifyContent={"space-between"} pt={4}>
                        <Link as={RouterLink} to='/register'  colorScheme={"gray"}>Регистрация</Link>
                    </Flex>
                </Box>
            </Tabs>
        </Box>
    )
};
