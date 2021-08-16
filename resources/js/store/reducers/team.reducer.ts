import {DispatchEvent} from "../redux";
import {CREATE_PLAYER, DELETE_PLAYER, GET_PLAYERS, LOADING_PLAYERS} from "../types/player.types";
import {TeamDefaultStateInterface} from "../interfaces/team";
import {CREATE_TEAM, DELETE_TEAM, GET_TEAMS, LOADING_TEAMS} from "../types/team.types";



const initialState = {
    teams: [],
    loader: false,
    error: false,
    message: '',
} as TeamDefaultStateInterface

export const teamReducer = (state = initialState, action: DispatchEvent<any>) => {
    const {type, payload} = action
    switch (type) {
        case CREATE_TEAM:
            return  {
                ...state,
                teams: [...state.teams, payload.teams]
            }
        case GET_TEAMS:
            return  {
                ...state,
                teams: payload.teams
            }
        case LOADING_TEAMS:
            return  {
                ...state,
                loader: payload.loader
            }
        case DELETE_TEAM:
            return  {
                ...state,
                teams: state.teams.filter(item => payload.id !== item.id)
            }
        default:
            return state
    }

}
