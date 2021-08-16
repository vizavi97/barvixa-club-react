import {SettingsStateInterface} from "../../pages/settings/Settings";

export const settingsValidator = (params: SettingsStateInterface) => {
    if (!params.email.includes('@')) {
        return 'поле email заполнены не корекктно'
    }
    if (params.phone.length) {
        if (params.phone.length < 6 && !params.phone.includes('+')) {
            return "Введен некорректный номер телефона номер телефона должен быть '+xxxxxxxxxx'"
        }
    }
    if (params.name.length < 4) {
        return "Поле имя слишком короткое"
    }
    if (params.instagram.length) {
        if (!params.instagram.includes('instagram.com')) {
            return "Поле instagram введено некорректно"
        }
    }
    if (params.facebook?.length) {
        if (!params.facebook.includes('facebook.com')) {
            return "Поле facebook введено некорректно"
        }
    }
    if (params.telegram?.length) {
        if (!params.telegram.includes('telegram')) {
            return "Поле telegram введено некорректно"
        }
    }
    return false
}