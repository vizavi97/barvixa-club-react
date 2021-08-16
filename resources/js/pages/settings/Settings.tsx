import React, {ChangeEvent, FormEvent, useState} from 'react'
import {UserProfile} from "./components/UserProfile";
import {Block} from "../../config/ui/Block";
import {Box, Button, Flex, Input, Text, useColorMode, useToast} from "@chakra-ui/react";
import {RootStateOrAny, useDispatch, useSelector} from "react-redux";
import {settingsValidator} from "../../tools/private/settings.validator";
import {changeUserInfo} from "../../store/actions/user.action";
import {useMetaMask} from "metamask-react";
import {BACKEND_URL} from "../../config/app.config";

// const Web3 = require('web3');


export interface SettingsStateInterface {
    name: string,
    email: string,
    phone: string,
    facebook: string,
    telegram: string,
    instagram: string,
}


export const Settings: React.FC = () => {
    const toast = useToast()
    const {colorMode} = useColorMode();
    const {user} = useSelector((state: RootStateOrAny) => state.user)
    const dispatch = useDispatch();
    const {account} = useMetaMask();
    const [disable, setDisable] = useState<boolean>(false)
    const [form, setForm] = useState<SettingsStateInterface>({
        name: user.name,
        email: user.email === null ? '' : user.email,
        phone: user.phone === null ? '' : user.phone,
        facebook: user.soc.soc_facebook,
        telegram: user.soc.soc_telegram,
        instagram: user.soc.soc_instagram
    })
    const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target
        if (!disable) {
            setForm(state => ({...state, [name]: value}))
        }
    }
    const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const error = settingsValidator(form)
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
            await dispatch(changeUserInfo(form))
            setDisable(() => false)
        }
    }
    return (
        <>
            <UserProfile name={form.name} phone={form.phone} email={form.email}/>
            <Block
                mt={5} p="1.25rem"
                as={'form'}
                onSubmit={submitHandler}

            >
                <Box pt='1.5rem'>
                    <Text as='h3' fontSize={"1.125rem"} fontWeight={700} mb={4}>
                        Персональная информация
                    </Text>
                    <Flex alignItems='center' mb={5}>
                        <Box maxWidth={'140px'} w={'100%'}>
                            <Text fontSize={"0.875rem"} color={"#A2ABCA"}>
                                Имя Пользователя
                            </Text>
                        </Box>
                        <Input
                            h={'46px'}
                            _focus={{w: "100%"}}
                            bg={colorMode === 'light' ? "#ECF0FA" : "#1F232D"}
                            outline={'none'}
                            placeholder="Имя Пользователя"
                            name={'name'}
                            value={form.name}
                            isDisabled={disable}
                            onChange={inputHandler}
                        />
                    </Flex>
                    {account && <Flex alignItems='center' mb={5}>
                        <Box maxWidth={'140px'} w={'100%'}>
                            <Text fontSize={"0.875rem"} color={"#A2ABCA"}>
                                Wallet id
                            </Text>
                        </Box>
                        <Input
                            h={'46px'}
                            _focus={{w: "100%"}}
                            bg={colorMode === 'light' ? "#ECF0FA" : "#1F232D"}
                            outline={'none'}
                            placeholder="Wallet id"
                            value={account.toString()}
                            isDisabled={true}
                        />
                    </Flex>}
                    <Flex alignItems='center' mb={5}>
                        <Box maxWidth={'140px'} w={'100%'}>
                            <Text fontSize={"0.875rem"} color={"#A2ABCA"}>
                                Ваша реферальная ссылка
                            </Text>
                        </Box>
                        <Input
                            h={'46px'}
                            _focus={{w: "100%"}}
                            bg={colorMode === 'light' ? "#ECF0FA" : "#1F232D"}
                            outline={'none'}
                            placeholder="Wallet id"
                            value={(window.location.origin as unknown as string) + "/register?ref="+user.id}
                            isDisabled={true}
                        />
                    </Flex>
                </Box>
                <Box pt='1.5rem'>
                    <Text as='h3' fontSize={"1.125rem"} fontWeight={700} mb={4}>
                        Контактная информация
                    </Text>
                    <Flex alignItems='center' mb={5}>
                        <Box maxWidth={'140px'} w={'100%'}>
                            <Text fontSize={"0.875rem"} color={"#A2ABCA"}>
                                Email
                            </Text>
                        </Box>
                        <Input
                            h={'46px'}
                            _focus={{w: "100%"}}
                            bg={colorMode === 'light' ? "#ECF0FA" : "#1F232D"}
                            outline={'none'}
                            placeholder="email"
                            name={'email'}
                            value={form.email}
                            isDisabled={disable}
                            onChange={inputHandler}
                        />
                    </Flex>
                    <Flex alignItems='center' mb={5}>
                        <Box maxWidth={'140px'} w={'100%'}>
                            <Text fontSize={"0.875rem"} color={"#A2ABCA"}>
                                Контактный номер
                            </Text>
                        </Box>
                        <Input
                            h={'46px'}
                            bg={colorMode === 'light' ? "#ECF0FA" : "#1F232D"}
                            _focus={{w: "100%"}}
                            outline={'none'}
                            placeholder="phone number"
                            name={'phone'}
                            value={form.phone}
                            isDisabled={disable}
                            onChange={inputHandler}
                        />
                    </Flex>
                </Box>

                <Box pt='1.5rem'>
                    <Text as='h3' fontSize={"1.125rem"} fontWeight={700} mb={4}>
                        Социальные сети
                    </Text>
                    <Flex alignItems='center' mb={5}>
                        <Box maxWidth={'140px'} w={'100%'}>
                            <Text fontSize={"0.875rem"} color={"#A2ABCA"}>
                                Facebook
                            </Text>
                        </Box>
                        <Input
                            h={'46px'}
                            _focus={{w: "100%"}}
                            bg={colorMode === 'light' ? "#ECF0FA" : "#1F232D"}
                            outline={'none'}
                            placeholder="Facebook"
                            name={'facebook'}
                            value={form.facebook}
                            isDisabled={disable}
                            onChange={inputHandler}
                        />
                    </Flex>
                    <Flex alignItems='center' mb={5}>
                        <Box maxWidth={'140px'} w={'100%'}>
                            <Text fontSize={"0.875rem"} color={"#A2ABCA"}>
                                Telegram
                            </Text>
                        </Box>
                        <Input
                            h={'46px'}
                            _focus={{w: "100%"}}
                            bg={colorMode === 'light' ? "#ECF0FA" : "#1F232D"}
                            outline={'none'}
                            placeholder="Telegram"
                            name={'telegram'}
                            value={form.telegram}
                            isDisabled={disable}
                            onChange={inputHandler}
                        />
                    </Flex>
                    <Flex alignItems='center' mb={5}>
                        <Box maxWidth={'140px'} w={'100%'}>
                            <Text fontSize={"0.875rem"} color={"#A2ABCA"}>
                                Instagram
                            </Text>
                        </Box>
                        <Input
                            h={'46px'}
                            _focus={{w: "100%"}}
                            bg={colorMode === 'light' ? "#ECF0FA" : "#1F232D"}
                            outline={'none'}
                            placeholder="Instagram"
                            name={'instagram'}
                            value={form.instagram}
                            isDisabled={disable}
                            onChange={inputHandler}
                        />
                    </Flex>
                    <Flex alignItems='center' justifyContent={"flex-end"} mb={5}>
                        <Button type={"submit"} bg={'#36AB7E'} color={'white'}>Сохранить</Button>
                    </Flex>
                </Box>
            </Block>
        </>
    )
}
