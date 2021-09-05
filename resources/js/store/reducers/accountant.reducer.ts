import {DispatchEvent} from "../redux";
import {AccountantStateInterface} from "../interfaces/accountant";
import {CHANGE_FILTERED_STRING, GET_CONSUMABLES, PUT_CONSUMABLES_TO_CHOSE} from "../types/accountant.types";

const initialState = {
  consumables: [],
  isLoading: false,
  isChoseConsumables: [],
  filteredString: "",
} as AccountantStateInterface

export const AccountantReducer = (state = initialState, action: DispatchEvent<any>) => {
  const {type, payload} = action
  switch (type) {
    case GET_CONSUMABLES:
      return {
        ...state,
        consumables: payload.consumables,
        isLoading: payload.isLoading
      }

    case PUT_CONSUMABLES_TO_CHOSE:
      return {
        ...state,
        isChoseConsumables: !state.isChoseConsumables.some(item => item.id === payload.isChoseConsumables) ?
          [...state.isChoseConsumables, state.consumables.filter(item => item.id === payload.isChoseConsumables)[0]] :
          state.isChoseConsumables
      }
    case CHANGE_FILTERED_STRING:
      return {
        ...state,
        filteredString: payload.filteredString
      }
    default:
      return state
  }
}
