import {AppInterface} from "../interfaces/app";
import {DispatchEvent} from "../redux";
import {APP_CHANGE_LANGUAGE} from "../types/app.types";

const initialState = {
  activeLang: "ru",
  languages: [
    {
      lang: 'ru',
      title: "Русский"
    },
    {
      lang: 'en',
      title: "English"
    }
  ]
}

export const appReducer = (state:AppInterface = initialState, action:DispatchEvent<any>) => {
  const {type, payload} = action
  switch (type) {
    case APP_CHANGE_LANGUAGE:
      return {
        ...state,
        activeLang: payload.lang
      }
    default: return state
  }
}