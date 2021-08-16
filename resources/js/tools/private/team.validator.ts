import {SelectTeamFormInterface} from "../../pages/private/team/CreateTeam";


export const createTeamValidator = (state:SelectTeamFormInterface) => {
    if (
        !state.title
        || !state.gender
        || !state.age
        || !state.section_training_time
        || !state.section_training_time
    )
        return "Заполните все поля"

    if (!state.preview_img.length)
        return "Загрузите логотип команды"

    if (!state.section_preview_img.length)
        return "Загрузите Фотографию тренировчной арены"

    if (!state.players.length)
        return "Выбирите игроков для команды, если поля с игроками пусты, тогда создайте игроков"

    return false
}