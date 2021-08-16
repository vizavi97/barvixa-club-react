import {combineReducers} from 'redux'
import {appReducer} from "./app.reducer";
import {userReducer} from "./user.reducer";
import {coachReducer} from "./coach.reducer";
import {playerReducer} from "./player.reducer";
import {teamReducer} from "./team.reducer";

export const rootReducer = combineReducers({
    app: appReducer,
    user: userReducer,
    coach: coachReducer,
    player: playerReducer,
    team: teamReducer,
});