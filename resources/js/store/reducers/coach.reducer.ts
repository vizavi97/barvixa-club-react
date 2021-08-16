import {DispatchEvent} from "../redux";
import {CoachDefaultStateInterface} from "../interfaces/coach";
import {GET_COACH_PROFILE} from "../types/coach.types";



const initialState = {
    coach: null,
    loader: false,
    error: false,
    message: '',
} as CoachDefaultStateInterface

export const coachReducer = (state = initialState, action: DispatchEvent<any>) => {
    const {type, payload} = action
    switch (type) {
        case GET_COACH_PROFILE: {
            return  {
                ...state,
                coach: payload.coach
            }
        }
        default:
            return state
    }

}
