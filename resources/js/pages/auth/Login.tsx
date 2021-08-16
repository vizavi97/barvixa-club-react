import {
    Box,
    Text,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Flex,
    Input,
    Button,
    Link, useToast, Spinner
} from '@chakra-ui/react';
import PhoneInput from 'react-phone-input-2'
import {Link as RouterLink} from 'react-router-dom'
import 'react-phone-input-2/lib/style.css'
import React, {ChangeEvent, FormEvent, useState} from 'react'
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
    const [activeTab] = useState('email')
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
        const error = validateLogin(form, activeTab);
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
                activeTab: activeTab,
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
            >Войти</Text>
            <Text color='#A2ABCA' pb='1.5rem'>Добро пожаловать в Vavilon</Text>
            <Tabs my={2}>
                <TabList>
                    <Tab flex={1} fontSize={'1.125rem'} _focus={{}} _selected={{borderBottom: "2px solid #36AB7E"}}>Электронная
                        почта</Tab>
                    <Tab flex={1} fontSize={'1.125rem'} _focus={{}}
                         _selected={{borderBottom: "2px solid #36AB7E"}}>Мобильный</Tab>
                </TabList>
                <Flex as={'form'} onSubmit={submitHandler} method="POST" flexDirection={'column'} pt={4}>
                    <TabPanels>
                        {/*EMAIL*/}
                        <TabPanel p={0}>
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
                        </TabPanel>
                        {/*PHONE*/}
                        <TabPanel p={0}>
                            <Box textAlign={'left'} py={2}>
                                <Text fontSize={'14px'} fontWeight={300} pb={1}>Телефон</Text>
                                <PhoneInput
                                    country={'uz'}
                                    onChange={phone => setForm(state => ({
                                        ...state,
                                        phone: phone
                                    }))}
                                    value={form.phone}
                                />
                            </Box>
                        </TabPanel>
                    </TabPanels>
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
                                bg={'#36AB7E'}
                                _hover={{bg: '#36AB7E70'}}
                                type='submit'
                                isDisabled={disable}
                        >
                            {disable ?
                                <Text as={'span'} d='flex' alignItems='center'>Отправляется запрос... <Spinner ml={4}
                                                                                                               color="green.500"/></Text> :
                                <Text>Создать аккаунт</Text>}
                        </Button>
                    </Box>
                </Flex>

                <Box mt={4}>
                    <Flex justifyContent={"space-between"} pt={4}>
                        <Link as={RouterLink} to='/restore-password' _hover={{color: '#36AB7E'}}>Забыли пароль?</Link>
                        <Link as={RouterLink} to='/register' color='#36AB7E'>Регистрация</Link>
                    </Flex>
                </Box>
            </Tabs>
        </Box>
    )
};
