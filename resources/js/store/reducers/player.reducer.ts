import {DispatchEvent} from "../redux";
import {PlayerDefaultStateInterface} from "../interfaces/player";
import {CREATE_PLAYER, DELETE_PLAYER, GET_PLAYERS, LOADING_PLAYERS} from "../types/player.types";



const initialState = {
    players: [],
    loader: false,
    error: false,
    message: '',
} as PlayerDefaultStateInterface

export const playerReducer = (state = initialState, action: DispatchEvent<any>) => {
    const {type, payload} = action
    switch (type) {
        case CREATE_PLAYER:
            return  {
                ...state,
                players: [...state.players, payload.players]
            }
        case GET_PLAYERS:
            return  {
                ...state,
                players: payload.players
            }
        case LOADING_PLAYERS:
            return  {
                ...state,
                loader: payload.loader
            }
        case DELETE_PLAYER:
            return  {
                ...state,
                players: state.players.filter(item => payload.id !== item.id)
            }
        default:
            return state
    }

}
