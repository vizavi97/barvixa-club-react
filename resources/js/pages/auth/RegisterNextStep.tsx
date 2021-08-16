import React, {useState} from 'react'
import {Box, Select, Text} from "@chakra-ui/react";
import {Coach} from "./register-next-step-cases/Coach";


export const RegisterNextStep: React.FC = () => {
    const [role, setRole] = useState<string>("");
    return (
        <Box w={'100%'}>
            <Text fontSize='1.5rem'>Второй этап Регистрации</Text>
            <Text fontSize='0.785rem'>Чтобы окончить регистраницию просим Вас заполнить следущие поля</Text>
            <Select placeholder="Выберете роль" onChange={event => setRole(event.target.value)} mt={2}>
                <option value="coach">Тренер</option>
                {/*<option value="player">Игрок</option>*/}
            </Select>

            {role === "coach" && <Coach role={role}/>}
        </Box>
    )
}
