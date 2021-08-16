import React, {ChangeEvent, FormEvent, useState} from 'react'
import {Block} from "../../../config/ui/Block";
import {Box, Button, Flex, Input, Select, Text, Image, useToast, Checkbox} from "@chakra-ui/react";
import ImageUploading, {ImageListType} from "react-images-uploading";
import {InputField} from "../../../components/InputField";
import {RootStateOrAny, useDispatch, useSelector} from "react-redux";
import {createPlayerValidator} from "../../../tools/private/player.validator";
import {PlayerCheckbox} from "../../../components/ui/players/PlayerCheckbox";
import {CreatePlayerFormInterface} from "../staff/CreatePlayer";
import {createTeamValidator} from "../../../tools/private/team.validator";
import {createTeam} from "../../../store/actions/team.action";

interface CreateTeamInterface {
    logout: any
}

interface CreateTeamFormInterface {

}

const genderArr = [
    {
        title: "Женская команда",
        gender: 'W'
    },
    {
        title: "Мужская команда",
        gender: 'M'
    },
] as SelectTeamFormInterface[]

const typeArr = [
    {
        title: "5x5",
        type: '5x5'
    },
    {
        title: "3x3",
        gender: '3x3'
    },
] as SelectTeamFormInterface[]

const ageArr = [
    {
        title: "U16",
        age: "U16"
    },
    {
        title: "U18",
        age: "U18"
    },
    {
        title: "Взрослые",
        age: "OLDER"
    },
] as SelectTeamFormInterface[]

export interface SelectTeamFormInterface {
    title: string
    gender?: string
    type?: string
    age?: string
    preview_img: any
    section_preview_img: any
    section_address: string
    section_training_time: string,
    players: [] | number[] | string[],
}

