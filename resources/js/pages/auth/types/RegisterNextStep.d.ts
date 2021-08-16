export interface RegisterNextStepInterface<T> {
    role: "Coach" | "Player" | "Administration" | "" | String
    info: T
}


export interface CoachRegisterInterface {
    name : string
    surname : string
    position: "Главный" | "Помощник"
    pc_quality: "Высокий" | "Средний" | "Низкий" | "Никогда не работал" | ""
    langs: string
    living_address: string
    working_address: string
    birth: string | number | readonly string[] | undefined
    nationality: string
    passport: any,
    preview_img: any,
    diploma_file: any,
    certificate_file: any,
    categories_file: any,
    international_file: any,
    other_files: any,
}

