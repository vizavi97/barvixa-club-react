import React, {ChangeEvent, FormEvent, useState} from 'react'
import {Box, Button, Flex, Image, Input, Select, Text, useToast} from "@chakra-ui/react";
import {validateRegisterNextStep} from "../../../tools/auth/register.role.validate";
import {CoachRegisterInterface, RegisterNextStepInterface} from "../types/RegisterNextStep";
import {InputField} from "../../../components/InputField";
import ImageUploading, {ImageListType} from "react-images-uploading";
import 'react-datepicker/dist/react-datepicker.css'
// @ts-ignore
import DatePicker from "react-datepicker/dist/react-datepicker";
import {RootStateOrAny, useDispatch, useSelector} from "react-redux";
import {coachRegister} from "../../../store/actions/coach.action";

interface CoachInterface {role: string}

export const Coach: React.FC<CoachInterface> = ({role}) => {
    const toast = useToast()
    const dispatch = useDispatch();
    const {user} = useSelector((state:RootStateOrAny) => state.user)
    const [disable, setDisable] = useState<boolean>(false);
    const [form, setForm] = useState<RegisterNextStepInterface<CoachRegisterInterface>>({
        role: role,
        info: {
            name: "",
            surname: "",
            position: "Главный",
            pc_quality: "",
            langs: "",
            living_address: "",
            working_address: "",
            birth: "",
            nationality: "",
            passport: [],
            preview_img: [],
            diploma_file: [],
            certificate_file: [],
            categories_file: [],
            international_file: [],
            other_files: [],
        }
    })
    const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target
        setForm(state => ({
            ...state,
            info: {
                ...state.info,
                [name]: value
            }

        }))
    };
    const selectHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        const {name, value} = event.target
        setForm(state => ({
            ...state,
            info: {
                ...state.info,
                [name]: value
            }

        }))
    };
    const submitHandler = async (event: FormEvent) => {
        event.preventDefault();
        const error = validateRegisterNextStep(form.info, role);
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
            dispatch(coachRegister(form.info, String(user.id)))
            setDisable(() => false)
        }
    };
    const dateHandler = (date: string) => setForm(state => ({...state, info: {...state.info, birth: new Date(date).toLocaleDateString()}} ));

    const imageUploaderHandler = (imageList: ImageListType, name: string) => setForm(state => ({
        ...state,
        info: {
            ...state.info,
            [name]: imageList as never[]
        }
    }));
    return (
        <Flex as={'form'} onSubmit={submitHandler} method="POST" flexDirection={'column'} pt={4}>
            <InputField onChange={inputHandler} value={form.info.name} label={"Имя"} placeholder={"Имя"} name={"name"}
                        type={"text"} disable={disable}/>
            <InputField onChange={inputHandler} value={form.info.surname} label={"Фамилия"} placeholder={"Фамилия"}
                        name={"surname"} type={"text"} disable={disable}/>
            <InputField onChange={inputHandler} value={form.info.living_address} label={"Место проживания"}
                        placeholder={"Место проживания"} name={"living_address"} type={"text"} disable={disable}/>
            <InputField onChange={inputHandler} value={form.info.working_address} label={"Место работы"}
                        placeholder={"Место работы"} name={"working_address"} type={"text"} disable={disable}/>
            <InputField onChange={inputHandler} value={form.info.nationality} label={"Национальность"}
                        placeholder={"Национальность"} name={"nationality"} type={"text"} disable={disable}/>
            <Select placeholder="Владение компьютером *"
                    name={"pc_quality"}
                    onChange={selectHandler}
                    mt={2}>
                <option value="h">Высокий (Полностью понимаю)</option>
                <option value="m">Средний (Знаю азы - Word, excel, и другие основные программы)</option>
                <option value="l">Низкий (Знаю как включать)</option>
                <option value="n">Никогда не пользовался</option>
            </Select>
            <InputField onChange={inputHandler} value={form.info.langs}
                        label={"Опишите владение языка в формате от 1 до 5  (Русский 5, Узбекский: 3)"}
                        placeholder={"Опишите владение языка в формате от 1 до 5  (Русский 5, Узбекский: 3)"} name={"langs"} type={"text"} disable={disable}/>

            <Box py={4}>
                <Text mb="8px" textAlign="left">
                    Дата рождения *
                </Text>
                <Box>
                    <DatePicker
                        value={form.info.birth}
                        onChange={dateHandler}
                        dropdownMode="select"
                        showMonthDropdown
                        showYearDropdown
                        adjustDateOnChange
                    />
                </Box>
                {/*/>*/}
            </Box>
            {/*Ваша ФОТОГРАФИЯ 3x4*/}
            <Box py={4}>
                <Text mb="8px" textAlign={"left"}>
                    Ваша ФОТОГРАФИЯ 3x4
                </Text>
                <ImageUploading
                    value={form.info.preview_img}
                    onChange={(image) => imageUploaderHandler(image,"preview_img")}
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
                            h='100%'
                            maxW='100%'
                            flexDirection={'column'}>
                            {form.info.preview_img.length
                                ? <Button
                                    variant={"outline"}
                                    colorScheme={"red"}
                                    isDisabled={disable}
                                    onClick={onImageRemoveAll}>Удалить</Button>
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
                                    Нажмите или перетащите
                                    сюда <br/>
                                    Ваша ФОТОГРАФИЯ 3x4
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
            {/*Паспорт*/}
            <Box py={4}>
                <Text mb="8px" textAlign={"left"}>
                    Сканер вашего паспорта с пропиской
                </Text>
                <ImageUploading
                    value={form.info.passport}
                    onChange={(image) => imageUploaderHandler(image,"passport")}
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
                            h='100%'
                            maxW='100%'
                            flexDirection={'column'}>
                            {form.info.passport.length
                                ? <Button
                                    variant={"outline"}
                                    colorScheme={"red"}
                                    isDisabled={disable}
                                    onClick={onImageRemoveAll}>Удалить</Button>
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
                                    Нажмите или перетащите
                                    сюда <br/>
                                    Сканер вашего паспорта с пропиской
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
            {/*Диплом (Образование)*/}
            <Box py={4}>
                <Text mb="8px" textAlign={"left"}>
                    Диплом (Образование)
                </Text>
                <ImageUploading
                    value={form.info.diploma_file}
                    onChange={(image) => imageUploaderHandler(image,"diploma_file")}
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
                            h='100%'
                            maxW='100%'
                            flexDirection={'column'}>
                            {form.info.diploma_file.length
                                ? <Button
                                    variant={"outline"}
                                    colorScheme={"red"}
                                    isDisabled={disable}
                                    onClick={onImageRemoveAll}>Удалить</Button>
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
                                    Нажмите или перетащите
                                    сюда <br/>

                                    Диплом (Образование)
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
            {/*Сертификат подтверждения Квалификации*/}
            <Box py={4}>
                <Text mb="8px" textAlign={"left"}>
                    Сертификат подтверждения Квалификации
                </Text>
                <ImageUploading
                    value={form.info.certificate_file}
                    onChange={(image) => imageUploaderHandler(image,"certificate_file")}
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
                            h='100%'
                            maxW='100%'
                            flexDirection={'column'}>
                            {form.info.certificate_file.length
                                ? <Button
                                    variant={"outline"}
                                    colorScheme={"red"}
                                    isDisabled={disable}
                                    onClick={onImageRemoveAll}>Удалить</Button>
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
                                    Нажмите или перетащите
                                    сюда <br/>
                                    Сертификат подтверждения Квалификации
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
            {/*Документ категории тренера*/}
            <Box py={4}>
                <Text mb="8px" textAlign={"left"}>
                    Документ категории тренера
                </Text>
                <ImageUploading
                    value={form.info.categories_file}
                    onChange={(image) => imageUploaderHandler(image,"categories_file")}
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
                            h='100%'
                            maxW='100%'
                            flexDirection={'column'}>
                            {form.info.categories_file.length
                                ? <Button
                                    variant={"outline"}
                                    colorScheme={"red"}
                                    isDisabled={disable}
                                    onClick={onImageRemoveAll}>Удалить</Button>
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
                                    Нажмите или перетащите
                                    сюда <br/>
                                    Документ категории тренера
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
            {/*Международний сертификат*/}
            <Box py={4}>
                <Text mb="8px" textAlign={"left"}>
                    Международний сертификат
                </Text>
                <ImageUploading
                    value={form.info.international_file}
                    onChange={(image) => imageUploaderHandler(image,"international_file")}
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
                            h='100%'
                            maxW='100%'
                            flexDirection={'column'}>
                            {form.info.international_file.length
                                ? <Button
                                    variant={"outline"}
                                    colorScheme={"red"}
                                    isDisabled={disable}
                                    onClick={onImageRemoveAll}>Удалить</Button>
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
                                    Нажмите или перетащите
                                    сюда <br/>
                                    Международний сертификат
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
            {/*Другие документы*/}
            <Box py={4}>
                <Text mb="8px" textAlign={"left"}>
                    Другие документы
                </Text>
                <ImageUploading
                    value={form.info.other_files}
                    onChange={(image) => imageUploaderHandler(image,"other_files")}
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
                            h='100%'
                            maxW='100%'
                            flexDirection={'column'}>
                            {form.info.other_files.length
                                ? <Button
                                    variant={"outline"}
                                    colorScheme={"red"}
                                    isDisabled={disable}
                                    onClick={onImageRemoveAll}>Удалить</Button>
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
                                    Нажмите или перетащите
                                    сюда <br/>
                                    Другие документы
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
            <Button
                type={'submit'}
            >
                Отправить
            </Button>
        </Flex>
    )
}
