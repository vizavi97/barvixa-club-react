import {DispatchEvent} from "../redux";
import {AccountantStateInterface} from "../interfaces/accountant";
import {
  CHANGE_CONSUMABLE_IN_ARRAY,
  CHANGE_FILTERED_STRING, DELETE_All_CONSUMABLES_TO_CHOSE,
  DELETE_CONSUMABLES_TO_CHOSE,
  GET_CONSUMABLES,
  PUT_CONSUMABLES_TO_CHOSE
} from "../types/accountant.types";

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
        isChoseConsumables: !state.isChoseConsumables.some(item => Number(item.id) === payload.isChoseConsumables) ?
          [...state.isChoseConsumables,
            {
              ...state.consumables.filter(item => item.id === payload.isChoseConsumables)[0],
              count: 0,
              cost: 0,
              amount: 0
            }
          ] :
          state.isChoseConsumables
      }
    case CHANGE_FILTERED_STRING:
      return {
        ...state,
        filteredString: payload.filteredString
      }
    case CHANGE_CONSUMABLE_IN_ARRAY:
      return {
        ...state,
        isChoseConsumables: state.isChoseConsumables.map(item => item.id === payload.id ? ({
          ...item,
          [payload.name]: payload.value
        }) : item)
      }
    case DELETE_CONSUMABLES_TO_CHOSE:
      return {
        ...state,
        isChoseConsumables: state.consumables.filter(item => Number(item.id) !== payload.isChoseConsumables)
      }
    case DELETE_All_CONSUMABLES_TO_CHOSE:
      return {
        ...state,
        isChoseConsumables: payload.isChoseConsumables
      }
    default:
      return state
  }
}