export const CreateTeam: React.FC<CreateTeamInterface> = ({logout}) => {
    const toast = useToast()
    const {coach, player} = useSelector((state: RootStateOrAny) => state)
    const dispatch = useDispatch();
    const [disable, setDisable] = useState<boolean>(false)
    const [form, setForm] = useState<SelectTeamFormInterface>({
        title: '',
        gender: "M",
        type: "5x5",
        age: "OLDER",
        preview_img: [],
        section_preview_img: [],
        section_address: "",
        section_training_time: "",
        players: []
    })
    const inputHandler = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = event.target
        setForm(state => ({
            ...state,
            [name]: value
        }))
    }
    const selectHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        const {name, value} = event.target
        setForm(state => ({
            ...state,
            [name]: value
        }))
    };
    const imageUploaderHandler = (imageList: ImageListType, name: string) => setForm(state => ({
        ...state,
        [name]: imageList as never[]
    }));
    const checkBoxHandler = (event: ChangeEvent<HTMLInputElement>, id: string) => {
        if (event.target.checked) {
            setForm((state: any) => {
                return ({...state, players: [...state.players, id]});
            })
        } else {
            // @ts-ignore
            const arr = form.players.filter((item: string) => item !== id)
            setForm(state => ({...state, players: arr}))
        }
    }
    const submitHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const error = createTeamValidator(form);
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
            toast({
                title: "Успешно",
                position: "top",
                description: "Отправляются данные на обработку",
                status: "info",
                duration: 7000,
                isClosable: true,
            })
            dispatch(createTeam(form, coach.coach.id))
            setDisable(() => false)
            logout();
        }
    }
    return (
        <>
            <Block py={6} px={4} maxW={{md: "540ox", xs: "100%"}}>
                <Text as={'h2'} fontWeight={600} textAlign={"center"} fontSize={"2rem"}>Форма создания команды</Text>
                <form onSubmit={submitHandler}>
                    <InputField onChange={inputHandler} value={form.title} label={"Введите Название Команды"}
                                placeholder={"Введите Название Команды"}
                                name={"title"}
                                type={"text"} disable={disable}/>
                    <Box p={4}>
                        <Text mb="8px">
                            Логотип команды
                        </Text>
                        <ImageUploading
                            value={form.preview_img}
                            onChange={value => imageUploaderHandler(value, "preview_img")}
                            maxNumber={1}
                        >
                            {({
                                  imageList,
                                  onImageUpload,
                                  onImageRemoveAll,
                                  isDragging,
                                  dragProps
                              }) => (
                                // write your building UI
                                <Flex
                                    w='100%'
                                    h='320px'
                                    maxW='320px'
                                    flexDirection={'column'}>
                                    {form.preview_img.length
                                        ? <Button
                                            variant={"outline"}
                                            colorScheme={"red"}
                                            isDisabled={disable}
                                            onClick={onImageRemoveAll}>Удалить фотографию</Button>
                                        : <Button
                                            colorScheme={"telegram"}
                                            onClick={onImageUpload}
                                            {...dragProps}
                                            variant={isDragging ? "ghost" : "outline"}
                                            isDisabled={disable}
                                            w='100%'
                                            h='100%'
                                            maxW='auto'
                                        >
                                            Нажмите или перетащите сюда
                                            <br/>
                                            Логотип команды
                                        </Button>}
                                    {imageList.map((image, index) => (
                                        <Flex
                                            justifyContent={"center"}
                                            alignItems={"center"}
                                            mt={4}
                                            w='100%'
                                            h='100%'
                                            border={'1px solid #007ab8'}
                                            p={'1.5rem'}
                                            key={index}
                                            borderRadius={'.625rem'}>
                                            <Box>
                                                <Image src={image.dataURL}/>
                                            </Box>
                                        </Flex>
                                    ))}
                                </Flex>
                            )}
                        </ImageUploading>
                    </Box>
                    <Box py={2}>
                        <Text>Выберете пол команды</Text>
                        <Select placeholder="Пол"
                                name={"gender"}
                                defaultValue={"M"}
                                onChange={selectHandler}
                                mt={2}>
                            <option value="M">Мужчины</option>
                            <option value="W">Женщины</option>
                        </Select>
                    </Box>
                    <Box py={2}>
                        <Text>Выберете тип команды</Text>
                        <Select placeholder="Пол"
                                name={"type"}
                                defaultValue={"5x5"}
                                onChange={selectHandler}
                                mt={2}>
                            <option value="5x5">5x5</option>
                            <option value="3x3">3x3</option>
                        </Select>
                    </Box>
                    <Box py={2}>
                        <Text>Выберете возрастную группу команды</Text>
                        <Select placeholder="Пол"
                                name={"age"}
                                defaultValue={"OLDER"}
                                onChange={selectHandler}
                                mt={2}>
                            <option value="U16">U16</option>
                            <option value="U18">U18</option>
                            <option value="OLDER">Взрослая</option>
                        </Select>
                    </Box>
                    <Box>
                        <Text as={'h2'} fontSize={'2rem'} fontWeight={"600"} pt={4}>Информация по тренировочной
                            базе </Text>
                        <Box p={4}>
                            <Text mb="8px">
                                Фотография тренировочной базы
                            </Text>
                            <ImageUploading
                                value={form.section_preview_img}
                                onChange={value => imageUploaderHandler(value, "section_preview_img")}
                                maxNumber={1}
                            >
                                {({
                                      imageList,
                                      onImageUpload,
                                      onImageRemoveAll,
                                      isDragging,
                                      dragProps
                                  }) => (
                                    // write your building UI
                                    <Flex
                                        w='100%'
                                        h='320px'
                                        maxW='320px'
                                        flexDirection={'column'}>
                                        {form.section_preview_img.length
                                            ? <Button
                                                variant={"outline"}
                                                colorScheme={"red"}
                                                isDisabled={disable}
                                                onClick={onImageRemoveAll}>Удалить фотографию</Button>
                                            : <Button
                                                colorScheme={"telegram"}
                                                onClick={onImageUpload}
                                                {...dragProps}
                                                variant={isDragging ? "ghost" : "outline"}
                                                isDisabled={disable}
                                                w='100%'
                                                h='100%'
                                                maxW='auto'
                                            >
                                                Нажмите или перетащите сюда
                                                <br/>
                                                фотографию Тренирочной базы
                                            </Button>}
                                        {imageList.map((image, index) => (
                                            <Flex
                                                justifyContent={"center"}
                                                alignItems={"center"}
                                                mt={4}
                                                w='100%'
                                                h='100%'
                                                border={'1px solid #007ab8'}
                                                p={'1.5rem'}
                                                key={index}
                                                borderRadius={'.625rem'}>
                                                <Box>
                                                    <Image src={image.dataURL}/>
                                                </Box>
                                            </Flex>
                                        ))}
                                    </Flex>
                                )}
                            </ImageUploading>
                        </Box>
                        <InputField onChange={inputHandler} value={form.section_address}
                                    label={"Введите действительный адрес тренировочной базы"}
                                    placeholder={"Введите действительный адрес тренировочной базы"}
                                    name={"section_address"}
                                    type={"text"} disable={disable}/>
                        <InputField onChange={inputHandler} value={form.section_training_time}
                                    label={"Введите дни и время тренировок  команды"}
                                    placeholder={"Введите дни и время тренировок  команды"}
                                    name={"section_training_time"}
                                    type={"text"} disable={disable}/>
                        <Text as={'small'} fontSize={"0.75rem"}>При вводе неккорректных данных - команда будет
                            удалена</Text>
                    </Box>
                    <Box>
                        <Text>Выберете игроков</Text>
                        {player.players.map((item: CreatePlayerFormInterface, key: number) =>
                            <Box py={2}>
                                <Checkbox size="md" colorScheme="blue" key={key}
                                          onChange={event => checkBoxHandler(event, item.id as string)}>
                                    <PlayerCheckbox name={item.name} surname={item.surname}
                                                    preview_img_path={item.preview_img.path}/>
                                </Checkbox>
                            </Box>
                        )}
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
