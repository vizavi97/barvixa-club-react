import {Dispatch} from "react";
import {DispatchEvent} from "../redux";
import {
  CHANGE_CONSUMABLE_IN_ARRAY,
  CHANGE_FILTERED_STRING,
  DELETE_All_CONSUMABLES_TO_CHOSE, DELETE_CONSUMABLES_TO_CHOSE,
  GET_CONSUMABLES,
  PUT_CONSUMABLES_TO_CHOSE, SEND_ALL_CONSUMABLES
} from "../types/accountant.types";
import {
  AccountantDispatchInterface, ChangeConsumableInArrayDispatchInterface,
  ChangeFilteredStringDispatchInterface,
  ChooseConsumablesDispatchInterface, ConsumablesInterface
} from "../interfaces/accountant";
import axios from "axios";
import {BACKEND_ROUTES} from "../../config/app.config";
import {FormStateInterface} from "../../components/Accountant/СalculationConsumableCell";

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

export const changeConsumableInArray = (id: number | string, form: FormStateInterface) =>
  (dispatch: Dispatch<DispatchEvent<ChangeConsumableInArrayDispatchInterface>>) => {
    dispatch({
      type: CHANGE_CONSUMABLE_IN_ARRAY,
      payload: {
        id: id,
        form: form
      }
    })
  }

export const removeChoseConsumables = (id: number | string) =>
  (dispatch: Dispatch<DispatchEvent<ChooseConsumablesDispatchInterface>>) => {
    dispatch({
      type: DELETE_CONSUMABLES_TO_CHOSE,
      payload: {
        isChoseConsumables: Number(id)
      }
    })
  }


export const deleteAllChoseConsumables = () =>
  (dispatch: Dispatch<DispatchEvent<ChooseConsumablesDispatchInterface>>) => {
    dispatch({
      type: DELETE_All_CONSUMABLES_TO_CHOSE,
      payload: {
        isChoseConsumables: []
      }
    })
  }

export const sendAllConsumable = (consArr: ConsumablesInterface[]) =>
  (dispatch: Dispatch<DispatchEvent<ChooseConsumablesDispatchInterface>>) => {
    console.log('sended',consArr)
    dispatch({
      type: SEND_ALL_CONSUMABLES,
      payload: {
        isChoseConsumables: []
      }
    })
  }
