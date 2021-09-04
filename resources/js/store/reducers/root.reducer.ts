import {combineReducers} from 'redux'
import {appReducer} from "./app.reducer";
import {userReducer} from "./user.reducer";
import {AccountantReducer} from "./accountant.reducer";

export const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer,
  accountant: AccountantReducer
});
