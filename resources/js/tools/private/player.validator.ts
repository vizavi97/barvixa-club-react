import {CreatePlayerFormInterface} from "../../pages/private/staff/CreatePlayer";

export const createPlayerValidator = (state: CreatePlayerFormInterface): string | boolean => {
    if (
        !state.name
        || !state.surname
        || !state.father_name
        || !state.gender
        || !state.game_number
        || !state.phone_number
        || !state.birth
        || !state.nationality
        || !state.place_of_birth
        || !state.place_of_living
        || !state.height
        || !state.position
        || !state.age
        || !state.playing_time
        || !state.training_time
    )
        return "Заполните все поля"

    if (!state.preview_img.length)
        return "Загрузите фотографию игрока"

    if (state.playing_time <= 0 || state.training_time <= 0)
        return "Тренировный стаж или игровой стаж не могут быть отрицательными"


    if (
        state.height < 120 && state.height > 230
    )
        return "Введите корректный рост"

    if (state.age < 18) {
        if (
            !state.father_height
            || !state.mother_height
            || !state.trauma
        )
            return "Заполните поля относящийся к родителям и потологиям"
        if (
            state.father_height < 140
            || state.mother_height < 140
        )
            return "Введите корректный рост"
    }
    return false
}