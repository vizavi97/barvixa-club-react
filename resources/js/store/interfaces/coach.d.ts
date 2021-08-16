export interface CoachDefaultStateInterface {
    coach: null | CoachFieldsInterface,
    loader: false,
    error: false,
    message: '',
}
export interface CoachFieldsInterface {
    name: string
    surname: string
    pc_quality: string
    living_address: string
    working_address: string
    birth:string
    nationality:string
    langs:string
}


export interface CoachRegisterInterface {
    name: string
    surname: string
    pc_quality: string
    living_address: string
    working_address: string
    birth:string
    nationality:string
    langs:string
}

