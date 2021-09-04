import {Dispatch} from "react";
import {DispatchEvent} from "../redux";
import {GET_CONSUMABLES, PUT_CONSUMABLES_TO_CHOSE} from "../types/accountant.types";
import {AccountantDispatchInterface, chooseConsumablesDispatchInterface} from "../interfaces/accountant";
import axios from "axios";
import {BACKEND_ROUTES} from "../../config/app.config";

export const getConsumables = () =>
  (dispatch: Dispatch<DispatchEvent<AccountantDispatchInterface>>) => {
    dispatch({
      type: GET_CONSUMABLES,
      payload: {
        consumables: [],
        isLoading: true
      }
    })
    axios.get(BACKEND_ROUTES.CONSUMABLES)
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
export const putToChoseConsumables = (id: number | string) =>
  (dispatch: Dispatch<DispatchEvent<chooseConsumablesDispatchInterface>>) => {
    dispatch({
      type: PUT_CONSUMABLES_TO_CHOSE,
      payload: {
        isChoseConsumables: Number(id)
      }
    })
  }

