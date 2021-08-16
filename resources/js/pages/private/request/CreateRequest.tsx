import React, {ChangeEvent, FormEvent, useState} from 'react'
import {Block} from "../../../config/ui/Block";
import {Box, Button, Flex, Input, Text} from "@chakra-ui/react";
import 'react-datepicker/dist/react-datepicker.css'

interface CreatePlayerFormInterface {
    name: string
    surname: string
    fatherName: string
    gameNumber: number
    birth: string | number | readonly string[] | undefined
    nationality: string
    placeOfBirth: string
    height: number
    position: string
    age: number
    teamId: number
}
export  interface CreateRequestInterface {
    title: string,
    id: number,
    date: string | Date
}
export const CreateRequest: React.FC<CreateRequestInterface> = ({title,id,date}) => {
    console.log(id,title)
    const [disable] = useState<boolean>(false)
    const [form, setForm] = useState<CreatePlayerFormInterface>({
        name: "",
        surname: "",
        fatherName: "",
        gameNumber: 0,
        birth: new Date().toLocaleDateString(),
        nationality: "",
        placeOfBirth: "",
        height: 170,
        position: '',
        age: 18,
        teamId: 0,
    })
    const dateHandler = (date:string) =>  setForm( state => ({ ...state,birth:  new Date(date).toLocaleDateString()}));

    const inputHandler = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = event.target
        setForm(state => ({
            ...state,
            [name]: value
        }))
    }
    const submitHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('submitHandler')
    }
    return (
        <>
            <Block py={6} maxW={{md: "540ox", xs: "100%"}}>
                <Text as={'h2'} fontWeight={600} textAlign={"center"} fontSize={"2rem"}>Оформление заявки</Text>
                <Text as={'h5'} fontWeight={600} textAlign={"center"} fontSize={"1.375rem"}>{title} - {date}</Text>
                <form onSubmit={submitHandler}>
                    <Box p={4}>
                        <Text mb="8px">
                            Имя
                        </Text>
                        <Input
                            variant="flushed"
                            value={form.name}
                            name='name'
                            onChange={inputHandler}
                            placeholder="Введите Имя игрока"
                            size="sm"
                            px={2}
                            isDisabled={disable}
                            required
                            _disabled={{
                                cursor: "not-allowed",
                            }}
                        />
                    </Box>
                    <Box p={4}>
                        <Text mb="8px">
                            Фамилия игрока
                        </Text>
                        <Input
                            variant="flushed"
                            value={form.surname}
                            name='surname'
                            onChange={inputHandler}
                            placeholder="Введите Фамилию игрока"
                            size="sm"
                            px={2}
                            isDisabled={disable}
                            required
                            _disabled={{
                                cursor: "not-allowed",
                            }}
                        />
                    </Box>
                    <Box p={4}>
                        <Text mb="8px">
                            Отчество
                        </Text>
                        <Input
                            variant="flushed"
                            value={form.fatherName}
                            name='fatherName'
                            onChange={inputHandler}
                            placeholder="Введите Отчетсво игрока"
                            size="sm"
                            px={2}
                            isDisabled={disable}
                            required
                            _disabled={{
                                cursor: "not-allowed",
                            }}
                        />
                    </Box>
                    <Box p={4}>
                        <Text mb="8px">
                            Игровой
                        </Text>
                        <Input
                            variant="flushed"
                            value={form.gameNumber}
                            name='gameNumber'
                            onChange={inputHandler}
                            placeholder="Введите Игровой номер игрока"
                            size="sm"
                            px={2}
                            isDisabled={disable}
                            required
                            _disabled={{
                                cursor: "not-allowed",
                            }}
                        />
                    </Box>
                    <Flex justifyContent={"center"} alignItems={"center"}>

                        <Button variant={"outline"}
                                colorScheme={"teal"}
                                isDisabled={disable}
                                type={"submit"}
                                mx={2}
                        >
                            Подтвердить</Button>
                        <Button variant={"outline"}
                                colorScheme={"red"}
                                isDisabled={disable}
                                type={"reset"}
                                mx={2}
                        >
                            Сбросить</Button>
                    </Flex>
                </form>
            </Block>
        </>
    )
}
