import React, {ChangeEvent, FormEvent, useState} from 'react'
import {Block} from "../../../config/ui/Block";
import {Text} from "@chakra-ui/react";
import 'react-datepicker/dist/react-datepicker.css'
// @ts-ignore
import DatePicker from "react-datepicker/dist/react-datepicker";
import {InputField} from "../../../components/InputField";
import {RootStateOrAny, useSelector} from "react-redux";

export interface CoachSettingsInterface {
}

export const Settings: React.FC = () => {
    const [disable] = useState<boolean>(false)
    const [form, setForm] = useState<CoachSettingsInterface>({})
    const selector = useSelector((state:RootStateOrAny) => state.user)

    const refLink = (window.location.origin as unknown as string) + "/register?ref="

    console.log(selector)

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
                <Text as={'h2'} fontWeight={600} textAlign={"center"} fontSize={"2rem"}>Настройки</Text>
                <form onSubmit={submitHandler}>
                    <InputField value={'12312'} label={'12312'} placeholder={'12312'} name={'ref-link'} type={"text"} disable={true} onChange={inputHandler}/>

                </form>
            </Block>
        </>
    )
}
