import {combineReducers} from 'redux'
import {appReducer} from "./app.reducer";
import {userReducer} from "./user.reducer";

export const rootReducer = combineReducers({
    app: appReducer,
    user: userReducer
});