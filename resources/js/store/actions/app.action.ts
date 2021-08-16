import {Dispatch} from "react";
import {DispatchEvent} from "../redux";
import {APP_CHANGE_LANGUAGE} from "../types/app.types";
import {LanguageDispatchInterface} from "../interfaces/app";

export const changeLanguage = (language:string) => (dispatch:Dispatch<DispatchEvent<LanguageDispatchInterface>>) => dispatch({
  type: APP_CHANGE_LANGUAGE,
  payload: {
    lang: language
  }
})