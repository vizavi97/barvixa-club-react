import {Dispatch} from "react";
import {DispatchEvent} from "../redux";
import {CHANGE_USER_PROFILE, LOADING_USER, LOGIN_USER, LOGOUT_USER, ME_QUERY, REGISTER_USER} from "../types/user.types";
import {
    ChangeUserInfoDispatchInterface,
    ChangeUserInfoInterface,
    LoginParamsInterface,
    RegisterParamsInterface,
    UserDispatchInterface,
    UserLoadingDispatchInterface
} from "../interfaces/user"
import {BACKEND_API_URL} from "../../config/app.config";
import axios from "axios";
import {SettingsStateInterface} from "../../pages/settings/Settings";

export const register = (params: RegisterParamsInterface) => async (dispatch: Dispatch<DispatchEvent<UserDispatchInterface>>) => {
    await axios.post(`${BACKEND_API_URL}signup`, {
        name: params.name,
        [params.activeTab]: params.activeTab === "email" ? params.email : params.phone,
        password: params.password,
        password_confirmation: params.password_confirmation,
        ref: params.ref
    })
        .then((resp) => {
            localStorage.setItem('token', resp.data.token)
            dispatch({
                type: REGISTER_USER,
                payload: {
                    user: resp.data.user,
                    token: resp.data.token,
                    loader: false,
                    message: 'Ваш вккаунт создан!',
                    error: false
                }
            })
        })
        .catch(error => {
            console.log(error.response)
            dispatch({
                type: REGISTER_USER,
                payload: {
                    user: null,
                    token: null,
                    loader: false,
                    message: `Ошибка: ${error.response.status === 401 ? "Такой Email уже используется" : error.response.data.error}`,
                    error: true
                }
            })
        })
}

export const login = (params: LoginParamsInterface) => async (dispatch: Dispatch<DispatchEvent<UserDispatchInterface>>) => {
    await axios.post(`http://vavilon.vizavi97.tmweb.ru/api/login`, {
        [params.activeTab]: params.activeTab === "email" ? params.email : params.phone,
        password: params.password,
    })
        .then((resp) => {
            localStorage.setItem('token', resp.data.token)
            dispatch({
                type: LOGIN_USER,
                payload: {
                    user: resp.data.user,
                    token: resp.data.token,
                    loader: false,
                    message: 'Добро пожаловать',
                    error: false
                }
            })
        })
        .catch(error => {
            dispatch({
                type: LOGIN_USER,
                payload: {
                    user: null,
                    token: null,
                    loader: false,
                    message: `Ошибка: Введены неверные данные`,
                    error: true
                }
            })
        })
}


export const meQuery = () => async (dispatch: Dispatch<DispatchEvent<UserDispatchInterface | UserLoadingDispatchInterface>>) => {
    dispatch({
        type: LOADING_USER,
        payload: {
            loader: true,
        }
    })

    if (localStorage.getItem('token')) {
        await axios.get(`${BACKEND_API_URL}profile`, {
            headers: {
                "Authorization": `${localStorage.getItem('token')}`
            }
        })
            .then((resp) => {
                dispatch({
                    type: ME_QUERY,
                    payload: {
                        user: resp.data.user,
                        token: localStorage.getItem('token'),
                        loader: false,
                        message: '',
                        error: false
                    }
                })
            })
            .catch(error => {
                dispatch({
                    type: ME_QUERY,
                    payload: {
                        user:  null,
                        token: null,
                        loader: false,
                        message: 'Ваша сессия устарела пожэалуйста авторизуйтесь!!',
                        error: true
                    }
                })
            })
    }

    else {
        dispatch({
            type: LOADING_USER,
            payload: {
                loader: false,
            }
        })
    }
}

export const changeUserInfo = (params: SettingsStateInterface) => async (dispatch: Dispatch<DispatchEvent<ChangeUserInfoDispatchInterface>>) => {
    if (localStorage.getItem('token')) {
        await axios.post(`${BACKEND_API_URL}change-user-info`, params,{
            headers: {
                "Authorization": `${localStorage.getItem('token')}`
            },
        })
            .then((resp) => {
                dispatch({
                    type: CHANGE_USER_PROFILE,
                    payload: {
                        user: resp.data.user,
                        message: `Ваши изменения сохранены`,
                        error: false
                    }
                })
            })
            .catch(error => {
                dispatch({
                    type: CHANGE_USER_PROFILE,
                    payload: {
                        message: `Что-то пошло не так`,
                        error: true
                    }
                })
            })
    }
}


export const logOutUser = () =>  (dispatch: Dispatch<DispatchEvent<UserDispatchInterface>>) => {
    localStorage.removeItem('token')
    dispatch({
        type: LOGOUT_USER,
        payload: {
            user: null,
            token: null,
            loader: false,
            message: `Вы удачно покинули сессию`,
            error: false
        }
    })
}