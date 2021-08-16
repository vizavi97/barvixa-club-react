import React, {ChangeEvent, FormEvent, useState} from 'react'
import {Block} from "../../../config/ui/Block";
import {Box, Button, Flex, Image, Input, Select, Text, toast, useToast} from "@chakra-ui/react";
import ImageUploading, {ImageListType} from "react-images-uploading";
import 'react-datepicker/dist/react-datepicker.css'
// @ts-ignore
import DatePicker from "react-datepicker/dist/react-datepicker";
import {InputField} from "../../../components/InputField";
import {RootStateOrAny, useDispatch, useSelector} from "react-redux";
import {createPlayerValidator} from "../../../tools/private/player.validator";
import {createPlayer} from "../../../store/actions/player.action";

interface CreatePlayerInterface {
    logout: any
}

export interface CreatePlayerFormInterface {
    id?: string
    name: string
    surname: string
    father_name: string
    gender: "M" | "W"
    game_number: number
    birth: string | number | readonly string[] | undefined
    nationality: string
    place_of_birth: string
    place_of_living: string
    phone_number: string
    height: number
    position: string
    age: number
    preview_img: any
    training_time: number,
    playing_time: number,
    trauma?: string
    mother_height?: number
    father_height?: number
}

export const CreatePlayer: React.FC<CreatePlayerInterface> = ({logout}) => {
    const toast = useToast()
    const {coach} = useSelector((state:RootStateOrAny) => state.coach)
    const dispatch = useDispatch();
    const [disable, setDisable] = useState<boolean>(false)
    const [form, setForm] = useState<CreatePlayerFormInterface>({
        name: "",
        surname: "",
        father_name: "",
        game_number: 0,
        birth: new Date().toLocaleDateString(),
        nationality: "",
        phone_number: "",
        place_of_birth: "",
        place_of_living: "",
        height: 170,
        position: '',
        age: 18,
        gender: "M",
        preview_img: [],
        training_time: 0,
        playing_time: 0,
        trauma: "",
        mother_height: 0,
        father_height: 0,
    })
    const dateHandler = (date: string) => setForm(state => ({...state, birth: new Date(date).toLocaleDateString()}));
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
    const imageUploaderHandler = (imageList: ImageListType) => setForm(state => ({
        ...state,
        preview_img: imageList as never[]
    }));
    const submitHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const error = createPlayerValidator(form);
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
            dispatch(createPlayer(form, coach.id))
            setDisable(() => false)
            logout();
        }
    }
    return (
        <>
            <Block py={6} px={4} maxW={{md: "540ox", xs: "100%"}}>
                <Text as={'h2'} fontWeight={600} textAlign={"center"} fontSize={"2rem"}>Форма Создания игрока</Text>
                <form onSubmit={submitHandler}>
                    <InputField onChange={inputHandler} value={form.name} label={"Имя игрока"} placeholder={"Имя"}
                                name={"name"} type={"text"} disable={disable}/>

                    <InputField onChange={inputHandler} value={form.surname} label={"Фамилия игрока"}
                                placeholder={"Фамилия"}
                                name={"surname"} type={"text"} disable={disable}/>
                    <InputField onChange={inputHandler} value={form.father_name} label={"Отчество игрока"}
                                placeholder={"Отчество игрока"}
                                name={"father_name"} type={"text"} disable={disable}/>
                    <Box py={4}>
                        <Text mb="8px" textAlign="left">
                            Дата рождения *
                        </Text>
                        <Box>
                            <DatePicker
                                value={form.birth}
                                onChange={dateHandler}
                                dropdownMode="select"
                                showMonthDropdown
                                showYearDropdown
                                adjustDateOnChange
                            />
                        </Box>
                        {/*/>*/}
                    </Box>


                    <Box p={4}>
                        <Text mb="8px">
                            Фотография игрока
                        </Text>
                        <ImageUploading
                            value={form.preview_img}
                            onChange={imageUploaderHandler}
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
                                            фотографию игрока
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

                    <InputField onChange={inputHandler} value={form.nationality} label={"Национальность игрока"}
                                placeholder={"Национальность игрока"}
                                name={"nationality"} type={"text"} disable={disable}/>

                    <InputField onChange={inputHandler} value={form.height} label={"Рост игрока в см"}
                                placeholder={"Рост см"}
                                name={"height"} type={"number"} disable={disable}/>

                    <InputField onChange={inputHandler} value={form.age} label={"Возраст лет"}
                                placeholder={"Возраст лет"}
                                name={"age"} type={"number"} disable={disable}/>

                    <InputField onChange={inputHandler} value={form.place_of_birth} label={"Место рождения"}
                                placeholder={"Место рождения"}
                                name={"place_of_birth"} type={"text"} disable={disable}/>

                    <InputField onChange={inputHandler} value={form.place_of_living} label={"Место жительства"}
                                placeholder={"Место жительства"}
                                name={"place_of_living"} type={"text"} disable={disable}/>

                    <InputField onChange={inputHandler} value={form.position} label={"Позиция игрока"}
                                placeholder={"Позиция игрока"}
                                name={"position"} type={"text"} disable={disable}/>
                    <InputField onChange={inputHandler} value={form.game_number} label={"Введите Игровой номер игрока"}
                                placeholder={"Игровой номер"}
                                name={"game_number"} type={"number"} disable={disable}/>
                    <InputField onChange={inputHandler} value={form.playing_time} label={"Игровой стаж (лет)"}
                                placeholder={"Игровой стаж"}
                                name={"playing_time"} type={"number"} disable={disable}/>
                    <InputField onChange={inputHandler} value={form.training_time} label={"Тренировочный стаж (лет)"}
                                placeholder={"Тренировочный стаж"}
                                name={"training_time"} type={"number"} disable={disable}/>
                    <InputField onChange={inputHandler} value={form.phone_number} label={"Номер телефона для связи"}
                                placeholder={"Номер телефона для связи"}
                                name={"phone_number"} type={"number"} disable={disable}/>
                    <Box>
                        <Text>Выберете пол (поумолчанию мужчина)</Text>
                        <Select placeholder="Пол"
                                name={"gender"}
                                defaultValue={"M"}
                                onChange={selectHandler}
                                mt={2}>
                            <option value="M">Мужчина</option>
                            <option value="W">Женщина</option>
                        </Select>
                    </Box>
                    {form.age < 18 &&
                    <Box>
                        <Text>Информация о состоянии игрока молодежки</Text>

                        <InputField onChange={inputHandler} value={form.father_height ?? ""} label={"Рост отца в см"}
                                    placeholder={"Рост отца в см"}
                                    name={"father_height"} type={"number"} disable={disable}/>

                        <InputField onChange={inputHandler} value={form.mother_height ?? ""} label={"Рост матери в см"}
                                    placeholder={"Рост матери  в см"}
                                    name={"mother_height"} type={"number"} disable={disable}/>
                        <InputField onChange={inputHandler} value={form.trauma ?? ""}
                                    label={"Опишите травмы или потологии, если они имеются"}
                                    placeholder={"Опишите травмы или потологии, если они имеются"}
                                    name={"trauma"} type={"text"} disable={disable}/>
                    </Box>
                    }
                    <Flex justifyContent={"center"} alignItems={"center"} pt={4}>

                        <Button variant={"outline"}
                                colorScheme={"teal"}
                                isDisabled={disable}
                                type={"submit"}
                                mx={2}
                        >Подтвердить и выйти</Button>
                    </Flex>
                </form>
            </Block>
        </>
    )
}
