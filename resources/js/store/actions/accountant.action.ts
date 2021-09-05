import {Dispatch} from "react";
import {DispatchEvent} from "../redux";
import {CHANGE_FILTERED_STRING, GET_CONSUMABLES, PUT_CONSUMABLES_TO_CHOSE} from "../types/accountant.types";
import {
  AccountantDispatchInterface,
  ChangeFilteredStringDispatchInterface,
  ChooseConsumablesDispatchInterface
} from "../interfaces/accountant";
import axios from "axios";
import {BACKEND_ROUTES} from "../../config/app.config";

export const getConsumables = () =>
  async (dispatch: Dispatch<DispatchEvent<AccountantDispatchInterface>>) => {
    dispatch({
      type: GET_CONSUMABLES,
      payload: {
        consumables: [],
        isLoading: true
      }
    })
    await axios.get(BACKEND_ROUTES.CONSUMABLES)
      .then(
        resp => dispatch({
          type: GET_CONSUMABLES,
          payload: {
            isLoading: false,
            consumables: resp.data
          }
        })
      )
      .catch(error =>
        dispatch({
          type: GET_CONSUMABLES,
          payload: {
            consumables: [],
            isLoading: false
          }
        }))
  }


export const setFilteredString = (str: string) =>
  (dispatch: Dispatch<DispatchEvent<ChangeFilteredStringDispatchInterface>>) => {
    dispatch({
      type: CHANGE_FILTERED_STRING,
      payload: {
        filteredString: str
      }
    })
  }


export const putToChoseConsumables = (id: number | string) =>
  (dispatch: Dispatch<DispatchEvent<ChooseConsumablesDispatchInterface>>) => {
    dispatch({
      type: PUT_CONSUMABLES_TO_CHOSE,
      payload: {
        isChoseConsumables: Number(id)
      }
    })
  }

