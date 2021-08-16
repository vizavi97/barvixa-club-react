import {CoachRegisterInterface} from "../../pages/auth/types/RegisterNextStep";

export const validateRegisterNextStep = (state: CoachRegisterInterface, role: string): string | boolean => {
    if (!role)
        return 'Выберете роль!!!'

    if (role === "coach") {
        if (
            !state.name
            || !state.surname
            || !state.pc_quality
            || !state.living_address
            || !state.working_address
            || !state.birth
            || !state.nationality
            || !state.langs
        )
            return "Все поля должны быть заполнены"

        if (
            !state.passport.length
            || !state.preview_img.length
            || !state.diploma_file.length
            || !state.certificate_file.length
            || !state.categories_file.length
            || !state.international_file.length
        )
            return "Все документы должны быть загруженны"
    }
    return false
};
