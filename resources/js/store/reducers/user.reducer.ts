import {DispatchEvent} from "../redux";
import {UserStateInterface} from "../interfaces/user";
import {CHANGE_USER_PROFILE, LOADING_USER, LOGIN_USER, LOGOUT_USER, ME_QUERY, REGISTER_USER} from "../types/user.types";


const initialState = {
    user: null,
    token: localStorage.getItem('token') || null,
    loader: false,
    error: false,
    message: '',
    renderCounter: 0
} as UserStateInterface

export const userReducer = (state = initialState, action: DispatchEvent<any>) => {
    const {type, payload} = action
    switch (type) {
        case REGISTER_USER:
            return {
                ...state,
                user: payload.user,
                token: payload.token,
                loader: payload.loader,
                error: payload.error,
                message: payload.message,
                renderCounter: ++state.renderCounter
            }
        case LOGIN_USER:
            return {
                ...state,
                user: payload.user,
                token: payload.token,
                loader: payload.loader,
                error: payload.error,
                message: payload.message,
                renderCounter: ++state.renderCounter
            }
        case ME_QUERY:
            return {
                ...state,
                user: payload.user,
                token: payload.token,
                loader: payload.loader,
                error: payload.error,
                message: payload.message,
                renderCounter: ++state.renderCounter
            }
        case CHANGE_USER_PROFILE:
            return {
                ...state,
                user: payload.error ? state.user : payload.user,
                error: payload.error,
                message: payload.message,
                renderCounter: ++state.renderCounter
            }
        case LOGOUT_USER:
            return {
                user: payload.user,
                token: payload.token,
                loader: payload.loader,
                error: payload.error,
                message: payload.message,
                renderCounter: 0
            }
        case LOADING_USER:
            return {
                loader: payload.loader,
                renderCounter: 0
            }

        default:
            return state
    }
}