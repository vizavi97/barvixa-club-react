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
    Checkbox,
    Button,
    Link,
    useToast,
    Spinner,
} from '@chakra-ui/react';
import {useLocation} from 'react-router-dom'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react'
import {Link as RouterLink} from 'react-router-dom'
import {validateRegister} from "../../tools/auth/register.validate";
import {useDispatch} from "react-redux";
import {register} from "../../store/actions/user.action";
import {getRefFromUrl} from "../../tools/auth/get.ref";
import axios from "axios";
import {BACKEND_API_URL} from "../../config/app.config";
import {RefUserInterface} from "../../store/interfaces/user";


export interface RegisterFormInterface {
    email: string,
    phone: string,
    name: string,
    password: string,
    password_confirmation: string,
    privacy: boolean,
    ref: string | number | null
}

export const Register: React.FC = () => {
    const toast = useToast()
    const dispatch = useDispatch()
    const [activeTab, setActiveTab] = useState('email')
    const [form, setForm] = useState<RegisterFormInterface>({
        email: '',
        phone: '',
        name: '',
        password: '',
        password_confirmation: '',
        privacy: false,
        ref: getRefFromUrl(useLocation().search)
    })
    const [ref, setRef] = useState<null | RefUserInterface>(null)
    const [disable, setDisable] = useState<boolean>(false)
    const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target
        setForm(state => ({
            ...state,
            [name]: value
        }))
    }
    const submitHandler = async (event: FormEvent) => {
        event.preventDefault();
        const error = validateRegister(form, activeTab);
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
            await dispatch(register({
                activeTab: activeTab,
                email: form.email,
                name: form.name,
                password: form.password,
                password_confirmation: form.password_confirmation,
                ref: form.ref
            }))
            setDisable(() => false)
        }
    }


    useEffect(() => {
        axios.get(`${BACKEND_API_URL}register-ref`,{params: {
            ref: form.ref
            }})
            .then(resp => setRef(() => ({
                name: resp.data.name,
                surname: resp.data.surname
            })))
            .catch(error => console.log("error", error))
    }, [form.ref])
    return (
        <Box>
            <Text
                fontSize='1.5rem'
            >Создать аккаунт</Text>
            <Text color='#A2ABCA' pb='1.5rem'>Добро пожаловать в Vavilon</Text>
            {ref && <Text>{"Ваш реферал: " + ref.name + " " + ref.surname}</Text>}
            <Tabs my={2}>
                <TabList>
                    <Tab flex={1} fontSize={'1.125rem'}
                         _focus={{}} _selected={{borderBottom: "2px solid #36AB7E"}}
                         onClick={() => setActiveTab(() => 'email')}
                         isDisabled={disable}
                    >
                        Электронная почта</Tab>
                    <Tab flex={1} fontSize={'1.125rem'} _focus={{}}
                         _selected={{borderBottom: "2px solid #36AB7E"}}
                         onClick={() => setActiveTab(() => 'phone')}
                         isDisabled={disable}
                    >Мобильный</Tab>
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
                    <Box textAlign={'left'} py={2}>
                        <Text fontSize={'14px'} fontWeight={300} pb={1}>Имя</Text>
                        <Input
                            border='1px solid rgba(255, 255, 255, 0.1)'
                            placeholder="Имя"
                            type='text'
                            h='49px'
                            _focus={{
                                border: "1px solid #36AB7E"
                            }}
                            name='name'
                            value={form.name}
                            onChange={inputHandler}
                            isDisabled={disable}
                            _disabled={{cursor: 'not-allowed'}}
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
                    <Box textAlign={'left'} py={2}>
                        <Text fontSize={'14px'} fontWeight={300} pb={1}>Подтверждение пароля</Text>
                        <Input
                            border='1px solid rgba(255, 255, 255, 0.1)'
                            placeholder="*******"
                            type='password'
                            h='49px'
                            _focus={{
                                border: "1px solid #36AB7E"
                            }}
                            name='password_confirmation'
                            onChange={inputHandler}
                            isDisabled={disable}
                            _disabled={{cursor: 'not-allowed'}}

                            value={form.password_confirmation}
                        />
                    </Box>
                    {/*BUTTON*/}
                    <Box textAlign={'left'} py={2}>
                        <Checkbox alignItems={'flex-start'} colorScheme="green"
                                  fontWeight={300} px={2}
                                  name={'policy'}
                                  onChange={(e) => setForm(state => ({
                                      ...state,
                                      privacy: e.target.checked
                                  }))}
                                  isChecked={form.privacy}
                                  isDisabled={disable}
                                  _disabled={{cursor: 'not-allowed'}}

                        >
                            <Text lineHeight={1.2} fontSize={'14px'}>
                                Я прочитал и согласен с Условиями
                                обслуживания Vavilon</Text>
                        </Checkbox>
                    </Box>
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
                <Text pt={4}>Уже зарегистрированы? <Link as={RouterLink} to='/'
                                                         color='#36AB7E'>Войти </Link></Text>
            </Tabs>
        </Box>
    )
};
