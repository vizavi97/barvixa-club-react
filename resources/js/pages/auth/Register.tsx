import {
    Box,
    Text,
    Flex,
    Input,
    Checkbox,
    Button,
    Link,
    useToast,
    Spinner
} from '@chakra-ui/react';
import 'react-phone-input-2/lib/style.css'
import React, {ChangeEvent, FormEvent, useState} from 'react'
import {Link as RouterLink} from 'react-router-dom'
import {validateRegister} from "../../tools/auth/register.validate";
import {useDispatch} from "react-redux";
import {register} from "../../store/actions/user.action";


export interface RegisterFormInterface {
    email: string,
    phone: string,
    name: string,
    password: string,
    password_confirmation: string,
    privacy: boolean
}

export const Register: React.FC = () => {
    const toast = useToast()
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState('email')
    const [form, setForm] = useState<RegisterFormInterface>({
        email: '',
        phone: '',
        name: '',
        password: '',
        password_confirmation: '',
        privacy: false,
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
                email: form.email,
                name: form.name,
                password: form.password,
                password_confirmation: form.password_confirmation
            }))
            setDisable(() => false)
        }
    };

    return (
        <Box>
            <Text
                fontSize='1.5rem'
            >Создать аккаунт</Text>
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
                            обслуживания UZBF</Text>
                    </Checkbox>
                </Box>
                <Box mt={4}>
                    <Button w={'100%'}
                            h={'52px'}
                            type='submit'
                            isDisabled={disable}
                    >
                        {disable ?
                            <Text as={'span'} d='flex' alignItems='center'>Отправляется запрос... <Spinner ml={4}
                                                                                                           color="gray.500"/></Text> :
                            <Text>Создать аккаунт</Text>}
                    </Button>
                </Box>
            </Flex>
            <Text pt={4}>Уже зарегистрированы? <Link as={RouterLink} to='/'
                                                     color='#36AB7E'>Войти </Link></Text>
        </Box>
    )
};
