export interface UserStateInterface {
    user: UserInterface | null | boolean
    token: string | null
    loader: boolean
    error: boolean
    message: string
    renderCounter: number
}


export interface UserDispatchInterface {
    user: UserInterface | null | boolean
    token: string | null
    loader: boolean
    error: boolean
    message: string
}

export interface ChangeUserInfoDispatchInterface {
    user?: UserInterface | null | boolean
    error: boolean
    message: string
}

interface UserInterface {
    email: string
    id: number | string
    is_activated: boolean
    name: string
    username: string
    phone: ''
    soc?: SocialLinksInterface
}

interface SocialLinksInterface {
    soc_facebook: string | null
    soc_instagram: string | null
    soc_telegram: string | null
}
export interface UserLoadingDispatchInterface {
    loader: boolean
}


export interface RegisterParamsInterface {
    activeTab: "email" | "phone" | string
    email?: string
    phone?: string | number
    password: string
    password_confirmation: string
    name: string
    ref: string | number | null
}


export interface LoginParamsInterface {
    activeTab: "email" | "phone" | string
    email?: string
    phone?: string | number
    password: string
}


export interface RefUserInterface {
    name: string
    surname: string
}


export interface ChangeUserInfoInterface extends UserInterface {}