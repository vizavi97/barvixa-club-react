import {RegisterFormInterface} from "../../pages/auth/Register";

export const validateRegister = (state: RegisterFormInterface, activeTab:string): string | boolean => {
    if (activeTab === "email") {
        if (!state.email.length || !state.name.length || !state.password.length) {
            return 'Все поля должны быть заполнены!'
        }
        if (state.email.length < 5 || !state.email.includes('@')) {
            return "Поле должно включать в себя символ - '@'"
        }
    }
    if (activeTab === "phone") {
        if (!state.phone.length || !state.name.length || !state.password.length) {
            return 'Все поля должны быть заполнены!'
        }
        if (state.phone.length < 7) {
            return "Телефонный номер должен быть длинее чем 7 символов"
        }
    }
    if(state.password_confirmation !== state.password) {
        return 'Пароли не совпадают'
    }
    if (state.password.length < 7) {
        return "Пароль должен быть длинее чем 7 символов"
    }
    return false
};
