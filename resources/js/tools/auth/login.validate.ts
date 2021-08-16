import {LoginInterface} from "../../pages/auth/Login";

export const validateLogin = (state: LoginInterface): string | boolean => {
    if (!state.email.length || !state.password.length) {
        return 'Все поля должны быть заполнены!'
    }
    if (state.email.length < 5 || !state.email.includes('@')) {
        return "Поле должно включать в себя символ - '@'"
    }
    if (state.password.length < 7) {
        return "Пароль должен быть длинее чем 7 символов"
    }
    return false
};
